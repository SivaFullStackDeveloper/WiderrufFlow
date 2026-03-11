
(function() {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

  function initWiderruf(options = {}) {
    if (document.getElementById("widerruf-widget")) return;

    const orderId = options.orderId || "";
    const userEmail = options.userEmail || "";
    const legalPage = options.legalPage || "/widerruf";

    // 1️⃣ Floating button
    const button = document.createElement("a");
    button.id = "widerruf-widget";
    button.href = legalPage;
    button.target = "_blank";
    button.innerText = options.buttonText || "Widerruf / Rückgabe";
    Object.assign(button.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "16px 24px",
      backgroundColor: "#ff1e1e",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      zIndex: 99999,
      textDecoration: "none",
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
    });
    document.body.appendChild(button);

    // 2️⃣ Modal container
    const modal = document.createElement("div");
    Object.assign(modal.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100000,
      opacity: 1,
    });
    document.body.appendChild(modal);

    // 3️⃣ Button click opens modal
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Reset modal state for multiple opens
      modal.style.display = "flex";
      modal.style.opacity = "1";
      modal.style.transition = "none";

      // Inject modal content
      modal.innerHTML = `
        <div style="background:#fff; padding:30px; border-radius:12px; width:400px; max-width:90%; text-align:left; font-family:sans-serif;">
          <h3>Widerruf / Rückgabe</h3>
          <p>Die vollständige <a href="${legalPage}" target="_blank" style="color:#007bff; text-decoration:underline;">Widerrufsbelehrung</a> ist jederzeit verfügbar.</p>
          <label>Name</label>
          <input type="text" id="wf-name" style="width:100%; margin-bottom:10px; padding:8px; border:1px solid #ccc;">
          <label>Bestellnummer</label>
          <input type="text" id="wf-order" value="${orderId}" style="width:100%; margin-bottom:10px; padding:8px; border:1px solid #ccc;">
          <label>E-Mail</label>
          <input type="email" id="wf-email" value="${userEmail}" style="width:100%; margin-bottom:15px; padding:8px; border:1px solid #ccc;">
          <button id="wf-confirm" style="width:100%; padding:12px; background:#FF4500; color:#fff; border:none; border-radius:5px; cursor:pointer;">Absenden</button>
          <button id="wf-cancel" style="width:100%; margin-top:8px; background:none; border:none; color:#888; cursor:pointer;">Abbrechen</button>
        </div>
      `;

      // Cancel button closes modal
      modal.querySelector("#wf-cancel").onclick = () => {
        modal.style.transition = "opacity 0.3s";
        modal.style.opacity = "0";
        setTimeout(() => modal.style.display = "none", 300);
      };

      // Confirm button submits form
      modal.querySelector("#wf-confirm").onclick = async () => {
        const payload = {
          name: modal.querySelector("#wf-name").value,
          orderId: modal.querySelector("#wf-order").value,
          email: modal.querySelector("#wf-email").value
        };
        if (!payload.name || !payload.orderId || !payload.email) return alert("Alle Felder sind Pflichtfelder.");

        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          if (res.ok) {
            // Show success message
            modal.innerHTML = `
              <div id="wf-message" style="
                max-width: 400px;
                margin: 50px auto;
                padding: 20px;
                background: #f0fff4;
                border-left: 6px solid #28a745;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                text-align: center;
                font-family: Arial, sans-serif;
              ">
                <h3 style="color:#28a745; margin-bottom: 10px;">Erfolgreich!</h3>
                <p style="color:#333; font-size: 16px; margin-bottom: 20px;">
                  Ihr Widerruf wurde protokolliert. Eine Bestätigung wurde an <b>${payload.email}</b> gesendet.
                </p>
                <button id="wf-close" style="
                  padding: 10px 25px;
                  background: #28a745;
                  color: #fff;
                  border: none;
                  border-radius: 5px;
                  font-size: 15px;
                  cursor: pointer;
                  transition: background 0.3s, transform 0.2s;
                ">Schließen</button>
              </div>
            `;

            // Attach close button listener
            const closeBtn = document.getElementById("wf-close");
            closeBtn.addEventListener("click", () => {
              modal.style.transition = "opacity 0.3s";
              modal.style.opacity = "0";
              setTimeout(() => modal.style.display = "none", 300);
            });
          } else throw new Error();
        } catch {
          alert("Fehler. Bitte später erneut versuchen.");
        }
      };
    });
  }

  // Automatically inject on every page
  document.addEventListener("DOMContentLoaded", () => initWiderruf({
    orderId: "",
    userEmail: "",
    legalPage: "/widerruf"
  }));

  window.WiderrufFlow = { init: initWiderruf };
})();
