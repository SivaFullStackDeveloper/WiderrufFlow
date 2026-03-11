// // (function() {
// //   const API_URL = "http://localhost:3000/api/withdraw";

// //   function initWiderruf(options) {
// //     if (document.getElementById("widerruf-widget")) return; // Prevent duplicates

// //     const button = document.createElement("button");
// //     button.id = "widerruf-widget";
// //     button.innerText = options.buttonText || "Widerruf / Rückgabe";

// //     Object.assign(button.style, {
// //       position: "fixed",
// //       bottom: "20px",
// //       right: "20px",
// //       padding: "16px 24px",
// //       backgroundColor: "#ff1e1e",
// //       color: "#fff",
// //       fontSize: "16px",
// //       fontWeight: "bold",
// //       border: "none",
// //       borderRadius: "8px",
// //       cursor: "pointer",
// //       zIndex: 99999,
// //       boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
// //     });

// //     document.body.appendChild(button);

// //     const modal = document.createElement("div");
// //     Object.assign(modal.style, {
// //       position: "fixed",
// //       top: 0,
// //       left: 0,
// //       width: "100%",
// //       height: "100%",
// //       backgroundColor: "rgba(0,0,0,0.5)",
// //       display: "none",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       zIndex: 100000
// //     });
// //     document.body.appendChild(modal);

// //     button.onclick = () => {
// //       modal.style.display = "flex";
// //       modal.innerHTML = `
// //         <div style="background:#fff; padding:30px; border-radius:12px; width:400px; max-width:90%; text-align:left; font-family:sans-serif;">
// //           <h3 style="margin-top:0; margin-bottom:10px;">Widerruf / Rückgabe</h3>
// //           <p style="font-size:14px; color:#666; margin-bottom:15px;">
// //             Sie können hier Ihren Widerruf oder Ihre Rückgabe einfach und schnell einleiten. 
// //             Die vollständige <a href="${options.legalPage}" target="_blank" style="color:#007bff; text-decoration:underline;">Widerrufsbelehrung</a> ist jederzeit verfügbar.
// //           </p>
// //           <label>Vollständiger Name</label>
// //           <input type="text" id="wf-name" placeholder="Name eingeben" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc; border-radius:4px;">
// //           <label>Bestellnummer</label>
// //           <input type="text" id="wf-order" value="${options.orderId || ''}" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc; border-radius:4px;">
// //           <label>E-Mail Adresse</label>
// //           <input type="email" id="wf-email" value="${options.userEmail || ''}" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ccc; border-radius:4px;">
// //           <button id="wf-confirm" style="width:100%; padding:14px; background:#FF4500; color:#fff; border:none; border-radius:5px;">Widerruf absenden</button>
// //           <button id="wf-cancel" style="width:100%; background:none; border:none; color:#888; margin-top:10px;">Abbrechen</button>
// //         </div>
// //       `;

// //       modal.querySelector("#wf-cancel").onclick = () => modal.style.display = "none";

// //       modal.querySelector("#wf-confirm").onclick = async () => {
// //         const payload = {
// //           name: modal.querySelector("#wf-name").value,
// //           orderId: modal.querySelector("#wf-order").value,
// //           email: modal.querySelector("#wf-email").value
// //         };
// //         if (!payload.name || !payload.orderId || !payload.email) return alert("Alle Felder sind Pflichtfelder.");

// //         try {
// //           const response = await fetch(API_URL, {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify(payload)
// //           });

// //           if (response.ok) {
// //             modal.innerHTML = `
// //               <div style="text-align:center; padding:10px;">
// //                 <h3 style="color:green;">Erfolgreich!</h3>
// //                 <p>Ihr Widerruf wurde protokolliert. Eine Bestätigung wurde an <b>${payload.email}</b> gesendet.</p>
// //                 <button id="wf-close" style="padding:10px 20px; background:#333; color:#fff; border:none; border-radius:5px; cursor:pointer;">Schließen</button>
// //               </div>
// //             `;
// //             modal.querySelector("#wf-close").onclick = () => modal.style.display = "none";
// //           } else throw new Error();
// //         } catch {
// //           alert("Fehler. Bitte versuchen Sie es später erneut.");
// //         }
// //       };
// //     };
// //   }

// //   // Expose globally for one-line snippet
// //   window.WiderrufFlow = { init: initWiderruf };
// // })();



// (function() {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

//   function initWiderruf(options = {}) {
//     if (document.getElementById("widerruf-widget")) return;

//     const orderId = options.orderId || "";
//     const userEmail = options.userEmail || "";
//     const legalPage = options.legalPage || "/widerruf";

//     // Create button
//     const button = document.createElement("button");
//     button.id = "widerruf-widget";
//     button.innerText = options.buttonText || "Widerruf / Rückgabe";

//     Object.assign(button.style, {
//       position: "fixed",
//       bottom: "20px",
//       right: "20px",
//       padding: "16px 24px",
//       backgroundColor: "#ff1e1e",
//       color: "#fff",
//       fontSize: "16px",
//       fontWeight: "bold",
//       border: "none",
//       borderRadius: "8px",
//       cursor: "pointer",
//       zIndex: 99999,
//       boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
//     });

//     document.body.appendChild(button);

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
//       zIndex: 100000
//     });
//     document.body.appendChild(modal);

//     button.onclick = () => {
//       modal.style.display = "flex";
//       modal.innerHTML = `
//         <div style="background:#fff; padding:30px; border-radius:12px; width:400px; max-width:90%; text-align:left; font-family:sans-serif;">
//           <h3>Widerruf / Rückgabe</h3>
//           <p>Sie können hier Ihren Widerruf einleiten. Die vollständige <a href="${legalPage}" target="_blank">Widerrufsbelehrung</a> ist jederzeit verfügbar.</p>
//           <label>Name</label>
//           <input type="text" id="wf-name" style="width:100%; margin-bottom:10px; padding:8px; border:1px solid #ccc;">
//           <label>Bestellnummer</label>
//           <input type="text" id="wf-order" value="${orderId}" style="width:100%; margin-bottom:10px; padding:8px; border:1px solid #ccc;">
//           <label>E-Mail</label>
//           <input type="email" id="wf-email" value="${userEmail}" style="width:100%; margin-bottom:15px; padding:8px; border:1px solid #ccc;">
//           <button id="wf-confirm" style="width:100%; padding:12px; background:#FF4500; color:#fff; border:none; border-radius:5px;">Absenden</button>
//           <button id="wf-cancel" style="width:100%; margin-top:8px; background:none; border:none; color:#888;">Abbrechen</button>
//         </div>
//       `;

//       modal.querySelector("#wf-cancel").onclick = () => modal.style.display = "none";

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
//             modal.innerHTML = `<div style="text-align:center; padding:15px;"><h3 style="color:green;">Erfolgreich!</h3><p>Widerruf protokolliert. Bestätigung an <b>${payload.email}</b>.</p></div>`;
//           } else throw new Error();
//         } catch {
//           alert("Fehler. Bitte später erneut versuchen.");
//         }
//       };
//     };
//   }

//   // Automatically init on every page without extra code
//   document.addEventListener("DOMContentLoaded", () => initWiderruf({
//     orderId: "",
//     userEmail: "",
//     legalPage: "/widerruf"
//   }));

// })();



(function() {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

  function initWiderruf(options = {}) {
    if (document.getElementById("widerruf-widget")) return;

    const orderId = options.orderId || "";
    const userEmail = options.userEmail || "";
    const legalPage = options.legalPage || "/widerruf";

    // 1️⃣ Create a real link button
    const button = document.createElement("a");
    button.id = "widerruf-widget";
    button.href = legalPage; // direct link to full Widerrufsbelehrung
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

    // 2️⃣ Optional modal for form submission
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
      zIndex: 100000
    });
    document.body.appendChild(modal);

    // 3️⃣ Open modal on button click (still navigates if user wants)
    button.addEventListener("click", (e) => {
      e.preventDefault(); // comment this line if you want the link to open directly
      modal.style.display = "flex";
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
          <button id="wf-confirm" style="width:100%; padding:12px; background:#FF4500; color:#fff; border:none; border-radius:5px;">Absenden</button>
          <button id="wf-cancel" style="width:100%; margin-top:8px; background:none; border:none; color:#888;">Abbrechen</button>
        </div>
      `;

      modal.querySelector("#wf-cancel").onclick = () => modal.style.display = "none";

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
            modal.innerHTML = `<div style="text-align:center; padding:15px;"><h3 style="color:green;">Erfolgreich!</h3><p>Widerruf protokolliert. Bestätigung an <b>${payload.email}</b>.</p></div>`;
          } else throw new Error();
        } catch {
          alert("Fehler. Bitte später erneut versuchen.");
        }
      };
    });
  }

  // ✅ Automatically inject on every page
  document.addEventListener("DOMContentLoaded", () => initWiderruf({
    orderId: "",
    userEmail: "",
    legalPage: "/widerruf"
  }));

  window.WiderrufFlow = { init: initWiderruf };
})();