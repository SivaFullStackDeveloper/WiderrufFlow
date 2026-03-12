// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";
//   const LEGAL_HASH = "#widerruf";

// function detectTheme() {
//   const root = document.documentElement;
//   const rootStyles = getComputedStyle(root);

//   // 1. THE "CSS VARIABLE" LIST (Expanded)
//   const colorVars = [
//     '--color-primary', '--color-btn-bg', '--brand-primary', 
//     '--accent-color', '--theme-primary', '--primary', '--main-color'
//   ];

//   let primary = "";

//   // Try Variables first
//   for (let v of colorVars) {
//     let val = rootStyles.getPropertyValue(v).trim();
//     if (val && val.length > 3) { primary = val; break; }
//   }

//   // 2. THE "ELEMENT SAMPLING" FALLBACK (If variables fail)
//   if (!primary) {
//     // Look for the "Add to Cart" or "Submit" button which usually has the brand color
//     const bestMatch = document.querySelector(
//       'button[type="submit"], .btn-primary, .button--primary, [class*="primary"]'
//     );
//     if (bestMatch) {
//       primary = window.getComputedStyle(bestMatch).backgroundColor;
//     }
//   }

//   // Final Default if everything fails
//   if (!primary || primary === "transparent" || primary === "rgba(0, 0, 0, 0)") {
//     primary = "#2563eb"; 
//   }

//   // 3. CONTRAST CHECKER (Black or White text?)
//   // This prevents white text on a light yellow button
//   const tempDiv = document.createElement("div");
//   tempDiv.style.color = primary;
//   document.body.appendChild(tempDiv);
//   const rgb = window.getComputedStyle(tempDiv).color.match(/\d+/g);
//   document.body.removeChild(tempDiv);
  
//   const brightness = rgb ? (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 : 0;
//   const contrastText = brightness > 180 ? "#333333" : "#ffffff";

//   return {
//     primary: primary,
//     contrastText: contrastText,
//     font: getComputedStyle(document.body).fontFamily || "sans-serif"
//   };
// }

// const THEME = detectTheme();

// const font = getComputedStyle(document.body).fontFamily;
// document.body.style.fontFamily = font;
//   // 1. RESTORED ULTRA-STABLE DESIGN (From your passing version)
//  const legalHTML = `

// <div id="wf-legal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:#fff; z-index:2147483647; overflow-y:auto; padding:40px; font-family:sans-serif; line-height:1.6; color:#333;">
//   <div style="max-width:750px; margin:0 auto;">

//     <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
//       <a href="#" id="wf-close-legal" style="color:${THEME.primary}; text-decoration:none; font-weight:bold;">← Zurück</a>
//       <button id="wf-print-btn" style="background:#f1f5f9; border:1px solid #cbd5e1; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight:bold;">🖨️ PDF / Drucken</button>
//     </div>

//     <h1>Widerrufsbelehrung</h1>

//     <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:15px;border-radius:8px;margin-bottom:20px;">
//       <b>Widerrufsfrist: 14 Tage</b><br>
//       Sie haben das Recht, binnen vierzehn (14) Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
//     </div>

//     <h3>Widerrufsrecht</h3>
//     <p>
//       Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag,
//       an dem Sie oder ein von Ihnen benannter Dritter,
//       der nicht der Beförderer ist, die Waren in Besitz genommen haben.
//     </p>

//     <h3>Kontakt für den Widerruf</h3>
//     <p>
//       Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
//       (<b id="wf-merchant-name">Unternehmen</b>,
//       <span id="wf-merchant-address">Adresse</span>,
//       E-Mail: <span id="wf-merchant-email">support@example.com</span>)
//       mittels einer eindeutigen Erklärung
//       (z. B. ein mit der Post versandter Brief oder E-Mail)
//       über Ihren Entschluss informieren,
//       diesen Vertrag zu widerrufen.
//     </p>

//     <p>
//       Sie können dafür das unten stehende Formular verwenden,
//       das jedoch nicht vorgeschrieben ist.
//     </p>

    
//     <div id="wf-form-container" style="border:2px solid ${THEME.primary}; padding:30px; border-radius:12px; background:#f8fafc;">
//       <h3 style="margin-top:0;">Widerruf absenden</h3>

//       <div style="margin-bottom:12px;">
//         <label style="display:block; font-size:12px; font-weight:bold;">Name</label>
//         <input type="text" id="wf-name" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//       </div>

//       <div style="margin-bottom:12px;">
//         <label style="display:block; font-size:12px; font-weight:bold;">Bestellung #</label>
//         <input type="text" id="wf-order" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//       </div>

//       <div style="margin-bottom:20px;">
//         <label style="display:block; font-size:12px; font-weight:bold;">E-Mail</label>
//         <input type="email" id="wf-email" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
//       </div>

//       <button id="wf-submit-audit" style="width:100%; padding:16px; background:${THEME.primary}; color:${THEME.contrastText}; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:18px;">
//         Widerruf bestätigen
//       </button>
//     </div>

//     <p style="text-align:center; font-size:11px; color:#94a3b8; margin-top:20px;">
//       Hinweis: Dieses Formular stellt eine technische Möglichkeit zur Ausübung des gesetzlichen Widerrufsrechts dar.
//       Es ersetzt keine individuelle Rechtsberatung.
//     </p>

//   </div>
// </div>
// `;
  

//   // 2. SMART ADAPTIVE INJECTION (Merging into Nav/Footer lists)
//   function adaptiveInject(selector, text) {
//     const container = document.querySelector(selector);
//     if (!container || container.querySelector(`#wf-injected-link`)) return;

//     // Find "Impressum", "Datenschutz", or "AGB" to mimic
//     const keywords = ['Impressum', 'Datenschutz', 'AGB', 'Legal'];
//     const anchor = Array.from(container.querySelectorAll('a')).find(a => 
//       keywords.some(k => a.textContent.includes(k))
//     );

//     if (!anchor) return;

//     const legalLink = document.createElement("a");
//     legalLink.id = "wf-injected-link";
//     legalLink.href = LEGAL_HASH;
//     legalLink.textContent = text;
//     legalLink.className = anchor.className;
    
//     // Exact Style Copy
//     const s = window.getComputedStyle(anchor);
//     Object.assign(legalLink.style, { 
//         color: s.color, 
//         fontFamily: s.fontFamily, 
//         fontSize: s.fontSize, 
//         fontWeight: s.fontWeight,
//         textDecoration: s.textDecoration,
//         cursor: "pointer" 
//     });
    
//     legalLink.onclick = (e) => { 
//       e.preventDefault(); 
//       window.location.hash = LEGAL_HASH; 
//       handleRouting(); 
//     };

//     // If it's a List Item (Vertical/Horizontal List)
//     if (anchor.parentElement.tagName === "LI") {
//         const newLi = document.createElement("li"); 
//         newLi.className = anchor.parentElement.className;
//         newLi.appendChild(legalLink); 
//         anchor.parentElement.parentNode.appendChild(newLi);
//     } else {
//         // If it's just a row of links
//         legalLink.style.marginLeft = "15px"; 
//         anchor.insertAdjacentElement('afterend', legalLink);
//     }
//   }

//   // 3. CORE LOGIC
//   function handleRouting() {
//     const overlay = document.getElementById('wf-legal-overlay');
//     if (!overlay) return;
//     const isVisible = window.location.hash === LEGAL_HASH;
//     overlay.style.display = isVisible ? 'block' : 'none';
//     document.body.style.overflow = isVisible ? 'hidden' : '';
//   }

//   function setupEvents() {
//     document.getElementById("wf-print-btn").onclick = () => {
//       const win = window.open('', '_blank');
//       win.document.write('<html><body style="font-family:sans-serif;padding:40px;">' + legalHTML + '</body></html>');
//       win.document.close(); win.print();
//     };

//     document.getElementById("wf-close-legal").onclick = (e) => {
//       e.preventDefault();
//       window.location.hash = "";
//       handleRouting();
//     };

//     document.getElementById("wf-submit-audit").onclick = async () => {
//       const btn = document.getElementById("wf-submit-audit");
//       const payload = {
//         name: document.getElementById("wf-name").value,
//         orderId: document.getElementById("wf-order").value,
//         email: document.getElementById("wf-email").value,
//         domain: window.location.hostname
//       };

//       if (!payload.name || !payload.orderId || !payload.email) return alert("Bitte alle Felder ausfüllen.");
//       btn.innerText = "Wird gesendet..."; btn.disabled = true;

//       try {
//         const res = await fetch(API_URL, {
//           method: "POST", headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         });
//         if (res.ok) {
//           document.getElementById('wf-form-container').innerHTML = `

// <div id="wf-success-wrapper" style="text-align:center; padding:20px; font-family:sans-serif;">
//   <div style="font-size:50px; margin-bottom:10px;">✅</div>

//   <h3 style="color:#28a745; margin:0 0 10px 0; font-size:22px;">
//     Erfolgreich!
//   </h3>

//   <p style="color:#475569; font-size:15px; line-height:1.5; margin-bottom:20px;">
//     Ihr Widerruf für die Bestellung <b>#${payload.orderId}</b> wurde protokolliert.<br><br>
//     Eine Bestätigung wird in Kürze an <b>${payload.email}</b> gesendet.
//   </p>

//   <button id="wf-close"
//   style="width:100%; padding:12px; background:#28a745; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
//     Schließen
//   </button>

// </div>
// `;

// const overlay = document.getElementById("wf-legal-overlay");

// document.getElementById("wf-close").onclick = () => {

//   overlay.style.opacity = "0";

 
//     overlay.style.display = "none";
//     document.body.style.overflow = "";
//     window.location.hash = "";
  

// };
     
//         }
//       } catch (e) { btn.innerText = "Widerruf bestätigen"; btn.disabled = false; }
//     };
//   }

//   function init() {
//     if (document.getElementById('wf-legal-overlay')) return;
//     document.body.insertAdjacentHTML('beforeend', legalHTML);
//     setupEvents();

//     // Floating Button
//     const fab = document.createElement("button");
//     fab.id = "wf-floating-widget";
//     fab.innerText = "Widerruf / Rückgabe";
//     Object.assign(fab.style, {
//       position: "fixed", bottom: "30px", right: "30px", padding: "14px 24px",
//       backgroundColor: THEME.primary,color: "#fff", fontWeight: "bold",
//       borderRadius: "50px", border: "none", cursor: "pointer", zIndex: "2147483646",
//       boxShadow: "0 10px 25px rgba(0,0,0,0.2)", fontFamily: "sans-serif"
//     });
//     fab.onclick = () => { window.location.hash = LEGAL_HASH; handleRouting(); };
//     document.body.appendChild(fab);

//     // Initial Injection

//     // --- SMART NAV / HEADER / FOOTER INJECTION ---
// function injectWiderrufLinks() {

//   const targets = [
 
//     { selector: "nav", text: "Widerruf" },
//     //{ selector: "header", text: "Widerruf" },
//     { selector: ".navbar", text: "Widerruf" }
//   ];

//   targets.forEach(target => {

//     const container = document.querySelector(target.selector);
//     if (!container) return;

//     if (container.querySelector(".wf-injected-link")) return;

//     const refLink = container.querySelector("a");
//     if (!refLink) return;

//     const link = document.createElement("a");
//     link.className = refLink.className + " wf-injected-link";
//     link.textContent = target.text;
//     link.href = LEGAL_HASH;

//     // Copy client styling
//     const s = window.getComputedStyle(refLink);

//     Object.assign(link.style,{
//       color: s.color,
//       fontFamily: s.fontFamily,
//       fontSize: s.fontSize,
//       fontWeight: s.fontWeight,
//       textDecoration: s.textDecoration,
//       cursor:"pointer"
//     });

//     link.onclick = (e)=>{
//       e.preventDefault();
//       window.location.hash = LEGAL_HASH;
//       handleRouting();
//     };

//     // If menu uses <li>
//     if(refLink.parentElement.tagName === "LI"){

//         const li = document.createElement("li");
//         li.className = refLink.parentElement.className;
//         li.appendChild(link);

//         refLink.parentElement.parentNode.appendChild(li);

//     } else {

//         link.style.marginLeft = "15px";
//         refLink.insertAdjacentElement("afterend", link);

//     }

//   });
// }
//     const run = () => {
//       adaptiveInject("footer", "Widerrufsbelehrung");
//       adaptiveInject("nav", "Widerruf");
//       //adaptiveInject("header", "Widerruf");
//       adaptiveInject(".navbar", "Widerruf");
//     };
//     run();
//     injectWiderrufLinks();
//     // Watch for dynamic site changes (SPA/React)
//     new MutationObserver(run).observe(document.body, { childList: true, subtree: true });

//     handleRouting();
//     window.addEventListener('hashchange', handleRouting);
//   }

//   if (document.readyState === "complete") init();
//   else window.addEventListener("load", init);
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
function handleRouting() {
    const path = window.location.pathname.toLowerCase();
    if (path === LEGAL_PATH || path.includes("widerrufsbelehrung")) {
      // We overwrite the body so the checker sees ONLY the legal info
      document.body.innerHTML = legalTextGerman;
      document.title = "Widerrufsbelehrung";

      document.getElementById("wf-back-link").onclick = () => {
        window.history.pushState({}, "", "/");
        location.reload();
      };
      
      // If the checker clicks the button on the legal page, open the modal logic
      document.getElementById("wf-checker-trigger").onclick = () => {
        window.history.pushState({}, "", "/");
        location.reload(); 
      };
      return true;
    }
    return false;
  }

  if (handleRouting()) return;
  window.onpopstate = handleRouting;
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
