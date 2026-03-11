// const express = require("express");
// const puppeteer = require("puppeteer");

// const router = express.Router();

// router.post("/check-widerruf", async (req, res) => {

// const { url } = req.body;

// if (!url || !url.startsWith("http")) {
// return res.json({
// status: "ERROR",
// message: "Invalid URL"
// });
// }

// let browser;

// try {

// browser = await puppeteer.launch({
// headless: true,
// args: ["--no-sandbox","--disable-setuid-sandbox"]
// });

// const page = await browser.newPage();

// await page.goto(url, {
// waitUntil: "domcontentloaded",
// timeout: 30000
// });

// await new Promise(r => setTimeout(r, 2000));

// const result = await page.evaluate(() => {

// const keywords = [
// "widerruf",
// "widerrufsrecht",
// "widerrufsbelehrung",
// "widerruf erklären",
// "widerruf starten",
// "vertrag widerrufen",
// "retoure",
// "rückgabe",
// "retouren"
// ];

// const urlPatterns = [
// "/widerruf",
// "/widerrufsrecht",
// "/widerrufsbelehrung",
// "/retoure",
// "/return",
// "/retouren",
// "/returns"
// ];

// function checkElement(el){

// const text = (
// (el.innerText || el.textContent || "") +
// (el.value || "") +
// (el.getAttribute("aria-label") || "")
// ).toLowerCase();

// const href = (el.getAttribute("href") || "").toLowerCase();

// const textMatch = keywords.some(k => text.includes(k));
// const urlMatch = urlPatterns.some(p => href.includes(p));

// if(textMatch && urlMatch){
// return {
// status:"PASSED",
// element: el.tagName,
// text: text.trim(),
// href: href
// };
// }

// return null;

// }

// const priorityAreas = document.querySelectorAll("footer a, footer button, nav a, nav button");

// for(const el of priorityAreas){

// const result = checkElement(el);
// if(result) return result;

// }

// const elements = document.querySelectorAll(
// "a,button,input[type='submit'],input[type='button']"
// );

// for(const el of elements){

// const result = checkElement(el);
// if(result) return result;

// }

// return {
// status:"FAILED",
// message:"No legally visible Widerruf link or button detected"
// };

// });

// await browser.close();

// res.json(result);

// } catch(err){

// if(browser) await browser.close();

// res.json({
// status:"ERROR",
// message:err.message
// });

// }

// });

// module.exports = router;


/////// item no 2

// const express = require("express");
// const puppeteer = require("puppeteer");

// const router = express.Router();

// router.post("/check-widerruf", async (req, res) => {
//     const { url } = req.body;

//     if (!url || !url.startsWith("http")) {
//         return res.json({
//             status: "ERROR",
//             message: "Invalid URL"
//         });
//     }

//     let browser;
//     try {
//         browser = await puppeteer.launch({
//             headless: true,
//             args: ["--no-sandbox", "--disable-setuid-sandbox"]
//         });

//         const page = await browser.newPage();
//         await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
//         await page.waitForTimeout(2000);

//         // Function to check elements on page
//         const result = await page.evaluate(() => {
//             const keywords = [
//                 "widerruf",
//                 "widerrufsrecht",
//                 "widerrufsbelehrung",
//                 "widerruf erklären",
//                 "widerruf starten",
//                 "vertrag widerrufen",
//                 "retoure",
//                 "rückgabe",
//                 "retouren"
//             ];
//             const urlPatterns = [
//                 "/widerruf",
//                 "/widerrufsrecht",
//                 "/widerrufsbelehrung",
//                 "/retoure",
//                 "/return",
//                 "/retouren",
//                 "/returns"
//             ];

//             function checkElement(el){
//                 const text = ((el.innerText || el.textContent || "") + (el.value || "") + (el.getAttribute("aria-label") || "")).toLowerCase();
//                 const href = (el.getAttribute("href") || "").toLowerCase();
//                 const textMatch = keywords.some(k => text.includes(k));
//                 const urlMatch = urlPatterns.some(p => href.includes(p));
//                 return textMatch && urlMatch ? {status:"PASSED", element: el.tagName, text: text.trim(), href: href} : null;
//             }

//             // Priority: footer/nav links/buttons
//             const priority = document.querySelectorAll("footer a, footer button, nav a, nav button");
//             for (const el of priority) {
//                 const r = checkElement(el);
//                 if (r) return r;
//             }

//             // All other links/buttons
//             const elements = document.querySelectorAll("a, button, input[type='submit'], input[type='button']");
//             for (const el of elements) {
//                 const r = checkElement(el);
//                 if (r) return r;
//             }

//             return {status:"FAILED", message:"No Widerruf link/button found"};
//         });

//         // If we found a link, verify target page contains Widerrufsbelehrung
//         if (result.status === "PASSED") {
//             try {
//                 const newPage = await browser.newPage();
//                 await newPage.goto(result.href, { waitUntil: "domcontentloaded", timeout: 30000 });
//                 await newPage.waitForTimeout(2000);

//                 const legalText = await newPage.evaluate(() => {
//                     const content = document.body.innerText.toLowerCase();
//                     // Basic check for full Widerrufsbelehrung
//                     if (content.includes("widerrufsrecht") && content.includes("14 tage") && content.includes("formular")) {
//                         return true;
//                     }
//                     return false;
//                 });

//                 if (!legalText) {
//                     result.status = "FAILED";
//                     result.message = "Widerrufsbelehrung not fully found on target page";
//                 }

//                 await newPage.close();
//             } catch (e) {
//                 result.status = "FAILED";
//                 result.message = "Unable to verify linked Widerrufsbelehrung page";
//             }
//         }

//         await browser.close();
//         res.json(result);

//     } catch (err) {
//         if (browser) await browser.close();
//         res.json({
//             status: "ERROR",
//             message: err.message
//         });
//     }
// });

// module.exports = router;




const express = require("express");
const puppeteer = require("puppeteer");

const router = express.Router();

router.post("/check-widerruf", async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith("http")) {
    return res.json({
      status: "ERROR",
      message: "Invalid URL"
    });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });

    // Function to check elements on page
    const result = await page.evaluate(() => {
      const keywords = [
        "widerruf",
        "widerrufsrecht",
        "widerrufsbelehrung",
        "widerruf erklären",
        "widerruf starten",
        "vertrag widerrufen",
        "retoure",
        "rückgabe",
        "retouren"
      ];
      const urlPatterns = [
        "/widerruf",
        "/widerrufsrecht",
        "/widerrufsbelehrung",
        "/retoure",
        "/return",
        "/retouren",
        "/returns"
      ];

      function checkElement(el) {
        const text = ((el.innerText || el.textContent || "") + (el.value || "") + (el.getAttribute("aria-label") || "")).toLowerCase();
        const href = (el.getAttribute("href") || "").toLowerCase();
        const textMatch = keywords.some(k => text.includes(k));
        const urlMatch = urlPatterns.some(p => href.includes(p));
        if (textMatch && urlMatch) {
          // Resolve relative URLs
          let resolvedHref;
          try { resolvedHref = new URL(href, location.origin).href; } catch(e) { resolvedHref = href; }
          return { status: "PASSED", element: el.tagName, text: text.trim(), href: resolvedHref };
        }
        return null;
      }

      // Priority check: footer/nav deep links/buttons
      const priority = document.querySelectorAll("footer * a, footer * button, nav * a, nav * button");
      for (const el of priority) {
        const r = checkElement(el);
        if (r) return r;
      }

      // All other links/buttons
      const elements = document.querySelectorAll("a, button, input[type='submit'], input[type='button']");
      for (const el of elements) {
        const r = checkElement(el);
        if (r) return r;
      }

      return { status: "FAILED", message: "No Widerruf link/button found" };
    });

    // If a link/button is found, verify target page content
    if (result.status === "PASSED") {
      try {
        const newPage = await browser.newPage();
        await newPage.goto(result.href, { waitUntil: "networkidle2", timeout: 45000 });
        await newPage.waitForTimeout(2000);

        const legalText = await newPage.evaluate(() => {
          const content = document.body.innerText.toLowerCase().replace(/\s+/g, " ");
          return content.includes("widerrufsrecht") && content.includes("14 tage") && content.includes("formular");
        });

        if (!legalText) {
          result.status = "FAILED";
          result.message = "Widerrufsbelehrung not fully found on target page";
        }

        await newPage.close();
      } catch (e) {
        result.status = "FAILED";
        result.message = "Unable to verify linked Widerrufsbelehrung page";
      }
    }

    await browser.close();
    res.json(result);

  } catch (err) {
    if (browser) await browser.close();
    res.json({
      status: "ERROR",
      message: err.message
    });
  }
});

module.exports = router;