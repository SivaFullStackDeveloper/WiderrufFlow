// widerrufflow.js
(function () {
  const API_URL = "https://widerrufflow.onrender.com/api/withdraw";

  // Initialize function exposed to client
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
      button.innerText = "Widerruf / Cancel Contract";
      button.style.position = "fixed";
      button.style.bottom = "20px";
      button.style.right = "20px";
      button.style.padding = "12px 20px";
      button.style.backgroundColor = "#1E90FF";
      button.style.color = "#fff";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.style.zIndex = 10000;

      document.body.appendChild(button);

      // Modal Overlay
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = 0;
      modal.style.left = 0;
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "none";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = 10001;

      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "#fff";
      modalContent.style.padding = "20px";
      modalContent.style.borderRadius = "8px";
      modalContent.style.textAlign = "center";
      modalContent.style.maxWidth = "400px";

      const modalText = document.createElement("p");
      modalText.innerText = "Do you want to withdraw your order?";

      const confirmBtn = document.createElement("button");
      confirmBtn.innerText = "Confirm Withdrawal";
      confirmBtn.style.margin = "10px";
      confirmBtn.style.padding = "10px 20px";
      confirmBtn.style.backgroundColor = "#FF4500";
      confirmBtn.style.color = "#fff";
      confirmBtn.style.border = "none";
      confirmBtn.style.borderRadius = "5px";
      confirmBtn.style.cursor = "pointer";

      const cancelBtn = document.createElement("button");
      cancelBtn.innerText = "Cancel";
      cancelBtn.style.margin = "10px";
      cancelBtn.style.padding = "10px 20px";
      cancelBtn.style.backgroundColor = "#aaa";
      cancelBtn.style.color = "#fff";
      cancelBtn.style.border = "none";
      cancelBtn.style.borderRadius = "5px";
      cancelBtn.style.cursor = "pointer";

      modalContent.appendChild(modalText);
      modalContent.appendChild(confirmBtn);
      modalContent.appendChild(cancelBtn);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Button click opens modal
      button.addEventListener("click", () => {
        modal.style.display = "flex";
      });

      // Cancel button closes modal
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
            modalText.innerText = "Withdrawal confirmed! You will receive an email shortly.";
            confirmBtn.style.display = "none";
            cancelBtn.innerText = "Close";
          } else {
            modalText.innerText = "Failed to process withdrawal. Try again later.";
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