
// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

//   function initWiderruf(options = {}) {
//     if (!document.body || document.getElementById("widerruf-widget")) return;

//     const orderId = options.orderId || "";
//     const userEmail = options.userEmail || "";
//     const legalPage = options.legalPage || "/widerruf";

//     // --- 1. MODAL CONTAINER ---
//     const modal = document.createElement("div");
//     modal.id = "wf-modal-container";
//     modal.setAttribute("role", "dialog");
//     modal.setAttribute("aria-modal", "true");
    
//     Object.assign(modal.style, {
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       backgroundColor: "rgba(0,0,0,0.7)", display: "none", justifyContent: "center",
//       alignItems: "center", zIndex: "2147483647", opacity: 0, transition: "opacity 0.2s"
//     });
//     document.body.appendChild(modal);

//     function openModal() {
//       modal.style.display = "flex";
//       setTimeout(() => modal.style.opacity = "1", 10);

//       modal.innerHTML = `
//         <div id="wf-modal-content" style="background:#fff; padding:30px; border-radius:12px; width:450px; max-width:90%; text-align:left; font-family:sans-serif; color:#333; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative;">
//           <h3 style="margin-top:0;">Widerrufsbelehrung & Rückgabe</h3>
          
//           <div style="background:#f8fafc; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #e2e8f0;">
//             <p style="font-size:13px; margin:0 0 10px 0; line-height:1.4;">
//               Sie können Ihre Vertragserklärung innerhalb von 14 Tagen widerrufen. 
//               Die vollständige <a href="${legalPage}" target="_blank" style="color:#2563eb; text-decoration:underline;">Widerrufsbelehrung</a> finden Sie hier.
//             </p>
//             <button id="wf-print-btn" style="background:#fff; border:1px solid #cbd5e1; color:#2563eb; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:5px;">
//               🖨️ Als PDF speichern / Drucken
//             </button>
//           </div>

//           <div style="margin-bottom:12px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">Vollständiger Name</label>
//             <input type="text" id="wf-name" placeholder="Max Mustermann" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           </div>

//           <div style="margin-bottom:12px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">Bestellnummer</label>
//             <input type="text" id="wf-order" value="${orderId}" placeholder="z.B. 10452" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           </div>

//           <div style="margin-bottom:20px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">E-Mail Adresse</label>
//             <input type="email" id="wf-email" value="${userEmail}" placeholder="name@beispiel.de" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           </div>

//           <button id="wf-confirm" style="width:100%; padding:14px; background:#FF4500; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
//             Widerruf bestätigen
//           </button>
//           <button id="wf-cancel" style="width:100%; margin-top:10px; background:none; border:none; color:#94a3b8; cursor:pointer; font-size:13px;">Abbrechen</button>
//         </div>
//       `;

//       modal.querySelector("#wf-print-btn").onclick = () => {
//         const win = window.open('', '_blank');
//         win.document.write('<html><body style="font-family:sans-serif;padding:40px;"><h1>Widerrufsbelehrung</h1><p>Sie haben das Recht, binnen 14 Tagen diesen Vertrag zu widerrufen.</p></body></html>');
//         win.document.close();
//         win.print();
//       };

//       modal.querySelector("#wf-cancel").onclick = () => {
//         modal.style.opacity = "0";
//         setTimeout(() => modal.style.display = "none", 200);
//       };

//       modal.querySelector("#wf-confirm").onclick = async () => {
//         const btn = modal.querySelector("#wf-confirm");
//         const payload = {
//           name: document.getElementById("wf-name").value,
//           orderId: document.getElementById("wf-order").value,
//           email: document.getElementById("wf-email").value,
//           domain: window.location.hostname
//         };
        
//         if (!payload.name || !payload.orderId || !payload.email) return alert("Alle Felder sind Pflichtfelder.");
        
//         btn.innerText = "Wird gesendet...";
//         btn.disabled = true;

//         try {
//           const res = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//           });
//           if (res.ok) {
//             modal.innerHTML = `
//               <div id="wf-message" style="
//                 max-width:400px;
//                 margin:50px auto;
//                 padding:20px;
//                 background:#f0fff4;
//                 border-left:6px solid #28a745;
//                 border-radius:10px;
//                 box-shadow:0 4px 12px rgba(0,0,0,0.1);
//                 text-align:center;
//                 font-family:Arial,sans-serif;
//               ">
//                 <h3 style="color:#28a745; margin-bottom:10px;">Erfolgreich!</h3>
//                 <p style="color:#333; font-size:16px; margin-bottom:20px;">
//                   Ihr Widerruf wurde protokolliert. Eine Bestätigung wurde an <b>${payload.email}</b> gesendet.
//                 </p>
//                 <button id="wf-close" style="
//                   padding:10px 25px;
//                   background:#28a745;
//                   color:#fff;
//                   border:none;
//                   border-radius:5px;
//                   font-size:15px;
//                   cursor:pointer;
//                   transition:background 0.3s, transform 0.2s;
//                 ">Schließen</button>
//               </div>
//             `;
//             document.getElementById("wf-close").addEventListener("click", () => {
//               modal.style.transition = "opacity 0.3s";
//               modal.style.opacity = "0";
//               setTimeout(() => modal.style.display = "none", 300);
//             });
//           }
//         } catch (e) {
//           alert("Fehler beim Senden. Bitte prüfen Sie Ihre Internetverbindung.");
//           btn.innerText = "Widerruf bestätigen";
//           btn.disabled = false;
//         }
//       };
//     }

//     // --- 2. THEME DETECTION ---
//     function detectPrimaryColor() {
//       const selectors = ['.btn-primary', 'button', 'header', 'nav'];
//       for (const selector of selectors) {
//         const el = document.querySelector(selector);
//         if (el) {
//           const bg = window.getComputedStyle(el).backgroundColor;
//           if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;
//         }
//       }
//       return "#FF4500";
//     }

//     // --- 3. FLOATING BUTTON ---
//     const floatBtn = document.createElement("a");
//     floatBtn.id = "widerruf-widget";
//     floatBtn.href = legalPage;
//     floatBtn.innerText = options.buttonText || "Widerruf / Rückgabe";
    
//     Object.assign(floatBtn.style, {
//       position: "fixed", bottom: "30px", right: "30px", padding: "16px 28px",
//       backgroundColor: detectPrimaryColor(), color: "#fff", fontWeight: "bold",
//       borderRadius: "50px", cursor: "pointer", zIndex: "2147483646", textDecoration: "none",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif"
//     });

//     document.body.appendChild(floatBtn);
//     floatBtn.onclick = (e) => { e.preventDefault(); openModal(); };

//     // --- 4. AUTO-INJECTION ---
//     function injectLinks() {
//       ["footer", "nav", "header"].forEach(tag => {
//         const container = document.querySelector(tag);
//         if (container && !container.querySelector(".wf-link")) {
//           const link = document.createElement("a");
//           link.href = legalPage;
//           link.className = "wf-link";
//           link.textContent = "Widerruf";
//           link.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:14px; color:inherit;";
//           link.onclick = (e) => { e.preventDefault(); openModal(); };
//           container.appendChild(link);
//         }
//       });
//     }

//     injectLinks();
//     new MutationObserver(injectLinks).observe(document.body, { childList: true, subtree: true });
//   }

//   if (document.readyState === "complete" || document.readyState === "interactive") {
//     initWiderruf();
//   } else {
//     document.addEventListener("DOMContentLoaded", initWiderruf);
//   }
// })();



// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";
//   const CURRENT_PATH = window.location.pathname;

//   // --- 1. VIRTUAL PAGE LOGIC (Legal Compliance) ---
//   // This handles the /widerruf route immediately if it matches
//   const legalTextGerman = `
//     <div style="max-width:800px; margin:40px auto; padding:20px; font-family:sans-serif; line-height:1.6; color:#333;">
//       <h1>Widerrufsbelehrung</h1>
//       <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
//       <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
//       <h3>Widerrufsrecht</h3>
//       <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Name, Anschrift, E-Mail) mittels einer eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
//       <hr>
//       <h3>Muster-Widerrufsformular</h3>
//       <p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
//       <div style="border:1px solid #ccc; padding:15px; background:#f9f9f9;">
//         An [Hier ist der Name, die Anschrift und die E-Mail-Adresse des Händlers einzufügen]:<br>
//         Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren/die Erbringung der folgenden Dienstleistung:<br><br>
//         Bestellt am/Erhalten am:<br>
//         Name des Verbrauchers:<br>
//         Anschrift des Verbrauchers:<br>
//         Unterschrift des Verbrauchers (nur bei Mitteilung auf Papier):<br>
//         Datum:
//       </div>
//     </div>
//   `;

//   if (CURRENT_PATH === "/widerruf" || CURRENT_PATH === "/widerrufsbelehrung") {
//     // We stop the rest of the script and just show the legal page
//     window.stop(); // Stops further resource loading
//     document.documentElement.innerHTML = `<html><head><title>Widerrufsbelehrung</title></head><body>${legalTextGerman}</body></html>`;
//     return; 
//   }

//   function initWiderruf(options = {}) {
//     if (!document.body || document.getElementById("widerruf-widget")) return;

//     const orderId = options.orderId || "";
//     const userEmail = options.userEmail || "";
//     const legalPage = options.legalPage || "/widerruf";

//     // --- 2. MODAL CONTAINER ---
//     const modal = document.createElement("div");
//     modal.id = "wf-modal-container";
//     modal.setAttribute("role", "dialog");
//     modal.setAttribute("aria-modal", "true");
    
//     Object.assign(modal.style, {
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       backgroundColor: "rgba(0,0,0,0.7)", display: "none", justifyContent: "center",
//       alignItems: "center", zIndex: "2147483647", opacity: 0, transition: "opacity 0.2s"
//     });
//     document.body.appendChild(modal);

//     function openModal() {
//       modal.style.display = "flex";
//       setTimeout(() => modal.style.opacity = "1", 10);

//       modal.innerHTML = `
//         <div id="wf-modal-content" style="background:#fff; padding:30px; border-radius:12px; width:450px; max-width:90%; text-align:left; font-family:sans-serif; color:#333; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative;">
//           <h3 style="margin-top:0;">Widerrufsbelehrung & Rückgabe</h3>
          
//           <div style="background:#f8fafc; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #e2e8f0;">
//             <p style="font-size:13px; margin:0 0 10px 0; line-height:1.4;">
//               Sie können Ihre Vertragserklärung innerhalb von 14 Tagen widerrufen. 
//               Die vollständige <a href="${legalPage}" target="_blank" style="color:#2563eb; text-decoration:underline;">Widerrufsbelehrung</a> finden Sie hier.
//             </p>
//             <button id="wf-print-btn" style="background:#fff; border:1px solid #cbd5e1; color:#2563eb; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:5px;">
//               🖨️ Als PDF speichern / Drucken
//             </button>
//           </div>

//           <div style="margin-bottom:12px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">Vollständiger Name</label>
//             <input type="text" id="wf-name" placeholder="Max Mustermann" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           </div>

//           <div style="margin-bottom:12px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">Bestellnummer</label>
//             <input type="text" id="wf-order" value="${orderId}" placeholder="z.B. 10452" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           </div>

//           <div style="margin-bottom:20px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">E-Mail Adresse</label>
//             <input type="email" id="wf-email" value="${userEmail}" placeholder="name@beispiel.de" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           </div>

//           <button id="wf-confirm" style="width:100%; padding:14px; background:#FF4500; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
//             Widerruf bestätigen
//           </button>
//           <button id="wf-cancel" style="width:100%; margin-top:10px; background:none; border:none; color:#94a3b8; cursor:pointer; font-size:13px;">Abbrechen</button>
//         </div>
//       `;

//       modal.querySelector("#wf-print-btn").onclick = () => {
//         const win = window.open('', '_blank');
//         win.document.write('<html><body style="font-family:sans-serif;padding:40px;">' + legalTextGerman + '</body></html>');
//         win.document.close();
//         win.print();
//       };

//       modal.querySelector("#wf-cancel").onclick = () => {
//         modal.style.opacity = "0";
//         setTimeout(() => modal.style.display = "none", 200);
//       };

//       modal.querySelector("#wf-confirm").onclick = async () => {
//         const btn = modal.querySelector("#wf-confirm");
//         const payload = {
//           name: document.getElementById("wf-name").value,
//           orderId: document.getElementById("wf-order").value,
//           email: document.getElementById("wf-email").value,
//           domain: window.location.hostname
//         };
        
//         if (!payload.name || !payload.orderId || !payload.email) return alert("Alle Felder sind Pflichtfelder.");
        
//         btn.innerText = "Wird gesendet...";
//         btn.disabled = true;

//         try {
//           const res = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//           });
//           if (res.ok) {
//             modal.innerHTML = `
//               <div id="wf-message" style="max-width:400px; margin:50px auto; padding:20px; background:#f0fff4; border-left:6px solid #28a745; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center; font-family:Arial,sans-serif;">
//                 <h3 style="color:#28a745; margin-bottom:10px;">Erfolgreich!</h3>
//                 <p style="color:#333; font-size:16px; margin-bottom:20px;">Ihr Widerruf wurde protokolliert. Eine Bestätigung wurde an <b>${payload.email}</b> gesendet.</p>
//                 <button id="wf-close" style="padding:10px 25px; background:#28a745; color:#fff; border:none; border-radius:5px; font-size:15px; cursor:pointer;">Schließen</button>
//               </div>
//             `;
//             document.getElementById("wf-close").addEventListener("click", () => {
//               modal.style.transition = "opacity 0.3s";
//               modal.style.opacity = "0";
//               setTimeout(() => modal.style.display = "none", 300);
//             });
//           }
//         } catch (e) {
//           alert("Fehler beim Senden.");
//           btn.innerText = "Widerruf bestätigen";
//           btn.disabled = false;
//         }
//       };
//     }

//     // --- 3. THEME DETECTION ---
//     function detectPrimaryColor() {
//       const selectors = ['.btn-primary', 'button', 'header', 'nav'];
//       for (const selector of selectors) {
//         const el = document.querySelector(selector);
//         if (el) {
//           const bg = window.getComputedStyle(el).backgroundColor;
//           if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;
//         }
//       }
//       return "#FF4500";
//     }

//     // --- 4. FLOATING BUTTON ---
//     const floatBtn = document.createElement("a");
//     floatBtn.id = "widerruf-widget";
//     floatBtn.href = legalPage;
//     floatBtn.innerText = options.buttonText || "Widerruf / Rückgabe";
    
//     Object.assign(floatBtn.style, {
//       position: "fixed", bottom: "30px", right: "30px", padding: "16px 28px",
//       backgroundColor: detectPrimaryColor(), color: "#fff", fontWeight: "bold",
//       borderRadius: "50px", cursor: "pointer", zIndex: "2147483646", textDecoration: "none",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif"
//     });

//     document.body.appendChild(floatBtn);
//     floatBtn.onclick = (e) => { e.preventDefault(); openModal(); };

//     // --- 5. AUTO-INJECTION (Footer Link for Compliance) ---
//     function injectLinks() {
//       // Specifically target the footer to ensure /widerruf exists for the scanner
//       const footer = document.querySelector("footer");
//       if (footer && !footer.querySelector('a[href="/widerruf"]')) {
//           const legalLink = document.createElement("a");
//           legalLink.href = "/widerruf";
//           legalLink.className = "wf-link";
//           legalLink.textContent = "Widerrufsbelehrung";
//           legalLink.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:12px; color:inherit; opacity:0.8;";
//           footer.appendChild(legalLink);
//       }

//       ["nav", "header"].forEach(tag => {
//         const container = document.querySelector(tag);
//         if (container && !container.querySelector(".wf-link")) {
//           const link = document.createElement("a");
//           link.href = legalPage;
//           link.className = "wf-link";
//           link.textContent = "Widerruf";
//           link.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:14px; color:inherit;";
//           link.onclick = (e) => { e.preventDefault(); openModal(); };
//           container.appendChild(link);
//         }
//       });
//     }

//     injectLinks();
//     new MutationObserver(injectLinks).observe(document.body, { childList: true, subtree: true });
//   }

//   if (document.readyState === "complete" || document.readyState === "interactive") {
//     initWiderruf();
//   } else {
//     document.addEventListener("DOMContentLoaded", initWiderruf);
//   }
// })();




// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";
//   const CURRENT_PATH = window.location.pathname;

//   // --- 1. VIRTUAL PAGE LOGIC (Legal Compliance) ---
//   const legalTextGerman = `
//     <div style="max-width:800px; margin:40px auto; padding:20px; font-family:sans-serif; line-height:1.6; color:#333;">
//       <a href="/" style="color:#2563eb; text-decoration:none; font-size:14px;">← Zurück zum Shop</a>
//       <h1>Widerrufsbelehrung</h1>
//       <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
//       <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
//       <h3>Widerrufsrecht</h3>
//       <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
//       <hr>
//       <h3>Muster-Widerrufsformular</h3>
//       <p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
//       <div style="border:1px solid #ccc; padding:15px; background:#f9f9f9;">
//         An [Hier ist der Name, die Anschrift und die E-Mail-Adresse des Händlers einzufügen]:<br>
//         Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren/die Erbringung der folgenden Dienstleistung:<br><br>
//         Bestellt am/Erhalten am:<br>
//         Name des Verbrauchers:<br>
//         Anschrift des Verbrauchers:<br>
//         Unterschrift des Verbrauchers (nur bei Mitteilung auf Papier):<br>
//         Datum:
//       </div>
//     </div>
//   `;

//   if (CURRENT_PATH === "/widerruf" || CURRENT_PATH === "/widerrufsbelehrung") {
//     window.stop();
//     document.documentElement.innerHTML = `<html><head><title>Widerrufsbelehrung</title></head><body>${legalTextGerman}</body></html>`;
//     return; 
//   }

//   function initWiderruf(options = {}) {
//     if (!document.body || document.getElementById("widerruf-widget")) return;

//     const orderId = options.orderId || "";
//     const userEmail = options.userEmail || "";
//     const legalPage = options.legalPage || "/widerruf";

//     // --- 2. MODAL CONTAINER ---
//     const modal = document.createElement("div");
//     modal.id = "wf-modal-container";
//     modal.setAttribute("role", "dialog");
//     modal.setAttribute("aria-modal", "true");
    
//     Object.assign(modal.style, {
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       backgroundColor: "rgba(0,0,0,0.7)", display: "none", justifyContent: "center",
//       alignItems: "center", zIndex: "2147483647", opacity: 0, transition: "opacity 0.2s"
//     });
//     document.body.appendChild(modal);

//     function openModal() {
//       modal.style.display = "flex";
//       setTimeout(() => modal.style.opacity = "1", 10);

//       modal.innerHTML = `
//         <div id="wf-modal-content" style="background:#fff; padding:30px; border-radius:12px; width:450px; max-width:90%; text-align:left; font-family:sans-serif; color:#333; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative;">
//           <h3 style="margin-top:0;">Widerrufsbelehrung & Rückgabe</h3>
          
//           <div style="background:#f8fafc; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #e2e8f0;">
//             <p style="font-size:13px; margin:0 0 10px 0; line-height:1.4;">
//               Sie können Ihre Vertragserklärung innerhalb von 14 Tagen widerrufen. 
//               Die vollständige <a href="${legalPage}" target="_blank" style="color:#2563eb; text-decoration:underline;">Widerrufsbelehrung</a> finden Sie hier.
//             </p>
//             <button id="wf-print-btn" style="background:#fff; border:1px solid #cbd5e1; color:#2563eb; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:5px;">
//               🖨️ Als PDF speichern / Drucken
//             </button>
//           </div>

//           <div style="margin-bottom:12px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">Vollständiger Name</label>
//             <input type="text" id="wf-name" placeholder="Max Mustermann" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           </div>

//           <div style="margin-bottom:12px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">Bestellnummer</label>
//             <input type="text" id="wf-order" value="${orderId}" placeholder="z.B. 10452" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           </div>

//           <div style="margin-bottom:20px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">E-Mail Adresse</label>
//             <input type="email" id="wf-email" value="${userEmail}" placeholder="name@beispiel.de" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           </div>

//           <button id="wf-confirm" style="width:100%; padding:14px; background:#FF4500; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
//             Widerruf bestätigen
//           </button>
//           <button id="wf-cancel" style="width:100%; margin-top:10px; background:none; border:none; color:#94a3b8; cursor:pointer; font-size:13px;">Abbrechen</button>
//         </div>
//       `;

//       modal.querySelector("#wf-print-btn").onclick = () => {
//         const win = window.open('', '_blank');
//         win.document.write('<html><body style="font-family:sans-serif;padding:40px;">' + legalTextGerman + '</body></html>');
//         win.document.close();
//         win.print();
//       };

//       modal.querySelector("#wf-cancel").onclick = () => {
//         modal.style.opacity = "0";
//         setTimeout(() => modal.style.display = "none", 200);
//       };

//       modal.querySelector("#wf-confirm").onclick = async () => {
//         const btn = modal.querySelector("#wf-confirm");
//         const payload = {
//           name: document.getElementById("wf-name").value,
//           orderId: document.getElementById("wf-order").value,
//           email: document.getElementById("wf-email").value,
//           domain: window.location.hostname
//         };
        
//         if (!payload.name || !payload.orderId || !payload.email) return alert("Alle Felder sind Pflichtfelder.");
        
//         btn.innerText = "Wird gesendet...";
//         btn.disabled = true;

//         try {
//           const res = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//           });
//           if (res.ok) {
//             modal.innerHTML = `
//               <div id="wf-message" style="max-width:400px; margin:50px auto; padding:20px; background:#f0fff4; border-left:6px solid #28a745; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center; font-family:Arial,sans-serif;">
//                 <h3 style="color:#28a745; margin-bottom:10px;">Erfolgreich!</h3>
//                 <p style="color:#333; font-size:16px; margin-bottom:20px;">Ihr Widerruf wurde protokolliert. Eine Bestätigung wurde an <b>${payload.email}</b> gesendet.</p>
//                 <button id="wf-close" style="padding:10px 25px; background:#28a745; color:#fff; border:none; border-radius:5px; font-size:15px; cursor:pointer;">Schließen</button>
//               </div>
//             `;
//             document.getElementById("wf-close").onclick = () => {
//               modal.style.opacity = "0";
//               setTimeout(() => modal.style.display = "none", 300);
//             };
//           }
//         } catch (e) {
//           alert("Fehler beim Senden.");
//           btn.innerText = "Widerruf bestätigen";
//           btn.disabled = false;
//         }
//       };
//     }

//     // --- 3. THEME DETECTION ---
//     function detectPrimaryColor() {
//       const selectors = ['.btn-primary', 'button', 'header', 'nav'];
//       for (const selector of selectors) {
//         const el = document.querySelector(selector);
//         if (el) {
//           const bg = window.getComputedStyle(el).backgroundColor;
//           if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;
//         }
//       }
//       return "#FF4500";
//     }

//     // --- 4. FLOATING BUTTON ---
//     const floatBtn = document.createElement("a");
//     floatBtn.id = "widerruf-widget";
//     floatBtn.innerText = options.buttonText || "Widerruf / Rückgabe";
    
//     Object.assign(floatBtn.style, {
//       position: "fixed", bottom: "30px", right: "30px", padding: "16px 28px",
//       backgroundColor: detectPrimaryColor(), color: "#fff", fontWeight: "bold",
//       borderRadius: "50px", cursor: "pointer", zIndex: "2147483646", textDecoration: "none",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif"
//     });

//     document.body.appendChild(floatBtn);
//     floatBtn.onclick = (e) => { e.preventDefault(); openModal(); };

//     // --- 5. AUTO-INJECTION (Footer = New Page, Nav = Modal) ---
//     function injectLinks() {
//       const linkClass = "wf-link-injected";

//       // FOOTER: Clean link for page navigation
//       const footer = document.querySelector("footer");
//       if (footer && !footer.querySelector(`.${linkClass}`)) {
//           const legalLink = document.createElement("a");
//           legalLink.href = "/Widerrufsbelehrung.html";
//           legalLink.className = linkClass;
//           legalLink.textContent = "Widerrufsbelehrung";
//           legalLink.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:12px; color:inherit; opacity:0.8; display:inline-block;";
//           footer.appendChild(legalLink);
//       }

//       // NAV/HEADER: Modal triggers
//       ["nav", "header"].forEach(tag => {
//         const container = document.querySelector(tag);
//         if (container && !container.querySelector(`.${linkClass}`)) {
//           const link = document.createElement("a");
//           link.href = "#";
//           link.className = linkClass;
//           link.textContent = "Widerruf";
//           link.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:14px; color:inherit;";
//           link.onclick = (e) => { e.preventDefault(); openModal(); };
//           container.appendChild(link);
//         }
//       });
//     }

//     injectLinks();
//     new MutationObserver(injectLinks).observe(document.body, { childList: true, subtree: true });
//   }

//   if (document.readyState === "complete" || document.readyState === "interactive") {
//     initWiderruf();
//   } else {
//     document.addEventListener("DOMContentLoaded", initWiderruf);
//   }
// })();





// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

//   // --- 1. THE LEGAL CONTENT ---
//   const legalTextGerman = `
//     <div style="max-width:800px; margin:40px auto; padding:20px; font-family:sans-serif; line-height:1.6; color:#333;">
//       <button id="wf-close-legal" style="background:none; border:none; color:#2563eb; cursor:pointer; font-size:14px; font-weight:bold; padding:0; margin-bottom:20px;">← Zurück zum Shop</button>
//       <h1>Widerrufsbelehrung</h1>
//       <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
//       <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
//       <h3>Widerrufsrecht</h3>
//       <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
//       <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
//       <h3>Muster-Widerrufsformular</h3>
//       <p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
//       <div style="border:1px solid #ccc; padding:15px; background:#f9f9f9; border-radius:8px;">
//         An [Händler-Daten]:<br>
//         Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag...<br><br>
//         Bestellt am/Erhalten am:<br>
//         Name des Verbrauchers:<br>
//         Anschrift des Verbrauchers:<br>
//         Datum:
//       </div>
//     </div>
//   `;

//   // --- 2. THE FULL-SCREEN VIEW (Instead of a real file) ---
//   const legalOverlay = document.createElement("div");
//   legalOverlay.id = "wf-legal-overlay";
//   Object.assign(legalOverlay.style, {
//     position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//     backgroundColor: "#fff", display: "none", overflowY: "auto",
//     zIndex: "2147483647", opacity: 0, transition: "opacity 0.3s"
//   });
//   legalOverlay.innerHTML = legalTextGerman;
//   document.documentElement.appendChild(legalOverlay);

//   function openFullLegal() {
//     legalOverlay.style.display = "block";
//     document.body.style.overflow = "hidden"; // Stop background scroll
//     setTimeout(() => legalOverlay.style.opacity = "1", 10);
    
//     document.getElementById("wf-close-legal").onclick = () => {
//       legalOverlay.style.opacity = "0";
//       setTimeout(() => {
//         legalOverlay.style.display = "none";
//         document.body.style.overflow = "";
//       }, 300);
//     };
//   }

//   function initWiderruf(options = {}) {
//     if (!document.body || document.getElementById("widerruf-widget")) return;

//     // --- 3. MODAL CONTAINER (The Form) ---
//     const modal = document.createElement("div");
//     modal.id = "wf-modal-container";
//     Object.assign(modal.style, {
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       backgroundColor: "rgba(0,0,0,0.7)", display: "none", justifyContent: "center",
//       alignItems: "center", zIndex: "2147483647", opacity: 0, transition: "opacity 0.2s"
//     });
//     document.body.appendChild(modal);

//     function openModal() {
//       modal.style.display = "flex";
//       setTimeout(() => modal.style.opacity = "1", 10);
//       modal.innerHTML = `
//         <div id="wf-modal-content" style="background:#fff; padding:30px; border-radius:12px; width:450px; max-width:90%; font-family:sans-serif; color:#333; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative;">
//           <h3 style="margin-top:0;">Widerrufsbelehrung & Rückgabe</h3>
//           <div style="background:#f8fafc; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #e2e8f0;">
//             <p style="font-size:13px; margin:0 0 10px 0;">Sie können Ihre Vertragserklärung innerhalb von 14 Tagen widerrufen.</p>
//             <button id="wf-open-legal-link" style="color:#2563eb; background:none; border:none; padding:0; text-decoration:underline; cursor:pointer; font-size:13px;">Ganze Belehrung lesen</button>
//           </div>
//           <input type="text" id="wf-name" placeholder="Name" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           <input type="text" id="wf-order" placeholder="Bestellnummer" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           <input type="email" id="wf-email" placeholder="E-Mail" style="width:100%; padding:10px; margin-bottom:20px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//           <button id="wf-confirm" style="width:100%; padding:14px; background:#FF4500; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">Widerruf bestätigen</button>
//           <button id="wf-cancel" style="width:100%; margin-top:10px; background:none; border:none; color:#94a3b8; cursor:pointer;">Abbrechen</button>
//         </div>
//       `;

//       modal.querySelector("#wf-open-legal-link").onclick = () => {
//         modal.style.display = "none";
//         openFullLegal();
//       };

//       modal.querySelector("#wf-cancel").onclick = () => {
//         modal.style.opacity = "0";
//         setTimeout(() => modal.style.display = "none", 200);
//       };

//       modal.querySelector("#wf-confirm").onclick = async () => {
//         const btn = modal.querySelector("#wf-confirm");
//         const payload = {
//           name: document.getElementById("wf-name").value,
//           orderId: document.getElementById("wf-order").value,
//           email: document.getElementById("wf-email").value,
//           domain: window.location.hostname
//         };
//         if (!payload.name || !payload.orderId || !payload.email) return alert("Pflichtfelder!");
//         btn.innerText = "Senden...";
//         try {
//           const res = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//           });
//           if (res.ok) alert("Erfolgreich!");
//         } catch (e) { alert("Fehler."); }
//       };
//     }

//     // --- 4. FLOATING BUTTON ---
//     const floatBtn = document.createElement("div");
//     floatBtn.id = "widerruf-widget";
//     floatBtn.innerText = "Widerruf / Rückgabe";
//     Object.assign(floatBtn.style, {
//       position: "fixed", bottom: "30px", right: "30px", padding: "16px 28px",
//       backgroundColor: "#FF4500", color: "#fff", fontWeight: "bold",
//       borderRadius: "50px", cursor: "pointer", zIndex: "2147483646",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif"
//     });
//     document.body.appendChild(floatBtn);
//     floatBtn.onclick = openModal;

//     // --- 5. AUTO-INJECTION (Now strictly Modal triggers) ---
//     function injectLinks() {
//       const linkClass = "wf-link-injected";
      
//       // Footer Link: Now opens Full Legal View instead of navigating
//       const footer = document.querySelector("footer");
//       if (footer && !footer.querySelector(`.${linkClass}`)) {
//           const legalLink = document.createElement("span");
//           legalLink.className = linkClass;
//           legalLink.textContent = "Widerrufsbelehrung";
//           legalLink.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:12px; color:inherit; opacity:0.8; display:inline-block;";
//           legalLink.onclick = openFullLegal;
//           footer.appendChild(legalLink);
//       }

//       // Nav Link: Opens Modal
//       ["nav", "header"].forEach(tag => {
//         const container = document.querySelector(tag);
//         if (container && !container.querySelector(`.${linkClass}`)) {
//           const link = document.createElement("span");
//           link.className = linkClass;
//           link.textContent = "Widerruf";
//           link.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:14px; color:inherit;";
//           link.onclick = openModal;
//           container.appendChild(link);
//         }
//       });
//     }

//     injectLinks();
//     new MutationObserver(injectLinks).observe(document.body, { childList: true, subtree: true });
//   }

//   if (document.readyState === "complete" || document.readyState === "interactive") {
//     initWiderruf();
//   } else {
//     document.addEventListener("DOMContentLoaded", initWiderruf);
//   }
// })();



(function() {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";
  const LEGAL_PATH = "/widerruf";

  // --- 1. THE LEGAL CONTENT ---
  const legalTextGerman = `
    <div id="wf-legal-page" style="max-width:800px; margin:40px auto; padding:20px; font-family:sans-serif; line-height:1.6; color:#333; background:#fff;">
      <button id="wf-back-link" style="background:none; border:none; color:#2563eb; cursor:pointer; font-size:14px; font-weight:bold; padding:0; margin-bottom:20px;">← Zurück zum Shop</button>
      <h1>Widerrufsbelehrung</h1>
      <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
      <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
      <h3>Widerrufsrecht</h3>
      <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Name, Anschrift, E-Mail) mittels einer eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
      <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
      <h3>Muster-Widerrufsformular</h3>
      <p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>
      <div style="border:1px solid #ccc; padding:15px; background:#f9f9f9; border-radius:8px;">
        An [Hier ist der Name, die Anschrift und die E-Mail-Adresse des Händlers einzufügen]:<br>
        Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren/die Erbringung der folgenden Dienstleistung:<br><br>
        Bestellt am/Erhalten am:<br>
        Name des Verbrauchers:<br>
        Anschrift des Verbrauchers:<br>
        Unterschrift des Verbrauchers (nur bei Mitteilung auf Papier):<br>
        Datum:
      </div>
    </div>
  `;

  // --- 2. VIRTUAL ROUTER ---
  function handleRouting() {
    const path = window.location.pathname.toLowerCase();
    if (path === LEGAL_PATH || path === "/widerrufsbelehrung") {
      document.body.innerHTML = legalTextGerman;
      document.body.style.background = "#fff";
      document.title = "Widerrufsbelehrung";
      window.scrollTo(0, 0);

      document.getElementById("wf-back-link").onclick = (e) => {
        e.preventDefault();
        window.history.pushState({}, "", "/");
        location.reload(); 
      };
      return true; 
    }
    return false;
  }

  handleRouting();
  window.onpopstate = handleRouting;

  function initWiderruf(options = {}) {
    if (handleRouting()) return;
    if (!document.body || document.getElementById("widerruf-widget")) return;

    const orderId = options.orderId || "";
    const userEmail = options.userEmail || "";

    // --- 3. MODAL CONTAINER ---
    const modal = document.createElement("div");
    modal.id = "wf-modal-container";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    
    Object.assign(modal.style, {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)", display: "none", justifyContent: "center",
      alignItems: "center", zIndex: "2147483647", opacity: 0, transition: "opacity 0.2s"
    });
    document.body.appendChild(modal);

    function openModal() {
      modal.style.display = "flex";
      setTimeout(() => modal.style.opacity = "1", 10);

      modal.innerHTML = `
        <div id="wf-modal-content" style="background:#fff; padding:30px; border-radius:12px; width:450px; max-width:90%; text-align:left; font-family:sans-serif; color:#333; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative;">
          <h3 style="margin-top:0;">Widerrufsbelehrung & Rückgabe</h3>
          <div style="background:#f8fafc; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #e2e8f0;">
            <p style="font-size:13px; margin:0 0 10px 0; line-height:1.4;">
              Sie können Ihre Vertragserklärung innerhalb von 14 Tagen widerrufen. 
              Die vollständige <a href="${LEGAL_PATH}" id="wf-modal-legal-link" style="color:#2563eb; text-decoration:underline;">Widerrufsbelehrung</a> finden Sie hier.
            </p>
            <button id="wf-print-btn" style="background:#fff; border:1px solid #cbd5e1; color:#2563eb; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:5px;">
              🖨️ Als PDF speichern / Drucken
            </button>
          </div>
          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">Vollständiger Name</label>
            <input type="text" id="wf-name" placeholder="Max Mustermann" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
          </div>
          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">Bestellnummer</label>
            <input type="text" id="wf-order" value="${orderId}" placeholder="z.B. 10452" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">E-Mail Adresse</label>
            <input type="email" id="wf-email" value="${userEmail}" placeholder="name@beispiel.de" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
          </div>
          <button id="wf-confirm" style="width:100%; padding:14px; background:#FF4500; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
            Widerruf bestätigen
          </button>
          <button id="wf-cancel" style="width:100%; margin-top:10px; background:none; border:none; color:#94a3b8; cursor:pointer; font-size:13px;">Abbrechen</button>
        </div>
      `;

      // Handle the link click to change URL without reload
      document.getElementById("wf-modal-legal-link").onclick = (e) => {
        e.preventDefault();
        window.history.pushState({}, "", LEGAL_PATH);
        handleRouting();
      };

      modal.querySelector("#wf-print-btn").onclick = () => {
        const win = window.open('', '_blank');
        win.document.write('<html><body style="font-family:sans-serif;padding:40px;">' + legalTextGerman + '</body></html>');
        win.document.close();
        win.print();
      };

      modal.querySelector("#wf-cancel").onclick = () => {
        modal.style.opacity = "0";
        setTimeout(() => modal.style.display = "none", 200);
      };

      modal.querySelector("#wf-confirm").onclick = async () => {
        const btn = modal.querySelector("#wf-confirm");
        const payload = {
          name: document.getElementById("wf-name").value,
          orderId: document.getElementById("wf-order").value,
          email: document.getElementById("wf-email").value,
          domain: window.location.hostname
        };
        
        if (!payload.name || !payload.orderId || !payload.email) return alert("Alle Felder sind Pflichtfelder.");
        
        btn.innerText = "Wird gesendet...";
        btn.disabled = true;

        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            modal.innerHTML = `
              <div id="wf-message" style="max-width:400px; margin:50px auto; padding:20px; background:#f0fff4; border-left:6px solid #28a745; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center; font-family:Arial,sans-serif;">
                <h3 style="color:#28a745; margin-bottom:10px;">Erfolgreich!</h3>
                <p style="color:#333; font-size:16px; margin-bottom:20px;">Ihr Widerruf wurde protokolliert. Eine Bestätigung wurde an <b>${payload.email}</b> gesendet.</p>
                <button id="wf-close" style="padding:10px 25px; background:#28a745; color:#fff; border:none; border-radius:5px; font-size:15px; cursor:pointer;">Schließen</button>
              </div>
            `;
            document.getElementById("wf-close").addEventListener("click", () => {
              modal.style.transition = "opacity 0.3s";
              modal.style.opacity = "0";
              setTimeout(() => modal.style.display = "none", 300);
            });
          }
        } catch (e) {
          alert("Fehler beim Senden.");
          btn.innerText = "Widerruf bestätigen";
          btn.disabled = false;
        }
      };
    }

    // --- 4. THEME DETECTION ---
    function detectPrimaryColor() {
      const selectors = ['.btn-primary', 'button', 'header', 'nav'];
      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el) {
          const bg = window.getComputedStyle(el).backgroundColor;
          if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;
        }
      }
      return "#FF4500";
    }

    // --- 5. FLOATING BUTTON ---
    const floatBtn = document.createElement("a");
    floatBtn.id = "widerruf-widget";
    floatBtn.href = LEGAL_PATH;
    floatBtn.innerText = options.buttonText || "Widerruf / Rückgabe";
    
    Object.assign(floatBtn.style, {
      position: "fixed", bottom: "30px", right: "30px", padding: "16px 28px",
      backgroundColor: detectPrimaryColor(), color: "#fff", fontWeight: "bold",
      borderRadius: "50px", cursor: "pointer", zIndex: "2147483646", textDecoration: "none",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif"
    });

    document.body.appendChild(floatBtn);
    floatBtn.onclick = (e) => { e.preventDefault(); openModal(); };

    // --- 6. AUTO-INJECTION ---
    // --- AUTO-INJECTION (Header, Nav, and Footer) ---
    function injectLinks() {
      const linkClass = "wf-link-injected";
      
      // 1. Footer Injection (Full Legal Text)
      const footer = document.querySelector("footer");
      if (footer && !footer.querySelector(`.${linkClass}`)) {
          const legalLink = document.createElement("a");
          legalLink.href = LEGAL_PATH;
          legalLink.className = linkClass;
          legalLink.textContent = "Widerrufsbelehrung";
          legalLink.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:12px; color:inherit; opacity:0.8;";
          legalLink.onclick = (e) => { e.preventDefault(); window.history.pushState({}, "", LEGAL_PATH); handleRouting(); };
          footer.appendChild(legalLink);
      }

      // 2. Nav/Header Injection (Opens Modal)
      ["nav", "header"].forEach(tag => {
        const container = document.querySelector(tag);
        if (container && !container.querySelector(`.${linkClass}`)) {
          const navLink = document.createElement("a");
          navLink.href = LEGAL_PATH;
          navLink.className = linkClass;
          navLink.textContent = "Widerruf";
          navLink.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:14px; color:inherit;";
          navLink.onclick = (e) => { e.preventDefault(); openModal(); };
          container.appendChild(navLink);
        }
      });
    }

    injectLinks();
    new MutationObserver(injectLinks).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initWiderruf();
  } else {
    document.addEventListener("DOMContentLoaded", initWiderruf);
  }
})();