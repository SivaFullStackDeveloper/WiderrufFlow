

// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";
//   const LEGAL_PATH = "/widerruf";

//   // --- 1. THE LEGAL CONTENT ---
//   const legalTextGerman = `
//     <div id="wf-legal-page" style="max-width:800px; margin:40px auto; padding:20px; font-family:sans-serif; line-height:1.6; color:#333; background:#fff;">
//       <button id="wf-back-link" style="background:none; border:none; color:#2563eb; cursor:pointer; font-size:14px; font-weight:bold; padding:0; margin-bottom:20px;">← Zurück zum Shop</button>
//       <h1>Widerrufsbelehrung</h1>
//       <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
//       <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
//       <h3>Widerrufsrecht</h3>
//       <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Name, Anschrift, E-Mail) mittels einer eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
//       <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
//       <h3>Muster-Widerrufsformular</h3>
//       <div style="border:1px solid #ccc; padding:15px; background:#f9f9f9; border-radius:8px;">
//         An [Händler Name]:<br>
//         Hiermit widerrufe ich den Vertrag über den Kauf der folgenden Waren...<br><br>
//         Bestellt am/Erhalten am:<br>
//         Name des Verbrauchers:<br>
//         Datum:
//       </div>
//     </div>
//   `;

//   // --- 2. THEME DETECTION ---
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
//     return "#FF4500"; // Fallback Orange
//   }

//   function handleRouting() {
//     const path = window.location.pathname.toLowerCase();
//     if (path === LEGAL_PATH || path === "/widerrufsbelehrung") {
//       document.body.innerHTML = legalTextGerman;
//       document.body.style.background = "#fff";
//       document.title = "Widerrufsbelehrung";
//       window.scrollTo(0, 0);
//       const backBtn = document.getElementById("wf-back-link");
//       if(backBtn) backBtn.onclick = () => { window.history.pushState({}, "", "/"); location.reload(); };
//       return true; 
//     }
//     return false;
//   }

//   handleRouting();
//   window.onpopstate = handleRouting;

//   function initWiderruf() {
//     if (handleRouting()) return;
//     if (!document.body || document.getElementById("wf-modal-container")) return;

//     const brandColor = detectPrimaryColor();

//     // --- 3. MODAL SETUP ---
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
//               Die vollständige <a href="${LEGAL_PATH}" id="wf-modal-legal-link" style="color:#2563eb; text-decoration:underline;">Widerrufsbelehrung</a> finden Sie hier.
//             </p>
//             <button id="wf-print-btn" style="background:#fff; border:1px solid #cbd5e1; color:#2563eb; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:5px;">
//               🖨️ Als PDF speichern / Drucken
//             </button>
//           </div>
//           <div style="margin-bottom:12px;"><label style="display:block; font-size:12px; font-weight:bold;">Name</label><input type="text" id="wf-name" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;"></div>
//           <div style="margin-bottom:12px;"><label style="display:block; font-size:12px; font-weight:bold;">Bestellung #</label><input type="text" id="wf-order" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;"></div>
//           <div style="margin-bottom:20px;"><label style="display:block; font-size:12px; font-weight:bold;">E-Mail</label><input type="email" id="wf-email" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;"></div>
//           <button id="wf-confirm" style="width:100%; padding:14px; background:${brandColor}; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
//             Widerruf bestätigen
//           </button>
//           <button id="wf-cancel" style="width:100%; margin-top:10px; background:none; border:none; color:#94a3b8; cursor:pointer;">Abbrechen</button>
//         </div>
//       `;
//     document.body.appendChild(modal);

//     const openModal = () => { modal.style.display = "flex"; setTimeout(() => modal.style.opacity = "1", 10); };

//     // Events
//     modal.querySelector("#wf-print-btn").onclick = () => {
//       const win = window.open('', '_blank');
//       win.document.write('<html><body style="font-family:sans-serif;padding:40px;">' + legalTextGerman + '</body></html>');
//       win.document.close(); win.print();
//     };

  //  modal.querySelector("#wf-confirm").onclick = async () => {
  //     const btn = modal.querySelector("#wf-confirm");
      
  //     // Collect values
  //     const nameVal = document.getElementById("wf-name").value;
  //     const orderVal = document.getElementById("wf-order").value;
  //     const emailVal = document.getElementById("wf-email").value;

  //     const payload = {
  //       name: nameVal,
  //       orderId: orderVal,
  //       email: emailVal,
  //       domain: window.location.hostname
  //     };
      
  //     // 1. Validation check
  //     if (!payload.name || !payload.orderId || !payload.email) {
  //         alert("Bitte füllen Sie alle Felder aus.");
  //         return;
  //     }

  //     btn.innerText = "Wird gesendet...";
  //     btn.disabled = true;

  //     try {
  //       const res = await fetch(API_URL, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload)
  //       });

  //       if (res.ok) {
  //         // 2. SUCCESS DESIGN
  //         modal.querySelector("#wf-modal-content").innerHTML = `
  //           <div id="wf-success-wrapper" style="text-align:center; padding:20px; font-family:sans-serif;">
  //             <div style="font-size: 50px; margin-bottom: 10px;">✅</div>
  //             <h3 style="color:#28a745; margin:0 0 10px 0; font-size:22px;">Erfolgreich!</h3>
  //             <p style="color:#475569; font-size:15px; line-height:1.5; margin-bottom:20px;">
  //               Ihr Widerruf für die Bestellung <b>#${payload.orderId}</b> wurde protokolliert.<br><br>
  //               Eine Bestätigung wird in Kürze an <b>${payload.email}</b> gesendet.
  //             </p>
  //             <button id="wf-close" style="width:100%; padding:12px; background:#28a745; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
  //               Schließen
  //             </button>
  //           </div>
  //         `;
          
  //         // Re-attach close logic to the new button
  //         document.getElementById("wf-close").onclick = () => {
  //             modal.style.opacity = "0";
  //             setTimeout(() => {
  //                 modal.style.display = "none";
  //                 location.reload(); // Refresh to reset state
  //             }, 200);
  //         };

  //       } else {
  //         // If server returns 400 or 500
  //         throw new Error("Server Response Error");
  //       }
  //     } catch (e) {
  //       // 3. ERROR HANDLING (The "Feler" fix)
  //       console.error("WiderrufFlow Error:", e);
  //       alert("Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.");
  //       btn.innerText = "Widerruf bestätigen";
  //       btn.disabled = false;
  //     }
  //   };

//     modal.querySelector("#wf-cancel").onclick = () => { modal.style.opacity = "0"; setTimeout(() => modal.style.display = "none", 200); };

//     // --- 4. FLOATING BUTTON (With Color Adaptation) ---
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

//     // --- 5. ADAPTIVE INJECTION ---
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
//       legalLink.onclick = (e) => { e.preventDefault(); if (isModalTrigger) openModal(); else { window.history.pushState({}, "", LEGAL_PATH); handleRouting(); } };
//       if (sibling.parentElement.tagName === "LI") {
//           const newLi = document.createElement("li"); newLi.className = sibling.parentElement.className;
//           newLi.appendChild(legalLink); sibling.parentElement.parentNode.appendChild(newLi);
//       } else {
//           legalLink.style.marginLeft = "15px"; sibling.insertAdjacentElement('afterend', legalLink);
//       }
//     }

//     const run = () => { adaptiveInject("footer", "Widerrufsbelehrung", false); ["nav", "header"].forEach(tag => adaptiveInject(tag, "Widerruf", true)); };
//     run();
//     new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
//   }

//   if (document.readyState === "complete" || document.readyState === "interactive") initWiderruf();
//   else document.addEventListener("DOMContentLoaded", initWiderruf);
// })();

(function() {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";
  const LEGAL_PATH = "/widerruf";

  const legalTextGerman = `
    <div id="wf-legal-page" style="max-width:800px; margin:40px auto; padding:20px; font-family:sans-serif; line-height:1.6; color:#333; background:#fff;">
      <button id="wf-back-link" style="background:none; border:none; color:#2563eb; cursor:pointer; font-size:14px; font-weight:bold; padding:0; margin-bottom:20px;">← Zurück zum Shop</button>
      <h1>Widerrufsbelehrung</h1>
      <p>Sie haben das <b>Widerrufsrecht</b>, binnen <b>14 Tage</b> ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
      <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
      <h3>Details zum Widerrufsrecht</h3>
      <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung informieren.</p>
      <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
      <h3>Muster-Widerrufsformular</h3>
      <div style="border:1px solid #ccc; padding:15px; background:#f9f9f9; border-radius:8px;">
        An [Händler Name]:<br>
        Hiermit widerrufe ich den Vertrag...<br><br>
        Dieses <b>Formular</b> dient zur Ausübung des Widerrufs.
      </div>
    </div>
  `;

  function detectPrimaryColor() {
    const selectors = ['.btn-primary', '.button', 'button', '.navbar', 'header'];
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el) {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)" && bg !== "rgb(255, 255, 255)") {
          return bg;
        }
      }
    }
    return "#FF4500"; 
  }

  function handleRouting() {
    const path = window.location.pathname.toLowerCase();
    if (path === LEGAL_PATH || path.includes("widerrufsbelehrung")) {
      document.documentElement.innerHTML = `<html><body style="background:#fff;">${legalTextGerman}</body></html>`;
      document.title = "Widerrufsbelehrung";
      window.scrollTo(0, 0);
      
      const backBtn = document.getElementById("wf-back-link");
      if(backBtn) backBtn.onclick = (e) => { 
        e.preventDefault();
        window.history.pushState({}, "", "/"); 
        location.reload(); 
      };
      return true; 
    }
    return false;
  }

  if (handleRouting()) return;
  window.onpopstate = handleRouting;

  function initWiderruf() {
    if (handleRouting()) return;
    if (!document.body || document.getElementById("wf-modal-container")) return;

    const brandColor = detectPrimaryColor();

    const modal = document.createElement("div");
    modal.id = "wf-modal-container";
    Object.assign(modal.style, {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)", display: "none", justifyContent: "center",
      alignItems: "center", zIndex: "2147483647", opacity: 0, transition: "opacity 0.2s"
    });

    modal.innerHTML = `
        <div id="wf-modal-content" style="background:#fff; padding:30px; border-radius:12px; width:450px; max-width:90%; text-align:left; font-family:sans-serif; color:#333; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative;">
          <h3 style="margin-top:0;">Widerrufsbelehrung & Rückgabe</h3>
          <div style="background:#f8fafc; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #e2e8f0;">
            <p style="font-size:13px; margin:0 0 10px 0; line-height:1.4;">
              Sie können Ihre Vertragserklärung innerhalb von 14 Tagen widerrufen. 
              Die vollständige <a href="${LEGAL_PATH}" id="wf-modal-legal-link" style="color:#2563eb; text-decoration:underline; cursor:pointer;">Widerrufsbelehrung</a> finden Sie hier.
            </p>
            <button id="wf-print-btn" style="background:#fff; border:1px solid #cbd5e1; color:#2563eb; padding:6px 12px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold; display:flex; align-items:center; gap:5px;">
              🖨️ PDF / Drucken
            </button>
          </div>
          <div style="margin-bottom:12px;"><label style="display:block; font-size:12px; font-weight:bold;">Name</label><input type="text" id="wf-name" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;"></div>
          <div style="margin-bottom:12px;"><label style="display:block; font-size:12px; font-weight:bold;">Bestellung #</label><input type="text" id="wf-order" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;"></div>
          <div style="margin-bottom:20px;"><label style="display:block; font-size:12px; font-weight:bold;">E-Mail</label><input type="email" id="wf-email" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;"></div>
          
          <button id="wf-confirm" class="widerruf-bestaetigen-btn" style="width:100%; padding:14px; background:${brandColor}; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
            Widerruf bestätigen
          </button>
          
          <button id="wf-cancel" style="width:100%; margin-top:10px; background:none; border:none; color:#94a3b8; cursor:pointer;">Abbrechen</button>
        </div>
      `;
    document.body.appendChild(modal);

    const openModal = () => { modal.style.display = "flex"; setTimeout(() => modal.style.opacity = "1", 10); };

    // --- FIX: Event Listener für den Link IM Modal ---
    const modalLegalLink = modal.querySelector("#wf-modal-legal-link");
    if (modalLegalLink) {
      modalLegalLink.onclick = (e) => {
        e.preventDefault();
        window.history.pushState({}, "", LEGAL_PATH);
        handleRouting(); // Zeigt die Legal-Seite sofort an
      };
    }

    modal.querySelector("#wf-print-btn").onclick = () => {
      const win = window.open('', '_blank');
      win.document.write('<html><body style="font-family:sans-serif;padding:40px;">' + legalTextGerman + '</body></html>');
      win.document.close(); win.print();
    };

      modal.querySelector("#wf-confirm").onclick = async () => {
      const btn = modal.querySelector("#wf-confirm");
      
      // Collect values
      const nameVal = document.getElementById("wf-name").value;
      const orderVal = document.getElementById("wf-order").value;
      const emailVal = document.getElementById("wf-email").value;

      const payload = {
        name: nameVal,
        orderId: orderVal,
        email: emailVal,
        domain: window.location.hostname
      };
      
      // 1. Validation check
      if (!payload.name || !payload.orderId || !payload.email) {
          alert("Bitte füllen Sie alle Felder aus.");
          return;
      }

      btn.innerText = "Wird gesendet...";
      btn.disabled = true;

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          // 2. SUCCESS DESIGN
          modal.querySelector("#wf-modal-content").innerHTML = `
            <div id="wf-success-wrapper" style="text-align:center; padding:20px; font-family:sans-serif;">
              <div style="font-size: 50px; margin-bottom: 10px;">✅</div>
              <h3 style="color:#28a745; margin:0 0 10px 0; font-size:22px;">Erfolgreich!</h3>
              <p style="color:#475569; font-size:15px; line-height:1.5; margin-bottom:20px;">
                Ihr Widerruf für die Bestellung <b>#${payload.orderId}</b> wurde protokolliert.<br><br>
                Eine Bestätigung wird in Kürze an <b>${payload.email}</b> gesendet.
              </p>
              <button id="wf-close" style="width:100%; padding:12px; background:#28a745; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
                Schließen
              </button>
            </div>
          `;
          
          // Re-attach close logic to the new button
          document.getElementById("wf-close").onclick = () => {
              modal.style.opacity = "0";
              setTimeout(() => {
                  modal.style.display = "none";
                  location.reload(); // Refresh to reset state
              }, 200);
          };

        } else {
          // If server returns 400 or 500
          throw new Error("Server Response Error");
        }
      } catch (e) {
        // 3. ERROR HANDLING (The "Feler" fix)
        console.error("WiderrufFlow Error:", e);
        alert("Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.");
        btn.innerText = "Widerruf bestätigen";
        btn.disabled = false;
      }
    };
    modal.querySelector("#wf-cancel").onclick = () => { modal.style.opacity = "0"; setTimeout(() => modal.style.display = "none", 200); };

    const floatBtn = document.createElement("a");
    floatBtn.id = "widerruf-widget";
    floatBtn.innerText = "Widerruf / Rückgabe";
    Object.assign(floatBtn.style, {
      position: "fixed", bottom: "30px", right: "30px", padding: "14px 24px",
      backgroundColor: brandColor, color: "#fff", fontWeight: "bold",
      borderRadius: "50px", cursor: "pointer", zIndex: "2147483646",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif", textDecoration: "none"
    });
    document.body.appendChild(floatBtn);
    floatBtn.onclick = (e) => { e.preventDefault(); openModal(); };

    function adaptiveInject(selector, text, isModalTrigger) {
      const container = document.querySelector(selector);
      if (!container || container.querySelector(`.wf-link-injected`)) return;
      const sibling = container.querySelector('a');
      if (!sibling) return;

      const legalLink = document.createElement("a");
      legalLink.href = LEGAL_PATH;
      legalLink.textContent = text;
      legalLink.className = `${sibling.className} wf-link-injected`;
      const s = window.getComputedStyle(sibling);
      Object.assign(legalLink.style, { color: s.color, fontFamily: s.fontFamily, fontSize: s.fontSize, cursor: "pointer" });
      
      legalLink.onclick = (e) => { 
        e.preventDefault(); 
        if (isModalTrigger) openModal(); 
        else { window.history.pushState({}, "", LEGAL_PATH); handleRouting(); } 
      };

      if (sibling.parentElement.tagName === "LI") {
          const newLi = document.createElement("li"); 
          newLi.className = sibling.parentElement.className;
          newLi.appendChild(legalLink); 
          sibling.parentElement.parentNode.appendChild(newLi);
      } else {
          legalLink.style.marginLeft = "15px"; 
          sibling.insertAdjacentElement('afterend', legalLink);
      }
    }

    const run = () => { 
      adaptiveInject("footer", "Widerrufsbelehrung", false); 
      ["nav", "header"].forEach(tag => adaptiveInject(tag, "Widerruf", true)); 
    };
    run();
    new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "complete" || document.readyState === "interactive") initWiderruf();
  else document.addEventListener("DOMContentLoaded", initWiderruf);
})();








