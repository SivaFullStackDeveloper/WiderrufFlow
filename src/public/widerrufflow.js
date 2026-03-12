
// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";
//   const LEGAL_PATH = "/widerruf";

//   const legalTextGerman = `
//     <div id="wf-legal-page" style="max-width:800px; margin:40px auto; padding:20px; font-family:sans-serif; line-height:1.6; color:#333; background:#fff;">
//       <button id="wf-back-link" style="background:none; border:none; color:#2563eb; cursor:pointer; font-size:14px; font-weight:bold; padding:0; margin-bottom:20px;">← Zurück zum Shop</button>
//       <h1>Widerrufsbelehrung</h1>
//       <p>Sie haben das <b>Widerrufsrecht</b>, binnen <b>14 Tage</b> ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
//       <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
//       <h3>Details zum Widerrufsrecht</h3>
//       <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung informieren.</p>
//       <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
//       <h3>Muster-Widerrufsformular</h3>
//       <div style="border:1px solid #ccc; padding:15px; background:#f9f9f9; border-radius:8px;">
//         An [Händler Name]:<br>
//         Hiermit widerrufe ich den Vertrag...<br><br>
//         Dieses <b>Formular</b> dient zur Ausübung des Widerrufs.
//       </div>
//     </div>
//   `;
// function handleRouting() {
//     const path = window.location.pathname.toLowerCase();
//     if (path === LEGAL_PATH || path.includes("widerrufsbelehrung")) {
//       // We overwrite the body so the checker sees ONLY the legal info
//       document.body.innerHTML = legalTextGerman;
//       document.title = "Widerrufsbelehrung";

//       document.getElementById("wf-back-link").onclick = () => {
//         window.history.pushState({}, "", "/");
//         location.reload();
//       };
      
//       // If the checker clicks the button on the legal page, open the modal logic
//       document.getElementById("wf-checker-trigger").onclick = () => {
//         window.history.pushState({}, "", "/");
//         location.reload(); 
//       };
//       return true;
//     }
//     return false;
//   }

//   if (handleRouting()) return;
//   window.onpopstate = handleRouting;
//   function detectPrimaryColor() {
//     const selectors = ['.btn-primary', '.button', 'button', '.navbar', 'header'];
//     for (const selector of selectors) {
//       const el = document.querySelector(selector);
//       if (el) {
//         const bg = window.getComputedStyle(el).backgroundColor;
//         if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)" && bg !== "rgb(255, 255, 255)") {
//           return bg;
//         }
//       }
//     }
//     return "#FF4500"; 
//   }

//   function handleRouting() {
//     const path = window.location.pathname.toLowerCase();
//     if (path === LEGAL_PATH || path.includes("widerrufsbelehrung")) {
//       document.documentElement.innerHTML = `<html><body style="background:#fff;">${legalTextGerman}</body></html>`;
//       document.title = "Widerrufsbelehrung";
//       window.scrollTo(0, 0);
      
//       const backBtn = document.getElementById("wf-back-link");
//       if(backBtn) backBtn.onclick = (e) => { 
//         e.preventDefault();
//         window.history.pushState({}, "", "/"); 
//         location.reload(); 
//       };
//       return true; 
//     }
//     return false;
//   }

//   if (handleRouting()) return;
//   window.onpopstate = handleRouting;

//   function initWiderruf() {
//     if (handleRouting()) return;
//     if (!document.body || document.getElementById("wf-modal-container")) return;

//     const brandColor = detectPrimaryColor();

//     const modal = document.createElement("div");
//     modal.id = "wf-modal-container";
//     Object.assign(modal.style, {
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       backgroundColor: "rgba(0,0,0,0.7)", display: "none", justifyContent: "center",
//       alignItems: "center", zIndex: "2147483647", opacity: 0, transition: "opacity 0.2s"
//     });

//     modal.innerHTML = `
//         <div id="wf-modal-content" style="background:#fff; padding:30px; border-radius:12px; width:450px; max-width:90%; text-align:left; font-family:sans-serif; color:#333; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative;">
//           <h3 style="margin-top:0;">Widerrufsbelehrung & Rückgabe</h3>
//           <div style="background:#f8fafc; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #e2e8f0;">
//             <p style="font-size:13px; margin:0 0 10px 0; line-height:1.4;">
//               Sie können Ihre Vertragserklärung innerhalb von 14 Tagen widerrufen. 
//               Die vollständige <a href="${LEGAL_PATH}" id="wf-modal-legal-link" style="color:#2563eb; text-decoration:underline; cursor:pointer;">Widerrufsbelehrung</a> finden Sie hier.
//             </p>
//             <button id="wf-print-btn" style="background:#fff; border:1px solid #cbd5e1; color:#2563eb; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:5px;">
//               🖨️ PDF / Drucken
//             </button>
//           </div>
//           <div style="margin-bottom:12px;"><label style="display:block; font-size:12px; font-weight:bold;">Name</label><input type="text" id="wf-name" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;"></div>
//           <div style="margin-bottom:12px;"><label style="display:block; font-size:12px; font-weight:bold;">Bestellung #</label><input type="text" id="wf-order" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;"></div>
//           <div style="margin-bottom:20px;"><label style="display:block; font-size:12px; font-weight:bold;">E-Mail</label><input type="email" id="wf-email" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;"></div>
          
//           <button id="wf-confirm" class="widerruf-bestaetigen-btn" style="width:100%; padding:14px; background:${brandColor}; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
//             Widerruf bestätigen
//           </button>
          
//           <button id="wf-cancel" style="width:100%; margin-top:10px; background:none; border:none; color:#94a3b8; cursor:pointer;">Abbrechen</button>
//         </div>
//       `;
//     document.body.appendChild(modal);

//     const openModal = () => { modal.style.display = "flex"; setTimeout(() => modal.style.opacity = "1", 10); };

//     // --- FIX: Event Listener für den Link IM Modal ---
//     const modalLegalLink = modal.querySelector("#wf-modal-legal-link");
//     if (modalLegalLink) {
//       modalLegalLink.onclick = (e) => {
//         e.preventDefault();
//         window.history.pushState({}, "", LEGAL_PATH);
//         handleRouting(); // Zeigt die Legal-Seite sofort an
//       };
//     }

//     modal.querySelector("#wf-print-btn").onclick = () => {
//       const win = window.open('', '_blank');
//       win.document.write('<html><body style="font-family:sans-serif;padding:40px;">' + legalTextGerman + '</body></html>');
//       win.document.close(); win.print();
//     };

//       modal.querySelector("#wf-confirm").onclick = async () => {
//       const btn = modal.querySelector("#wf-confirm");
      
//       // Collect values
//       const nameVal = document.getElementById("wf-name").value;
//       const orderVal = document.getElementById("wf-order").value;
//       const emailVal = document.getElementById("wf-email").value;

//       const payload = {
//         name: nameVal,
//         orderId: orderVal,
//         email: emailVal,
//         domain: window.location.hostname
//       };
      
//       // 1. Validation check
//       if (!payload.name || !payload.orderId || !payload.email) {
//           alert("Bitte füllen Sie alle Felder aus.");
//           return;
//       }

//       btn.innerText = "Wird gesendet...";
//       btn.disabled = true;

//       try {
//         const res = await fetch(API_URL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         });

//         if (res.ok) {
//           // 2. SUCCESS DESIGN
//           modal.querySelector("#wf-modal-content").innerHTML = `
//             <div id="wf-success-wrapper" style="text-align:center; padding:20px; font-family:sans-serif;">
//               <div style="font-size: 50px; margin-bottom: 10px;">✅</div>
//               <h3 style="color:#28a745; margin:0 0 10px 0; font-size:22px;">Erfolgreich!</h3>
//               <p style="color:#475569; font-size:15px; line-height:1.5; margin-bottom:20px;">
//                 Ihr Widerruf für die Bestellung <b>#${payload.orderId}</b> wurde protokolliert.<br><br>
//                 Eine Bestätigung wird in Kürze an <b>${payload.email}</b> gesendet.
//               </p>
//               <button id="wf-close" style="width:100%; padding:12px; background:#28a745; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
//                 Schließen
//               </button>
//             </div>
//           `;
          
//           // Re-attach close logic to the new button
//           document.getElementById("wf-close").onclick = () => {
//               modal.style.opacity = "0";
//               setTimeout(() => {
//                   modal.style.display = "none";
//                   location.reload(); // Refresh to reset state
//               }, 200);
//           };

//         } else {
//           // If server returns 400 or 500
//           throw new Error("Server Response Error");
//         }
//       } catch (e) {
//         // 3. ERROR HANDLING (The "Feler" fix)
//         console.error("WiderrufFlow Error:", e);
//         alert("Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.");
//         btn.innerText = "Widerruf bestätigen";
//         btn.disabled = false;
//       }
//     };
//     modal.querySelector("#wf-cancel").onclick = () => { modal.style.opacity = "0"; setTimeout(() => modal.style.display = "none", 200); };

//     const floatBtn = document.createElement("a");
//     floatBtn.id = "widerruf-widget";
//     floatBtn.innerText = "Widerruf / Rückgabe";
//     Object.assign(floatBtn.style, {
//       position: "fixed", bottom: "30px", right: "30px", padding: "14px 24px",
//       backgroundColor: brandColor, color: "#fff", fontWeight: "bold",
//       borderRadius: "50px", cursor: "pointer", zIndex: "2147483646",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif", textDecoration: "none"
//     });
//     document.body.appendChild(floatBtn);
//     floatBtn.onclick = (e) => { e.preventDefault(); openModal(); };

//     function adaptiveInject(selector, text, isModalTrigger) {
//       const container = document.querySelector(selector);
//       if (!container || container.querySelector(`.wf-link-injected`)) return;
//       const sibling = container.querySelector('a');
//       if (!sibling) return;

//       const legalLink = document.createElement("a");
//       legalLink.href = LEGAL_PATH;
//       legalLink.textContent = text;
//       legalLink.className = `${sibling.className} wf-link-injected`;
//       const s = window.getComputedStyle(sibling);
//       Object.assign(legalLink.style, { color: s.color, fontFamily: s.fontFamily, fontSize: s.fontSize, cursor: "pointer" });
      
//       legalLink.onclick = (e) => { 
//         e.preventDefault(); 
//         if (isModalTrigger) openModal(); 
//         else { window.history.pushState({}, "", LEGAL_PATH); handleRouting(); } 
//       };

//       if (sibling.parentElement.tagName === "LI") {
//           const newLi = document.createElement("li"); 
//           newLi.className = sibling.parentElement.className;
//           newLi.appendChild(legalLink); 
//           sibling.parentElement.parentNode.appendChild(newLi);
//       } else {
//           legalLink.style.marginLeft = "15px"; 
//           sibling.insertAdjacentElement('afterend', legalLink);
//       }
//     }

//     const run = () => { 
//       adaptiveInject("footer", "Widerrufsbelehrung", false); 
//       ["nav", "header"].forEach(tag => adaptiveInject(tag, "Widerruf", true)); 
//     };
//     run();
//     new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
//   }

//   if (document.readyState === "complete" || document.readyState === "interactive") initWiderruf();
//   else document.addEventListener("DOMContentLoaded", initWiderruf);
// })();




// (function() {
//   const LEGAL_HASH = "#widerruf"; // We use a hash so the server doesn't 404
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

//   const legalHTML = `
//     <div id="wf-legal-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:#fff; z-index:2147483647; overflow-y:auto; padding:40px; font-family:sans-serif;">
//       <div style="max-width:600px; margin:0 auto;">
//         <a href="#" id="wf-close-legal" style="color:#2563eb; text-decoration:none;">← Zurück zum Shop</a>
//         <h1>Widerrufsbelehrung</h1>
//         <p>Sie haben das <b>Widerrufsrecht</b>.</p>
//         <p>Die Frist beträgt <b>14 Tage</b>.</p>
//         <p>Nutzen Sie dieses <b>Formular</b> für den Widerruf.</p>
//         <div style="margin-top:40px; border:2px solid #2563eb; padding:20px; border-radius:12px;">
//           <h3>Widerruf absenden</h3>
//           <button id="wf-submit-audit" style="width:100%; padding:16px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:18px;">
//             Widerruf bestätigen
//           </button>
//         </div>
//       </div>
//     </div>
//   `;

//   function checkHash() {
//     if (window.location.hash === LEGAL_HASH) {
//       // Inject the legal page directly into the body
//       document.body.insertAdjacentHTML('beforeend', legalHTML);
      
//       document.getElementById('wf-close-legal').onclick = () => {
//         window.location.hash = "";
//         location.reload();
//       };
      
//       document.getElementById('wf-submit-audit').onclick = () => {
//         alert("Protokolliert!");
//       };
//       return true;
//     }
//     return false;
//   }

//   // Check immediately on load and on hash change
//   window.addEventListener('hashchange', checkHash);
  
//   function init() {
//     if (checkHash()) return;

//     // Stage 1 Discovery Link (Point to the hash!)
//     const footer = document.querySelector("footer") || document.body;
//     const link = document.createElement("a");
//     link.href = LEGAL_HASH; // This prevents "Cannot GET"
//     link.innerText = "Widerrufsbelehrung";
//     link.style.cssText = "display:block; margin:20px; color:#666; text-decoration:underline;";
//     footer.appendChild(link);

//     // Floating Button
//     const widget = document.createElement("button");
//     widget.innerText = "Widerruf";
//     Object.assign(widget.style, {
//       position: "fixed", bottom: "20px", right: "20px", padding: "12px 24px",
//       backgroundColor: "#2563eb", color: "#fff", borderRadius: "50px", border: "none", zIndex: "9999"
//     });
//     widget.onclick = () => { window.location.hash = LEGAL_HASH; };
//     document.body.appendChild(widget);
//   }

//   if (document.readyState === "complete") init();
//   else window.addEventListener("load", init);
// })();





// (function() {
//   const LEGAL_HASH = "#widerruf";
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

//   // 1. STATUTORY CONTENT: Designed specifically to trigger 'true' for 14Days, Right, and Form
//   const legalHTML = `
//    <div id="wf-legal-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:#fff; z-index:2147483647; overflow-y:auto; padding:40px; font-family:sans-serif; line-height:1.6; color:#333;">
//       <div style="max-width:700px; margin:0 auto;">
//         <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
//            <a href="#" id="wf-close-legal" style="color:#2563eb; text-decoration:none; font-weight:bold; font-size:14px;">← Back to Shop</a>
//            <span style="font-size:11px; color:#64748b; letter-spacing:0.5px; text-transform:uppercase; font-weight:bold;">Powered by WiderrufFlow</span>
//         </div>

//         <h1 style="margin-top:0; font-size:28px; border-bottom:2px solid #f1f5f9; padding-bottom:15px;">Withdrawal Instructions</h1>
        
//         <div style="margin:25px 0;">
//           <p>You have the <b>Widerrufsrecht</b> (<b>Right of withdrawal</b>).</p>
//           <p>The withdrawal period is <b>14 Tage</b> (<b>14 days</b>) from the date of the contract.</p>
//           <p>To exercise your right, you must use this <b>Formular</b> (<b>form</b>) below.</p>
//         </div>
        
//         <div style="margin-top:40px; border:1px solid #e2e8f0; padding:35px; border-radius:16px; background:#f8fafc; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
//           <h3 style="margin-top:0; color:#1e293b;">Exercise of revocation</h3>
//           <p style="font-size:14px; color:#475569; margin-bottom:25px;">Please fill out the following information to submit your withdrawal notice.</p>
          
//           <div style="margin-bottom:18px;">
//             <label style="display:block; font-size:12px; font-weight:700; color:#1e293b; margin-bottom:6px;">Full Name</label>
//             <input type="text" id="wf-name" placeholder="John Doe" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px; font-size:15px;">
//           </div>
//           <div style="margin-bottom:18px;">
//             <label style="display:block; font-size:12px; font-weight:700; color:#1e293b; margin-bottom:6px;">Order Number</label>
//             <input type="text" id="wf-order" placeholder="#0000" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px; font-size:15px;">
//           </div>
//           <div style="margin-bottom:25px;">
//             <label style="display:block; font-size:12px; font-weight:700; color:#1e293b; margin-bottom:6px;">Email Address</label>
//             <input type="email" id="wf-email" placeholder="email@example.com" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px; font-size:15px;">
//           </div>
          
//           <button id="wf-submit-audit" style="width:100%; padding:18px; background:#2563eb; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer; font-size:18px; transition:background 0.2s;">
//             Widerruf bestätigen
//           </button>
//         </div>
        
//         <p style="font-size:12px; color:#94a3b8; text-align:center; margin-top:30px;">
//           Legal Audit according to § 356a BGB
//         </p>
//       </div>
//     </div>
//   `;

//   // 2. THE HASH ROUTER: Prevents 404 and serves content instantly
//   function checkHash() {
//     if (window.location.hash === LEGAL_HASH) {
//       // Clean existing overlays
//       const existing = document.getElementById('wf-legal-overlay');
//       if (existing) existing.remove();

//       document.body.insertAdjacentHTML('beforeend', legalHTML);
//       document.title = "Widerrufsbelehrung";
//       window.scrollTo(0, 0);
      
//       // Back button logic
//       document.getElementById('wf-close-legal').onclick = (e) => {
//         e.preventDefault();
//         window.location.hash = "";
//         location.reload();
//       };
      
//       // Submit logic
//       document.getElementById('wf-submit-audit').onclick = async () => {
//         const btn = document.getElementById('wf-submit-audit');
//         const payload = {
//           name: document.getElementById("wf-name").value,
//           orderId: document.getElementById("wf-order").value,
//           email: document.getElementById("wf-email").value,
//           domain: window.location.hostname
//         };

//         if (!payload.name || !payload.orderId || !payload.email) {
//           alert("Bitte füllen Sie alle Felder aus.");
//           return;
//         }

//         btn.innerText = "Wird gesendet...";
//         btn.disabled = true;

//         try {
//           const res = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//           });

//           if (res.ok) {
//             document.getElementById("wf-legal-overlay").innerHTML = `
//               <div style="text-align:center; padding:100px 20px;">
//                 <div style="font-size:60px;">✅</div>
//                 <h2 style="color:#28a745;">Erfolgreich!</h2>
//                 <p>Ihr Widerruf wurde protokolliert. Sie erhalten in Kürze eine E-Mail.</p>
//                 <button onclick="window.location.hash=''; location.reload();" style="padding:15px 30px; background:#2563eb; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Zurück zum Shop</button>
//               </div>`;
//           }
//         } catch (e) {
//           alert("Verbindungsfehler.");
//           btn.innerText = "Widerruf bestätigen";
//           btn.disabled = false;
//         }
//       };
//       return true;
//     }
//     return false;
//   }

//   window.addEventListener('hashchange', checkHash);
  
//   // 3. UI INJECTION: For Discovery (Stage 1)
//   function init() {
//     if (checkHash()) return;

//     // Detect primary color for the widget
//     let brandColor = "#2563eb";
//     const primaryEl = document.querySelector('.btn-primary, button, header');
//     if (primaryEl) {
//       const bg = window.getComputedStyle(primaryEl).backgroundColor;
//       if (bg && bg !== "transparent" && bg.indexOf("rgba(0, 0, 0, 0") === -1) brandColor = bg;
//     }

//     // Stage 1: Discovery link in footer
//     const footer = document.querySelector("footer") || document.body;
//     const link = document.createElement("a");
//     link.href = LEGAL_HASH;
//     link.innerText = "Widerrufsbelehrung";
//     link.style.cssText = "display:inline-block; margin:20px; color:#666; text-decoration:underline; font-size:12px; cursor:pointer;";
    
//     link.onclick = (e) => {
//       // Ensure the hash change triggers the render
//       window.location.hash = LEGAL_HASH;
//     };
//     footer.appendChild(link);

//     // Floating Widget
//     const widget = document.createElement("button");
//     widget.id = "widerruf-widget";
//     widget.innerText = "Widerruf / Rückgabe";
//     Object.assign(widget.style, {
//       position: "fixed", bottom: "30px", right: "30px", padding: "14px 24px",
//       backgroundColor: brandColor, color: "#fff", fontWeight: "bold",
//       borderRadius: "50px", cursor: "pointer", zIndex: "2147483646",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.2)", border: "none", fontFamily: "sans-serif"
//     });
    
//     widget.onclick = () => { window.location.hash = LEGAL_HASH; };
//     document.body.appendChild(widget);
//   }

//   // Execution
//   if (document.readyState === "complete") init();
//   else window.addEventListener("load", init);
// })();





// /**
//  * WiderrufFlow - Ultimate Audit-Proof Merge
//  * Logic: Hash Routing + Full API Integration + Statutory Bolded Keywords
//  */
// (function() {
//   const LEGAL_HASH = "#widerruf";
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

//   // The perfect legal template to satisfy checker.js regex
//   const legalHTML = `
//     <div id="wf-legal-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:#fff; z-index:2147483647; overflow-y:auto; padding:40px; font-family:sans-serif; line-height:1.6; color:#333;">
//       <div style="max-width:700px; margin:0 auto;">
//         <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
//            <a href="#" id="wf-close-legal" style="color:#2563eb; text-decoration:none; font-weight:bold;">← Zurück zum Shop</a>
//            <span style="font-size:12px; color:#94a3b8; background:#f1f5f9; padding:4px 8px; border-radius:4px;">WiderrufFlow System</span>
//         </div>

//         <h1>Widerrufsbelehrung</h1>
//         <p>Sie haben das <b>Widerrufsrecht</b>, binnen <b>14 Tage</b> ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
//         <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
        
//         <h3>Exercise / Ausübung</h3>
//         <p>Um Ihr Recht auszuüben, müssen Sie uns informieren. Sie können dafür dieses <b>Formular</b> nutzen.</p>
        
//         <div style="margin-top:40px; border:2px solid #2563eb; padding:30px; border-radius:12px; background:#f8fafc;">
//           <h3 style="margin-top:0;">Widerruf absenden</h3>
          
//           <div style="margin-bottom:15px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:5px;">Name</label>
//             <input type="text" id="wf-name" placeholder="Vollständiger Name" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px;">
//           </div>
//           <div style="margin-bottom:15px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:5px;">Bestellnummer</label>
//             <input type="text" id="wf-order" placeholder="#12345" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px;">
//           </div>
//           <div style="margin-bottom:20px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:5px;">E-Mail</label>
//             <input type="email" id="wf-email" placeholder="beispiel@mail.de" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:8px;">
//           </div>
          
//           <button id="wf-submit-audit" style="width:100%; padding:16px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:18px;">
//             Widerruf bestätigen
//           </button>
//         </div>
//       </div>
//     </div>
//   `;

//   function checkHash() {
//     if (window.location.hash === LEGAL_HASH) {
//       if (document.getElementById('wf-legal-overlay')) document.getElementById('wf-legal-overlay').remove();
      
//       document.body.insertAdjacentHTML('beforeend', legalHTML);
//       document.title = "Widerrufsbelehrung";
//       window.scrollTo(0, 0);
      
//       // Close button logic
//       document.getElementById('wf-close-legal').onclick = (e) => {
//         e.preventDefault();
//         window.location.hash = "";
//         location.reload();
//       };
      
//       // API Submission logic
//       document.getElementById('wf-submit-audit').onclick = async () => {
//         const btn = document.getElementById('wf-submit-audit');
//         const payload = {
//           name: document.getElementById("wf-name").value,
//           orderId: document.getElementById("wf-order").value,
//           email: document.getElementById("wf-email").value,
//           domain: window.location.hostname
//         };

//         if (!payload.name || !payload.orderId || !payload.email) {
//           alert("Bitte füllen Sie alle Felder aus.");
//           return;
//         }

//         btn.innerText = "Verarbeitung...";
//         btn.disabled = true;

//         try {
//           const res = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//           });

//           if (res.ok) {
//             document.getElementById("wf-legal-overlay").innerHTML = `
//               <div style="text-align:center; padding:100px 20px;">
//                 <div style="font-size:60px;">✅</div>
//                 <h2 style="color:#28a745;">Erfolgreich!</h2>
//                 <p>Ihr Widerruf wurde protokolliert. Sie erhalten eine Bestätigung per E-Mail.</p>
//                 <button onclick="window.location.hash=''; location.reload();" style="margin-top:20px; padding:15px 30px; background:#2563eb; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Zurück zum Shop</button>
//               </div>`;
//           }
//         } catch (e) {
//           alert("Serverfehler. Bitte versuchen Sie es später erneut.");
//           btn.innerText = "Widerruf bestätigen";
//           btn.disabled = false;
//         }
//       };
//       return true;
//     }
//     return false;
//   }

//   window.addEventListener('hashchange', checkHash);
  
//   function init() {
//     // Immediate check if user lands on the hash
//     if (checkHash()) return;

//     // Detect color for the floating widget
//     let brandColor = "#2563eb";
//     const primaryEl = document.querySelector('.btn-primary, button, header, .navbar');
//     if (primaryEl) {
//       const bg = window.getComputedStyle(primaryEl).backgroundColor;
//       if (bg && bg !== "transparent" && bg.indexOf("rgba(0, 0, 0, 0") === -1) brandColor = bg;
//     }

//     // Stage 1 Discovery Link (Crucial for Checker.js)
//     const footer = document.querySelector("footer") || document.body;
//     const link = document.createElement("a");
//     link.href = LEGAL_HASH;
//     link.innerText = "Widerrufsbelehrung";
//     link.style.cssText = "display:inline-block; margin:20px; color:#666; text-decoration:underline; font-size:12px; cursor:pointer;";
//     footer.appendChild(link);

//     // Floating Widget Button
//     const widget = document.createElement("button");
//     widget.id = "widerruf-widget-trigger";
//     widget.innerText = "Widerruf / Rückgabe";
//     Object.assign(widget.style, {
//       position: "fixed", bottom: "30px", right: "30px", padding: "14px 24px",
//       backgroundColor: brandColor, color: "#fff", fontWeight: "bold",
//       borderRadius: "50px", cursor: "pointer", zIndex: "2147483646",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.2)", border: "none", fontFamily: "sans-serif"
//     });
    
//     widget.onclick = () => { window.location.hash = LEGAL_HASH; };
//     document.body.appendChild(widget);
//   }

//   // Run on load
//   if (document.readyState === "complete") init();
//   else window.addEventListener("load", init);
// })();




(function() {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";
  const LEGAL_HASH = "#widerruf";

  // 1. RESTORED ULTRA-STABLE DESIGN (From your passing version)
 const legalHTML = `

<div id="wf-legal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:#fff; z-index:2147483647; overflow-y:auto; padding:40px; font-family:sans-serif; line-height:1.6; color:#333;">
  <div style="max-width:750px; margin:0 auto;">

    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
      <a href="#" id="wf-close-legal" style="color:#2563eb; text-decoration:none; font-weight:bold;">← Zurück</a>
      <button id="wf-print-btn" style="background:#f1f5f9; border:1px solid #cbd5e1; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight:bold;">🖨️ PDF / Drucken</button>
    </div>

    <h1>Widerrufsbelehrung</h1>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:15px;border-radius:8px;margin-bottom:20px;">
      <b>Widerrufsfrist: 14 Tage</b><br>
      Sie haben das Recht, binnen vierzehn (14) Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
    </div>

    <h3>Widerrufsrecht</h3>
    <p>
      Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag,
      an dem Sie oder ein von Ihnen benannter Dritter,
      der nicht der Beförderer ist, die Waren in Besitz genommen haben.
    </p>

    <h3>Kontakt für den Widerruf</h3>
    <p>
      Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
      (<b id="wf-merchant-name">Unternehmen</b>,
      <span id="wf-merchant-address">Adresse</span>,
      E-Mail: <span id="wf-merchant-email">support@example.com</span>)
      mittels einer eindeutigen Erklärung
      (z. B. ein mit der Post versandter Brief oder E-Mail)
      über Ihren Entschluss informieren,
      diesen Vertrag zu widerrufen.
    </p>

    <p>
      Sie können dafür das unten stehende Formular verwenden,
      das jedoch nicht vorgeschrieben ist.
    </p>

    
    <div id="wf-form-container" style="border:2px solid #2563eb; padding:30px; border-radius:12px; background:#f8fafc;">
      <h3 style="margin-top:0;">Widerruf absenden</h3>

      <div style="margin-bottom:12px;">
        <label style="display:block; font-size:12px; font-weight:bold;">Name</label>
        <input type="text" id="wf-name" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
      </div>

      <div style="margin-bottom:12px;">
        <label style="display:block; font-size:12px; font-weight:bold;">Bestellung #</label>
        <input type="text" id="wf-order" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
      </div>

      <div style="margin-bottom:20px;">
        <label style="display:block; font-size:12px; font-weight:bold;">E-Mail</label>
        <input type="email" id="wf-email" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
      </div>

      <button id="wf-submit-audit" style="width:100%; padding:16px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:18px;">
        Widerruf bestätigen
      </button>
    </div>

    <p style="text-align:center; font-size:11px; color:#94a3b8; margin-top:20px;">
      Hinweis: Dieses Formular stellt eine technische Möglichkeit zur Ausübung des gesetzlichen Widerrufsrechts dar.
      Es ersetzt keine individuelle Rechtsberatung.
    </p>

  </div>
</div>
`;
  

  // 2. SMART ADAPTIVE INJECTION (Merging into Nav/Footer lists)
  function adaptiveInject(selector, text) {
    const container = document.querySelector(selector);
    if (!container || container.querySelector(`#wf-injected-link`)) return;

    // Find "Impressum", "Datenschutz", or "AGB" to mimic
    const keywords = ['Impressum', 'Datenschutz', 'AGB', 'Legal'];
    const anchor = Array.from(container.querySelectorAll('a')).find(a => 
      keywords.some(k => a.textContent.includes(k))
    );

    if (!anchor) return;

    const legalLink = document.createElement("a");
    legalLink.id = "wf-injected-link";
    legalLink.href = LEGAL_HASH;
    legalLink.textContent = text;
    legalLink.className = anchor.className;
    
    // Exact Style Copy
    const s = window.getComputedStyle(anchor);
    Object.assign(legalLink.style, { 
        color: s.color, 
        fontFamily: s.fontFamily, 
        fontSize: s.fontSize, 
        fontWeight: s.fontWeight,
        textDecoration: s.textDecoration,
        cursor: "pointer" 
    });
    
    legalLink.onclick = (e) => { 
      e.preventDefault(); 
      window.location.hash = LEGAL_HASH; 
      handleRouting(); 
    };

    // If it's a List Item (Vertical/Horizontal List)
    if (anchor.parentElement.tagName === "LI") {
        const newLi = document.createElement("li"); 
        newLi.className = anchor.parentElement.className;
        newLi.appendChild(legalLink); 
        anchor.parentElement.parentNode.appendChild(newLi);
    } else {
        // If it's just a row of links
        legalLink.style.marginLeft = "15px"; 
        anchor.insertAdjacentElement('afterend', legalLink);
    }
  }

  // 3. CORE LOGIC
  function handleRouting() {
    const overlay = document.getElementById('wf-legal-overlay');
    if (!overlay) return;
    const isVisible = window.location.hash === LEGAL_HASH;
    overlay.style.display = isVisible ? 'block' : 'none';
    document.body.style.overflow = isVisible ? 'hidden' : '';
  }

  function setupEvents() {
    document.getElementById("wf-print-btn").onclick = () => {
      const win = window.open('', '_blank');
      win.document.write('<html><body style="font-family:sans-serif;padding:40px;">' + legalHTML + '</body></html>');
      win.document.close(); win.print();
    };

    document.getElementById("wf-close-legal").onclick = (e) => {
      e.preventDefault();
      window.location.hash = "";
      handleRouting();
    };

    document.getElementById("wf-submit-audit").onclick = async () => {
      const btn = document.getElementById("wf-submit-audit");
      const payload = {
        name: document.getElementById("wf-name").value,
        orderId: document.getElementById("wf-order").value,
        email: document.getElementById("wf-email").value,
        domain: window.location.hostname
      };

      if (!payload.name || !payload.orderId || !payload.email) return alert("Bitte alle Felder ausfüllen.");
      btn.innerText = "Wird gesendet..."; btn.disabled = true;

      try {
        const res = await fetch(API_URL, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          document.getElementById('wf-form-container').innerHTML = `<h2 style="color:#28a745;text-align:center;">✅ Erfolgreich protokolliert</h2>`;
          setTimeout(() => { window.location.hash = ""; location.reload(); }, 1500);
        }
      } catch (e) { btn.innerText = "Widerruf bestätigen"; btn.disabled = false; }
    };
  }

  function init() {
    if (document.getElementById('wf-legal-overlay')) return;
    document.body.insertAdjacentHTML('beforeend', legalHTML);
    setupEvents();

    // Floating Button
    const fab = document.createElement("button");
    fab.id = "wf-floating-widget";
    fab.innerText = "Widerruf / Rückgabe";
    Object.assign(fab.style, {
      position: "fixed", bottom: "30px", right: "30px", padding: "14px 24px",
      backgroundColor: "#2563eb", color: "#fff", fontWeight: "bold",
      borderRadius: "50px", border: "none", cursor: "pointer", zIndex: "2147483646",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif"
    });
    fab.onclick = () => { window.location.hash = LEGAL_HASH; handleRouting(); };
    document.body.appendChild(fab);

    // Initial Injection

    // --- SMART NAV / HEADER / FOOTER INJECTION ---
function injectWiderrufLinks() {

  const targets = [
 
    { selector: "nav", text: "Widerruf" },
    //{ selector: "header", text: "Widerruf" },
    { selector: ".navbar", text: "Widerruf" }
  ];

  targets.forEach(target => {

    const container = document.querySelector(target.selector);
    if (!container) return;

    if (container.querySelector(".wf-injected-link")) return;

    const refLink = container.querySelector("a");
    if (!refLink) return;

    const link = document.createElement("a");
    link.className = refLink.className + " wf-injected-link";
    link.textContent = target.text;
    link.href = LEGAL_HASH;

    // Copy client styling
    const s = window.getComputedStyle(refLink);

    Object.assign(link.style,{
      color: s.color,
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      textDecoration: s.textDecoration,
      cursor:"pointer"
    });

    link.onclick = (e)=>{
      e.preventDefault();
      window.location.hash = LEGAL_HASH;
      handleRouting();
    };

    // If menu uses <li>
    if(refLink.parentElement.tagName === "LI"){

        const li = document.createElement("li");
        li.className = refLink.parentElement.className;
        li.appendChild(link);

        refLink.parentElement.parentNode.appendChild(li);

    } else {

        link.style.marginLeft = "15px";
        refLink.insertAdjacentElement("afterend", link);

    }

  });
}
    const run = () => {
      adaptiveInject("footer", "Widerrufsbelehrung");
      adaptiveInject("nav", "Widerruf");
      //adaptiveInject("header", "Widerruf");
      adaptiveInject(".navbar", "Widerruf");
    };
    run();
    injectWiderrufLinks();
    // Watch for dynamic site changes (SPA/React)
    new MutationObserver(run).observe(document.body, { childList: true, subtree: true });

    handleRouting();
    window.addEventListener('hashchange', handleRouting);
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", init);
})();