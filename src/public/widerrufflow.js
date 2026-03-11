// (function () {
//   const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

//   window.WiderrufFlow = {
//     init: function (options) {
//       if (!options || !options.orderId || !options.userEmail) {
//         console.error("WiderrufFlow: orderId and userEmail required");
//         return;
//       }

//       const orderId = options.orderId;
//       const userEmail = options.userEmail;

//       // Create Withdraw Button
//       const button = document.createElement("button");
//       button.innerText = options.buttonText || "Widerruf / Cancel Contract";

//       // Default mobile-friendly styles
//       Object.assign(button.style, {
//         position: options.buttonStyle?.position || "fixed",
//         top: options.buttonStyle?.top || "auto",
//         left: options.buttonStyle?.left || "auto",
//         bottom: "calc(20px + env(safe-area-inset-bottom))",
//         right: options.buttonStyle?.right || "20px",
//         width: options.buttonStyle?.width || "90%",
//         maxWidth: options.buttonStyle?.maxWidth || "320px",
//         padding: "14px 20px",
//         backgroundColor: options.buttonStyle?.backgroundColor || "#ff1e1e",
//         color: options.buttonStyle?.color || "#fff",
//         border: "none",
//         borderRadius: "8px",
//         fontSize: "16px",
//         textAlign: "center",
//         cursor: "pointer",
//         zIndex: 99999,
//         boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//         touchAction: "manipulation",
//       });

//       document.body.appendChild(button);

//       // Modal Overlay
//       const modal = document.createElement("div");
//       Object.assign(modal.style, {
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         display: "none",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 100000,
//         pointerEvents: "auto",
//       });

//       const modalContent = document.createElement("div");
//       Object.assign(modalContent.style, {
//         backgroundColor: "#fff",
//         padding: "20px",
//         borderRadius: "8px",
//         textAlign: "center",
//         maxWidth: "90%",
//         width: "400px",
//       });

//       const modalText = document.createElement("p");
//       modalText.innerText = "Do you want to withdraw your order?";

//       const confirmBtn = document.createElement("button");
//       confirmBtn.innerText = "Confirm Withdrawal";
//       Object.assign(confirmBtn.style, {
//         margin: "10px",
//         padding: "10px 20px",
//         backgroundColor: "#FF4500",
//         color: "#fff",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//       });

//       const cancelBtn = document.createElement("button");
//       cancelBtn.innerText = "Cancel";
//       Object.assign(cancelBtn.style, {
//         margin: "10px",
//         padding: "10px 20px",
//         backgroundColor: "#aaa",
//         color: "#fff",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//       });

//       modalContent.appendChild(modalText);
//       modalContent.appendChild(confirmBtn);
//       modalContent.appendChild(cancelBtn);
//       modal.appendChild(modalContent);
//       document.body.appendChild(modal);

//       // Open modal
//       button.addEventListener("click", () => {
//         modal.style.display = "flex";
//       });

//       // Close modal
//       cancelBtn.addEventListener("click", () => {
//         modal.style.display = "none";
//       });

//       // Confirm withdrawal
//       confirmBtn.addEventListener("click", async () => {
//         try {
//           confirmBtn.disabled = true;
//           confirmBtn.innerText = "Processing...";

//           const response = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ orderId, userEmail }),
//           });

//           if (response.ok) {
//             modalText.innerText =
//               "Withdrawal confirmed! You will receive an email shortly.";
//             confirmBtn.style.display = "none";
//             cancelBtn.innerText = "Close";
//           } else {
//             modalText.innerText =
//               "Failed to process withdrawal. Try again later.";
//             confirmBtn.disabled = false;
//             confirmBtn.innerText = "Confirm Withdrawal";
//           }
//         } catch (err) {
//           modalText.innerText = "Network error. Try again later.";
//           confirmBtn.disabled = false;
//           confirmBtn.innerText = "Confirm Withdrawal";
//         }
//       });
//     },
//   };
// })();




(function () {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

  window.WiderrufFlow = {
    init: function (options) {
      // 1. Create the Main Trigger Button
      const button = document.createElement("button");
      button.innerText = options.buttonText || "Widerruf";

      Object.assign(button.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "14px 20px",
        backgroundColor: "#ff1e1e",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        zIndex: 99999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
      });

      document.body.appendChild(button);

      // 2. Create the Modal Overlay
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

      // 3. The "Open Modal" Logic (Injects the fields)
      button.onclick = () => {
        modal.style.display = "flex";
        modal.innerHTML = `
          <div style="background:#fff; padding:25px; border-radius:12px; width:350px; text-align:left; font-family: sans-serif;">
            <h3 style="margin:0 0 10px 0;">Widerruf bestätigen</h3>
            <p style="font-size:14px; color:#666; margin-bottom:15px;">Bitte bestätigen Sie Ihre Angaben:</p>
            
            <label style="font-size:12px; font-weight:bold; display:block; margin-bottom:5px;">Vollständiger Name</label>
            <input type="text" id="wf-name" placeholder="Name eingeben" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box;">
            
            <label style="font-size:12px; font-weight:bold; display:block; margin-bottom:5px;">Bestellnummer</label>
            <input type="text" id="wf-order" value="${options.orderId || ''}" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box;">
            
            <label style="font-size:12px; font-weight:bold; display:block; margin-bottom:5px;">E-Mail Adresse</label>
            <input type="email" id="wf-email" value="${options.userEmail || ''}" style="width:100%; padding:10px; margin-bottom:20px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box;">
            
            <button id="wf-confirm" style="width:100%; padding:12px; background:#FF4500; color:#fff; border:none; border-radius:5px; font-weight:bold; cursor:pointer;">Kostenpflichtig widerrufen</button>
            <button id="wf-cancel" style="width:100%; background:none; border:none; color:#888; margin-top:10px; cursor:pointer;">Abbrechen</button>
          </div>
        `;

        // Handle Cancel
        modal.querySelector("#wf-cancel").onclick = () => { modal.style.display = "none"; };

        // Handle Confirm
        modal.querySelector("#wf-confirm").onclick = async () => {
          const confirmBtn = modal.querySelector("#wf-confirm");
          const payload = {
            name: modal.querySelector("#wf-name").value,
            orderId: modal.querySelector("#wf-order").value,
            email: modal.querySelector("#wf-email").value
          };

          if (!payload.name || !payload.orderId || !payload.email) return alert("Alle Felder sind Pflichtfelder.");

          confirmBtn.disabled = true;
          confirmBtn.innerText = "Wird verarbeitet...";

          try {
            const response = await fetch(API_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            if (response.ok) {
              modal.querySelector("div").innerHTML = `
                <div style="text-align:center; padding:10px;">
                  <h3 style="color:green;">Erfolgreich!</h3>
                  <p>Ihr Widerruf wurde protokolliert. Eine Bestätigung wurde an <b>${payload.email}</b> gesendet.</p>
                  <button id="wf-close" style="padding:10px 20px; background:#333; color:#fff; border:none; border-radius:5px; cursor:pointer;">Schließen</button>
                </div>
              `;
              modal.querySelector("#wf-close").onclick = () => { modal.style.display = "none"; };
            } else {
              throw new Error();
            }
          } catch (err) {
            alert("Fehler. Bitte versuchen Sie es später erneut.");
            confirmBtn.disabled = false;
            confirmBtn.innerText = "Kostenpflichtig widerrufen";
          }
        };
      };
    },
  };
})();