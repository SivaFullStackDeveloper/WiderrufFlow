(function () {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

  window.WiderrufFlow = {
    init: function (options) {
      if (!options || !options.orderId || !options.userEmail) {
        console.error("WiderrufFlow: orderId and userEmail required");
        return;
      }

      const orderId = options.orderId;
      const userEmail = options.userEmail;

      // Create Withdraw Button
      const button = document.createElement("button");
      button.innerText = options.buttonText || "Widerruf / Cancel Contract";

      // Default mobile-friendly styles
      Object.assign(button.style, {
        position: options.buttonStyle?.position || "fixed",
        top: options.buttonStyle?.top || "auto",
        left: options.buttonStyle?.left || "auto",
        bottom: "calc(20px + env(safe-area-inset-bottom))",
        right: options.buttonStyle?.right || "20px",
        width: options.buttonStyle?.width || "90%",
        maxWidth: options.buttonStyle?.maxWidth || "320px",
        padding: "14px 20px",
        backgroundColor: options.buttonStyle?.backgroundColor || "#ff1e1e",
        color: options.buttonStyle?.color || "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        textAlign: "center",
        cursor: "pointer",
        zIndex: 99999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        touchAction: "manipulation",
      });

      document.body.appendChild(button);

      // Modal Overlay
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
        pointerEvents: "auto",
      });

      const modalContent = document.createElement("div");
      Object.assign(modalContent.style, {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        maxWidth: "90%",
        width: "400px",
      });

      const modalText = document.createElement("p");
      modalText.innerText = "Do you want to withdraw your order?";

      const confirmBtn = document.createElement("button");
      confirmBtn.innerText = "Confirm Withdrawal";
      Object.assign(confirmBtn.style, {
        margin: "10px",
        padding: "10px 20px",
        backgroundColor: "#FF4500",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      });

      const cancelBtn = document.createElement("button");
      cancelBtn.innerText = "Cancel";
      Object.assign(cancelBtn.style, {
        margin: "10px",
        padding: "10px 20px",
        backgroundColor: "#aaa",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      });

      modalContent.appendChild(modalText);
      modalContent.appendChild(confirmBtn);
      modalContent.appendChild(cancelBtn);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Open modal
      button.addEventListener("click", () => {
        modal.style.display = "flex";
      });

      // Close modal
      cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });

      // Confirm withdrawal
      confirmBtn.addEventListener("click", async () => {
        try {
          confirmBtn.disabled = true;
          confirmBtn.innerText = "Processing...";

          const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, userEmail }),
          });

          if (response.ok) {
            modalText.innerText =
              "Withdrawal confirmed! You will receive an email shortly.";
            confirmBtn.style.display = "none";
            cancelBtn.innerText = "Close";
          } else {
            modalText.innerText =
              "Failed to process withdrawal. Try again later.";
            confirmBtn.disabled = false;
            confirmBtn.innerText = "Confirm Withdrawal";
          }
        } catch (err) {
          modalText.innerText = "Network error. Try again later.";
          confirmBtn.disabled = false;
          confirmBtn.innerText = "Confirm Withdrawal";
        }
      });
    },
  };
})();