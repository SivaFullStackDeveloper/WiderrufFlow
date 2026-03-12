
const express = require("express");
const puppeteer = require("puppeteer");

const router = express.Router();

router.post("/check-widerruf", async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith("http")) {
    return res.json({ status: "ERROR", message: "Invalid URL" });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });

    // Initialize the Audit Report
    const auditReport = {
      score: 0,
      hasEntryButton: false, // Checkpoint 1
      hasLegalText: false,   // Checkpoint 2
      hasConfirmButton: false, // Checkpoint 3
      findings: [],
      status: "FAILED"
    };

    // Step 1: Check for the Entry Link/Button
    const entryCheck = await page.evaluate(() => {
      const keywords = ["widerruf", "widerrufsrecht", "vertrag widerrufen", "widerruf erklären"];
      // We check all links but prioritize nav and footer
      const elements = Array.from(document.querySelectorAll("a, button, footer a, nav a"));
      
      for (const el of elements) {
        const text = (el.innerText || "").toLowerCase();
        const href = el.getAttribute("href") || "";
        if (keywords.some(k => text.includes(k))) {
          let resolvedHref;
          try { resolvedHref = new URL(href, location.origin).href; } catch(e) { resolvedHref = href; }
          return { found: true, href: resolvedHref };
        }
      }
      return { found: false };
    });

    if (entryCheck.found) {
      auditReport.hasEntryButton = true;
      auditReport.score += 33;
      auditReport.findings.push("✅ Widerruf-Link oder Button gefunden");

      // Step 2 & 3: Navigate to the target page to verify content and button
      try {
        const newPage = await browser.newPage();
        await newPage.goto(entryCheck.href, { waitUntil: "networkidle2", timeout: 45000 });
        await new Promise(r => setTimeout(r, 3000)); // Wait for widgets/JS

        const deepAnalysis = await newPage.evaluate(() => {
          const content = document.body.innerText.toLowerCase().replace(/\s+/g, " ");
          
          // Check for § 355/356 BGB text requirements
          const textMatch = content.includes("widerrufsrecht") && 
                            content.includes("14 tage") && 
                            content.includes("formular");

          // Check for § 356a BGB mandatory "Confirm" button
          const confirmKeywords = ["widerruf bestätigen", "jetzt widerrufen", "bestätigen"];
          const buttons = Array.from(document.querySelectorAll("button, input[type='submit'], .btn, .button, a"));
          
          const buttonMatch = buttons.some(btn => {
            const btnText = (btn.innerText || btn.value || "").toLowerCase();
            return confirmKeywords.some(k => btnText.includes(k));
          });

          return { textMatch, buttonMatch };
        });

        if (deepAnalysis.textMatch) {
          auditReport.hasLegalText = true;
          auditReport.score += 33;
          auditReport.findings.push("✅ Widerrufsbelehrung erkannt");
        } else {
          auditReport.findings.push("❌ Widerrufsbelehrung unvollständig oder nicht gefunden.");
        }

        if (deepAnalysis.buttonMatch) {
          auditReport.hasConfirmButton = true;
          auditReport.score += 34; // Total 100
          auditReport.findings.push("✅ Hinweise zum Widerrufsprozess erkannt");
        } else {
          auditReport.findings.push("❌ Mandatory 'Widerruf bestätigen' button missing in Footer or Step 2.");
        }

        await newPage.close();
      } catch (e) {
        auditReport.findings.push("⚠️ Zielseite konnte nicht auf 2-Stufen-Konformität geprüft werden.");
      }
    } else {
      auditReport.findings.push("❌ Kein gesetzlich erforderlicher Widerruf-Button gefunden.");
    }

    // Set overall status based on score
    auditReport.status = auditReport.score >= 90 ? "PASSED" : "FAILED";

    await browser.close();
    res.json(auditReport);

  } catch (err) {
    if (browser) await browser.close();
    res.json({ status: "ERROR", message: err.message });
  }
});

module.exports = router;



