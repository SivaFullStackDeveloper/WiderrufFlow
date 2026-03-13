(function() {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";
  const LEGAL_HASH = "#widerruf";

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
    return "#2563eb"; 
  }
function detectTheme() {
  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);

  // 1. THE "CSS VARIABLE" LIST (Expanded)
  const colorVars = [
    '--color-primary', '--color-btn-bg', '--brand-primary', 
    '--accent-color', '--theme-primary', '--primary', '--main-color'
  ];

  let primary = "";

  // Try Variables first
  for (let v of colorVars) {
    let val = rootStyles.getPropertyValue(v).trim();
    if (val && val.length > 3) { primary = val; break; }
  }

  // 2. THE "ELEMENT SAMPLING" FALLBACK (If variables fail)
  if (!primary) {
    // Look for the "Add to Cart" or "Submit" button which usually has the brand color
    const bestMatch = document.querySelector(
      'button[type="submit"], .btn-primary, .button--primary, [class*="primary"]'
    );
    if (bestMatch) {
      primary = window.getComputedStyle(bestMatch).backgroundColor;
    }
  }
let primary2 = detectPrimaryColor();
  // Final Default if everything fails
  if (!primary || primary === "transparent" || primary === "rgba(0, 0, 0, 0)") {
    primary = primary2; 
  }

  // 3. CONTRAST CHECKER (Black or White text?)
  // This prevents white text on a light yellow button
  const tempDiv = document.createElement("div");
  tempDiv.style.color = primary;
  document.body.appendChild(tempDiv);
  const rgb = window.getComputedStyle(tempDiv).color.match(/\d+/g);
  document.body.removeChild(tempDiv);
  
  const brightness = rgb ? (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 : 0;
  const contrastText = brightness > 180 ? "#333333" : "#ffffff";

  return {
    primary: primary,
    contrastText: contrastText,
    font: getComputedStyle(document.body).fontFamily || "sans-serif"
  };
}

const THEME = detectTheme();

const font = getComputedStyle(document.body).fontFamily;
document.body.style.fontFamily = font;
  // 1. RESTORED ULTRA-STABLE DESIGN (From your passing version)
 const legalHTML = `

<div id="wf-legal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:#fff; z-index:2147483647; overflow-y:auto; padding:40px; font-family:sans-serif; line-height:1.6; color:#333;">
  <div style="max-width:750px; margin:0 auto;">

    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
      <a href="#" id="wf-close-legal" style="color:${THEME.primary}; text-decoration:none; font-weight:bold;">← Zurück</a>
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

    
    <div id="wf-form-container" style="border:2px solid ${THEME.primary}; padding:30px; border-radius:12px; background:#f8fafc;">
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

      <button id="wf-submit-audit" style="width:100%; padding:16px; background:${THEME.primary}; color:${THEME.contrastText}; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:18px;">
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
          document.getElementById('wf-form-container').innerHTML = `

<div id="wf-success-wrapper" style="text-align:center; padding:20px; font-family:sans-serif;">
  <div style="font-size:50px; margin-bottom:10px;">✅</div>

  <h3 style="color:#28a745; margin:0 0 10px 0; font-size:22px;">
    Erfolgreich!
  </h3>

  <p style="color:#475569; font-size:15px; line-height:1.5; margin-bottom:20px;">
    Ihr Widerruf für die Bestellung <b>#${payload.orderId}</b> wurde protokolliert.<br><br>
    Eine Bestätigung wird in Kürze an <b>${payload.email}</b> gesendet.
  </p>

  <button id="wf-close"
  style="width:100%; padding:12px; background:#28a745; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
    Schließen
  </button>

</div>
`;

const overlay = document.getElementById("wf-legal-overlay");

document.getElementById("wf-close").onclick = () => {

  overlay.style.opacity = "0";

 
    overlay.style.display = "none";
    document.body.style.overflow = "";
    window.location.hash = "";
  

};
     
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
      backgroundColor: THEME.primary,color: "#fff", fontWeight: "bold",
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