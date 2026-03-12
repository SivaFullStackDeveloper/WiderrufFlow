// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

//   function initWiderruf(options = {}) {
//     if (document.getElementById("widerruf-widget")) return;

//     const orderId = options.orderId || "";
//     const userEmail = options.userEmail || "";
//     const legalPage = options.legalPage || "/widerruf";

//     // --- Modal container ---
//     const modal = document.createElement("div");
//     Object.assign(modal.style, {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       backgroundColor: "rgba(0,0,0,0.5)",
//       display: "none",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 100000,
//       opacity: 1
//     });
//     document.body.appendChild(modal);

//     // --- Modal open function ---
//     function openModal() {
//       modal.style.display = "flex";
//       modal.style.opacity = "1";
//       modal.style.transition = "none";

//       modal.innerHTML = `
//         <div style="background:#fff; padding:30px; border-radius:12px; width:400px; max-width:90%; text-align:left; font-family:sans-serif;">
//           <h3>Widerruf / Rückgabe</h3>
//           <p>Die vollständige <a href="${legalPage}" target="_blank" style="color:#007bff; text-decoration:underline;">Widerrufsbelehrung</a> ist jederzeit verfügbar.</p>
//           <label>Name</label>
//           <input type="text" id="wf-name" style="width:100%; margin-bottom:10px; padding:8px; border:1px solid #ccc;">
//           <label>Bestellnummer</label>
//           <input type="text" id="wf-order" value="${orderId}" style="width:100%; margin-bottom:10px; padding:8px; border:1px solid #ccc;">
//           <label>E-Mail</label>
//           <input type="email" id="wf-email" value="${userEmail}" style="width:100%; margin-bottom:15px; padding:8px; border:1px solid #ccc;">
//           <button id="wf-confirm" style="width:100%; padding:12px; background:#FF4500; color:#fff; border:none; border-radius:5px; cursor:pointer;">Absenden</button>
//           <button id="wf-cancel" style="width:100%; margin-top:8px; background:none; border:none; color:#888; cursor:pointer;">Abbrechen</button>
//         </div>
//       `;

//       modal.querySelector("#wf-cancel").onclick = () => {
//         modal.style.transition = "opacity 0.3s";
//         modal.style.opacity = "0";
//         setTimeout(() => modal.style.display = "none", 300);
//       };

//       modal.querySelector("#wf-confirm").onclick = async () => {
//         const payload = {
//           name: modal.querySelector("#wf-name").value,
//           orderId: modal.querySelector("#wf-order").value,
//           email: modal.querySelector("#wf-email").value
//         };
//         if (!payload.name || !payload.orderId || !payload.email) return alert("Alle Felder sind Pflichtfelder.");
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
//           } else throw new Error();
//         } catch {
//           alert("Fehler. Bitte später erneut versuchen.");
//         }
//       };
//     }

//     window.WiderrufFlow = window.WiderrufFlow || {};
//     window.WiderrufFlow.openModal = openModal;

//     // --- Floating button ---
//    function detectPrimaryColor() {

//   const selectors = [
//     '.btn-primary',
//     '.primary',
//     '.button-primary',
//     '.btn',
//     'button',
//     'a[class*="btn"]',
//     'a[class*="button"]'
//   ];

//   for (const selector of selectors) {

//     const el = document.querySelector(selector);

//     if (!el) continue;

//     const style = getComputedStyle(el);

//     const bg = style.backgroundColor;

//     if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
//       return bg;
//     }

//   }

//   return "#ff1e1e";
// }


// const primaryColor = detectPrimaryColor();

// const floatButton = document.createElement("a");
// floatButton.id = "widerruf-widget";
// floatButton.href = legalPage;
// floatButton.innerText = options.buttonText || "Widerruf / Rückgabe";

// Object.assign(floatButton.style, {
//     position: "fixed",
//     bottom: "20px",
//     right: "20px",
//     padding: "16px 24px",
//     backgroundColor: primaryColor,
//     color: "#fff",
//     fontSize: "16px",
//     fontWeight: "bold",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     zIndex: 99999,
//     textDecoration: "none",
//     textAlign: "center",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
// });



// document.body.appendChild(floatButton);
// floatButton.addEventListener("click", e => { e.preventDefault(); openModal(); });
//     // const floatButton = document.createElement("a");
//     // floatButton.id = "widerruf-widget";
//     // floatButton.href = legalPage;
//     // floatButton.innerText = options.buttonText || "Widerruf / Rückgabe";

//     // // Match styles from nav/header/footer if available
//     // const themeSample = document.querySelector("nav a, header a, footer a") || document.body;
//     // floatButton.className = themeSample.className || "";
//     // floatButton.style.cssText = themeSample.style.cssText || "";
//     // floatButton.style.position = "fixed";
//     // floatButton.style.bottom = "20px";
//     // floatButton.style.right = "20px";
//     // floatButton.style.zIndex = 99999;
//     // floatButton.style.cursor = "pointer";
//     // document.body.appendChild(floatButton);

//     // floatButton.addEventListener("click", e => { e.preventDefault(); openModal(); });

//     // --- Auto-inject Widerruf links ---
//     function createModalLink(container, text, openModal) {
//       if (!container || container.querySelector(".wf-link")) return;
//       const ref = document.createElement("a");
//       ref.textContent = text;

//       const sample = container.querySelector("a, button");
//       if (sample) {
//         ref.className = sample.className;
//         ref.style.cssText = sample.style.cssText;
//       }
//       ref.classList.add("wf-link");
//       ref.addEventListener("click", e => {
//         e.preventDefault();
//         openModal();
//       });
//       container.appendChild(ref);
//     }

//     ["header", "footer", "nav"].forEach(tag => {
//       createModalLink(document.querySelector(tag), "Widerruf", openModal);
//     });

//     // --- Observe for dynamic changes (Shopify / SPA) ---
//     const observer = new MutationObserver(() => {
//       ["header", "footer", "nav"].forEach(tag => {
//         createModalLink(document.querySelector(tag), "Widerruf", openModal);
//       });
//     });
//     observer.observe(document.body, { childList: true, subtree: true });
//   }

//   document.addEventListener("DOMContentLoaded", () => initWiderruf({
//     orderId: "",
//     userEmail: "",
//     legalPage: "/widerruf"
//   }));

// })();





// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

//   function initWiderruf(options = {}) {
//     if (document.getElementById("widerruf-widget")) return;

//     const orderId = options.orderId || "";
//     const userEmail = options.userEmail || "";
//     const legalPage = options.legalPage || "/widerruf";

//     // --- 1. Modal Container with ARIA Roles ---
//     const modal = document.createElement("div");
//     modal.id = "wf-modal-container";
//     // ARIA Attributes: Tells scanners "A dialog has opened"
//     modal.setAttribute("role", "dialog");
//     modal.setAttribute("aria-modal", "true");
//     modal.setAttribute("aria-labelledby", "wf-title");
    
//     Object.assign(modal.style, {
//       position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//       backgroundColor: "rgba(0,0,0,0.6)", display: "none", justifyContent: "center",
//       alignItems: "center", zIndex: 1000000, opacity: 0, transition: "opacity 0.3s"
//     });
//     document.body.appendChild(modal);

//     function openModal() {
//       modal.style.display = "flex";
//       setTimeout(() => modal.style.opacity = "1", 10);

//       modal.innerHTML = `
//         <div style="background:#fff; padding:30px; border-radius:12px; width:450px; max-width:90%; text-align:left; font-family:sans-serif; color:#333; box-shadow: 0 10px 25px rgba(0,0,0,0.2); position: relative;">
//           <h3 id="wf-title" style="margin-top:0;">Widerrufsbelehrung & Rückgabe</h3>
          
//           <div style="background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0; margin-bottom:20px;">
//             <p style="font-size:13px; color:#444; margin:0 0 8px 0;">
//               Sie können diesen Vertrag binnen <b>14 Tagen</b> widerrufen.
//             </p>
//             <button onclick="window.print()" style="background:none; border:none; color:#2563eb; font-size:12px; cursor:pointer; font-weight:bold; padding:0; text-decoration:underline;">
//               ➔ Als PDF speichern / Drucken
//             </button>
//           </div>

//           <div style="margin-top:15px;">
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">Bestellnummer</label>
//             <input type="text" id="wf-order" value="${orderId}" style="width:100%; margin-bottom:10px; padding:10px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box;">
            
//             <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:4px;">E-Mail Adresse</label>
//             <input type="email" id="wf-email" value="${userEmail}" style="width:100%; margin-bottom:20px; padding:10px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box;">
            
//             <button id="wf-confirm" style="width:100%; padding:14px; background:#FF4500; color:#fff; border:none; border-radius:6px; font-weight:bold; cursor:pointer; font-size:16px;">
//               Widerruf bestätigen
//             </button>
//             <button id="wf-cancel" style="width:100%; margin-top:10px; background:none; border:none; color:#999; cursor:pointer; font-size:13px;">Abbrechen</button>
//           </div>
//         </div>
//       `;

//       modal.querySelector("#wf-cancel").onclick = () => {
//         modal.style.opacity = "0";
//         setTimeout(() => modal.style.display = "none", 300);
//       };

//       modal.querySelector("#wf-confirm").onclick = async () => {
//         const btn = modal.querySelector("#wf-confirm");
//         const payload = {
//           orderId: document.getElementById("wf-order").value,
//           email: document.getElementById("wf-email").value,
//           domain: window.location.hostname
//         };
//         if (!payload.orderId || !payload.email) return alert("Eingabe fehlt.");
        
//         btn.innerText = "Wird verarbeitet...";
//         btn.disabled = true;

//         try {
//           const res = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//           });
//           if (res.ok) {
//             modal.innerHTML = `<div style="text-align:center; padding:30px;">
//               <h3 style="color:#28a745;">Erfolgreich!</h3>
//               <p>Bestätigung wurde an ${payload.email} gesendet.</p>
//               <button onclick="location.reload()" style="padding:10px 20px; cursor:pointer;">Schließen</button>
//             </div>`;
//           }
//         } catch (e) { 
//           alert("Fehler."); 
//           btn.innerText = "Widerruf bestätigen";
//           btn.disabled = false;
//         }
//       };
//     }

//     // --- 2. Floating Button with Hidden Fallback Link ---
//     function detectPrimaryColor() {
//       const el = document.querySelector('.btn-primary, button, header');
//       if (el) {
//         const bg = getComputedStyle(el).backgroundColor;
//         if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;
//       }
//       return "#FF4500";
//     }

//     const floatBtn = document.createElement("a");
//     floatBtn.id = "widerruf-widget";
//     // CHECK 1 FIX: Real href for robots to follow if JS fails or for SEO
//     floatBtn.href = legalPage; 
//     floatBtn.innerText = options.buttonText || "Widerruf / Rückgabe";
    
//     Object.assign(floatBtn.style, {
//       position: "fixed", bottom: "20px", right: "20px", padding: "16px 24px",
//       backgroundColor: detectPrimaryColor(), color: "#fff", fontWeight: "bold",
//       borderRadius: "8px", cursor: "pointer", zIndex: 99999, textDecoration: "none",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.3)", fontFamily: "sans-serif"
//     });

//     document.body.appendChild(floatBtn);
    
//     // Fallback: Humans get the Modal, Robots see the Link
//     floatBtn.addEventListener("click", e => {
//       e.preventDefault();
//       openModal();
//     });

//     // --- 3. Auto-Inject into Footer/Nav (MutationObserver) ---
//     function injectLinks() {
//       ["footer", "nav", "header"].forEach(tag => {
//         const container = document.querySelector(tag);
//         if (container && !container.querySelector(".wf-link")) {
//           const link = document.createElement("a");
//           link.href = legalPage;
//           link.className = "wf-link";
//           link.textContent = "Widerruf";
//           link.style.marginLeft = "15px";
//           link.style.cursor = "pointer";
//           link.onclick = (e) => { e.preventDefault(); openModal(); };
//           container.appendChild(link);
//         }
//       });
//     }

//     injectLinks();
//     new MutationObserver(injectLinks).observe(document.body, { childList: true, subtree: true });
//   }

//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", () => initWiderruf());
//   } else {
//     initWiderruf();
//   }
// })();

(function() {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

  function initWiderruf(options = {}) {
    if (!document.body || document.getElementById("widerruf-widget")) return;

    const orderId = options.orderId || "";
    const userEmail = options.userEmail || "";
    const legalPage = options.legalPage || "/widerruf";

    // --- 1. MODAL CONTAINER ---
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
              Die vollständige <a href="${legalPage}" target="_blank" style="color:#2563eb; text-decoration:underline;">Widerrufsbelehrung</a> finden Sie hier.
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

      modal.querySelector("#wf-print-btn").onclick = () => {
        const win = window.open('', '_blank');
        win.document.write('<html><body style="font-family:sans-serif;padding:40px;"><h1>Widerrufsbelehrung</h1><p>Sie haben das Recht, binnen 14 Tagen diesen Vertrag zu widerrufen.</p></body></html>');
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
              <div style="text-align:center; padding:30px; font-family:sans-serif;">
                <h3 style="color:#10b981;">✅ Erfolgreich!</h3>
                <p>Ihr Widerruf wurde protokolliert. Eine Bestätigung wurde an <b>${payload.email}</b> gesendet.</p>
                <button onclick="location.reload()" style="margin-top:15px; padding:10px 20px; background:#1e293b; color:#fff; border:none; border-radius:6px; cursor:pointer;">Schließen</button>
              </div>`;
          }
        } catch (e) {
          alert("Fehler beim Senden. Bitte prüfen Sie Ihre Internetverbindung.");
          btn.innerText = "Widerruf bestätigen";
          btn.disabled = false;
        }
      };
    }

    // --- 2. THEME DETECTION ---
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

    // --- 3. FLOATING BUTTON ---
    const floatBtn = document.createElement("a");
    floatBtn.id = "widerruf-widget";
    floatBtn.href = legalPage;
    floatBtn.innerText = options.buttonText || "Widerruf / Rückgabe";
    
    Object.assign(floatBtn.style, {
      position: "fixed", bottom: "30px", right: "30px", padding: "16px 28px",
      backgroundColor: detectPrimaryColor(), color: "#fff", fontWeight: "bold",
      borderRadius: "50px", cursor: "pointer", zIndex: "2147483646", textDecoration: "none",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif"
    });

    document.body.appendChild(floatBtn);
    floatBtn.onclick = (e) => { e.preventDefault(); openModal(); };

    // --- 4. AUTO-INJECTION ---
    function injectLinks() {
      ["footer", "nav", "header"].forEach(tag => {
        const container = document.querySelector(tag);
        if (container && !container.querySelector(".wf-link")) {
          const link = document.createElement("a");
          link.href = legalPage;
          link.className = "wf-link";
          link.textContent = "Widerruf";
          link.style.cssText = "margin-left:15px; cursor:pointer; text-decoration:underline; font-size:14px; color:inherit;";
          link.onclick = (e) => { e.preventDefault(); openModal(); };
          container.appendChild(link);
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