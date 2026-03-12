
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
      auditReport.findings.push("✅ Widerruf-Link/Button auf der Seite gefunden.");

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
          auditReport.findings.push("✅ Widerrufsbelehrung auf der Zielseite erkannt.");
        } else {
          auditReport.findings.push("❌ Widerrufsbelehrung unvollständig oder nicht gefunden.");
        }

        if (deepAnalysis.buttonMatch) {
          auditReport.hasConfirmButton = true;
          auditReport.score += 34; // Total 100
          auditReport.findings.push("✅ Gesetzlicher 2-Stufen-Widerruf (§ 356a BGB) erkannt.");
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




// const puppeteer = require("puppeteer");

// /**
//  * STRICT COMPLIANCE CHECKER: § 356a BGB
//  * Added logging to track the bot's "thought process" during the audit.
//  */
// async function strictGermanComplianceScan(targetUrl, options = { verbose: true }) {
//     const log = (msg) => options.verbose && console.log(`[SCANNER][${new Date().toLocaleTimeString()}] ${msg}`);

//     const auditReport = {
//         timestamp: new Date().toISOString(),
//         url: targetUrl,
//         score: 0,
//         violations: [],
//         passed: false
//     };

//     let browser;
//     try {
//         log(`Launching browser to audit: ${targetUrl}`);
//         browser = await puppeteer.launch({
//             headless: "new",
//             args: ["--no-sandbox", "--disable-setuid-sandbox"]
//         });

//         const page = await browser.newPage();
//         await page.setViewport({ width: 1280, height: 800 });
        
//         log("Navigating to homepage...");
//         await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 30000 });

//         // --- STAGE 1: ENTRY POINT ACCESSIBILITY ---
//         log("Stage 1: Searching for visible legal entry point...");
//         const entryPoint = await page.evaluate(() => {
//             const mandatoryKeywords = ["widerruf", "widerrufsrecht", "widerrufsbelehrung"];
//             const links = Array.from(document.querySelectorAll("footer a, nav a, a, button"));
            
//             for (const link of links) {
//                 const text = link.innerText.toLowerCase().trim();
//                 const isVisible = !!(link.offsetWidth || link.offsetHeight || link.getClientRects().length);
                
//                 if (mandatoryKeywords.some(k => text.includes(k)) && isVisible) {
//                     return { 
//                         text: link.innerText.trim(), 
//                         href: link.getAttribute("href") ? new URL(link.getAttribute("href"), window.location.origin).href : null,
//                         tagName: link.tagName
//                     };
//                 }
//             }
//             return null;
//         });

//         if (!entryPoint) {
//             log("Result: FAILED Stage 1. No visible link found.");
//             auditReport.violations.push("CRITICAL: No accessible entry point found.");
//             return auditReport; 
//         }
        
//         log(`Result: SUCCESS. Found "${entryPoint.text}" via <${entryPoint.tagName}>`);
//         auditReport.score += 30;

//         // --- STAGE 2: SUBSTANCE & 2-STEP LOGIC ---
//         if (entryPoint.href) {
//             log(`Navigating to legal page: ${entryPoint.href}`);
//             await page.goto(entryPoint.href, { waitUntil: "networkidle2" });
//         } else {
//             log("Triggering JS modal/button...");
//             await page.click("button"); 
//             await new Promise(r => setTimeout(r, 2000));
//         }

//         log("Stage 2: Analyzing content substance and § 356a BGB button...");
//         const deepAnalysis = await page.evaluate(() => {
//             const bodyText = document.body.innerText.toLowerCase();
            
//             // 1. Substance Check
//             const has14Days = /14\s*(tage|days)/.test(bodyText);
//             const hasRightOfWithdrawal = bodyText.includes("widerrufsrecht");
//             const hasForm = bodyText.includes("formular") || bodyText.includes("muster");

//             // 2. Strict Button Label Check
//             const strictLabels = ["widerruf bestätigen", "jetzt widerrufen", "bestätigung des widerrufs"];
//             const buttons = Array.from(document.querySelectorAll("button, input[type='submit'], [role='button'], a.btn"));
            
//             const confirmButton = buttons.find(btn => {
//                 const btnText = (btn.innerText || btn.value || "").toLowerCase().trim();
//                 return strictLabels.includes(btnText);
//             });

//             return {
//                 textValid: (has14Days && hasRightOfWithdrawal && hasForm),
//                 buttonFound: !!confirmButton,
//                 foundButtonLabel: confirmButton ? (confirmButton.innerText || confirmButton.value) : null,
//                 metrics: { has14Days, hasRightOfWithdrawal, hasForm }
//             };
//         });

//         log(`Metrics: 14Days=${deepAnalysis.metrics.has14Days}, Right=${deepAnalysis.metrics.hasRightOfWithdrawal}, Form=${deepAnalysis.metrics.hasForm}`);

//         if (deepAnalysis.textValid) {
//             log("Result: Legal text substance is compliant.");
//             auditReport.score += 35;
//         } else {
//             log("Result: FAILED. Mandatory legal phrases missing.");
//             auditReport.violations.push("VIOLATION: Statutory information missing.");
//         }

//         if (deepAnalysis.buttonFound) {
//             log(`Result: SUCCESS. Found button with compliant label: "${deepAnalysis.foundButtonLabel}"`);
//             auditReport.score += 35;
//         } else {
//             log("Result: FAILED. No button found with a legally recognized label.");
//             auditReport.violations.push("CRITICAL VIOLATION: Missing mandatory § 356a BGB button.");
//         }

//         auditReport.passed = auditReport.score === 100;
//         log(`Audit Finished. Final Score: ${auditReport.score}/100. Status: ${auditReport.passed ? 'PASSED' : 'FAILED'}`);
        
//         return auditReport;

//     } catch (error) {
//         log(`FATAL ERROR: ${error.message}`);
//         return { status: "ERROR", message: error.message };
//     } finally {
//         if (browser) {
//             log("Closing browser.");
//             await browser.close();
//         }
//     }
// }

// module.exports = { strictGermanComplianceScan };
// strictGermanComplianceScan("https://testingwiderrufflow.onrender.com/");

