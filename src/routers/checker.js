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
args: ["--no-sandbox","--disable-setuid-sandbox"]
});

const page = await browser.newPage();

await page.goto(url, {
waitUntil: "domcontentloaded",
timeout: 30000
});

await new Promise(r => setTimeout(r, 2000));

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

function checkElement(el){

const text = (
(el.innerText || el.textContent || "") +
(el.value || "") +
(el.getAttribute("aria-label") || "")
).toLowerCase();

const href = (el.getAttribute("href") || "").toLowerCase();

const textMatch = keywords.some(k => text.includes(k));
const urlMatch = urlPatterns.some(p => href.includes(p));

if(textMatch && urlMatch){
return {
status:"PASSED",
element: el.tagName,
text: text.trim(),
href: href
};
}

return null;

}

const priorityAreas = document.querySelectorAll("footer a, footer button, nav a, nav button");

for(const el of priorityAreas){

const result = checkElement(el);
if(result) return result;

}

const elements = document.querySelectorAll(
"a,button,input[type='submit'],input[type='button']"
);

for(const el of elements){

const result = checkElement(el);
if(result) return result;

}

return {
status:"FAILED",
message:"No legally visible Widerruf link or button detected"
};

});

await browser.close();

res.json(result);

} catch(err){

if(browser) await browser.close();

res.json({
status:"ERROR",
message:err.message
});

}

});

module.exports = router;