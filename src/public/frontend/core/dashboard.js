const fallbackComponents = {
  sidebar: `
    <aside class="rf-sidebar glass">
      <div class="rf-logo-wrap"><div class="rf-logo">WF</div><div><h1>WiderrufFlow</h1><p>Revenue Control Suite</p></div></div>
      <nav class="rf-nav">
        <a data-route="dashboard" href="dashboard.html">Dashboard</a>
        <a data-route="ledger" href="ledger.html">Ledger</a>
        <a data-route="analytics" href="analytics.html">Analytics</a>
        <a data-route="profile" href="profile.html">Profile</a>
        <a data-route="email-template" href="email-template.html">Email Template</a>
        <a data-route="widerruf-template" href="widerruf-template.html">Widerruf Template</a>
      </nav>
      <button class="rf-button rf-button-primary" id="open-modal" type="button">Quick Action</button>
    </aside>`,
  modal: `
    <div class="rf-modal" id="global-modal" aria-hidden="true">
      <div class="rf-modal-card glass">
        <div class="rf-modal-header"><h2>Create New Flow</h2><button id="close-modal" class="rf-icon-btn" type="button">✕</button></div>
        <form id="quick-flow-form" class="rf-modal-form">
          <label>Customer Name<input type="text" name="customer" placeholder="Acme GmbH" required /></label>
          <label>Case Type<select name="type"><option>Chargeback</option><option>Widerruf</option><option>Refund</option></select></label>
          <label>Amount (€)<input type="number" name="amount" min="1" step="0.01" placeholder="149.90" required /></label>
          <button class="rf-button rf-button-primary" type="submit">Save Case</button>
        </form>
      </div>
    </div>`,
  cards: `
    <section class="rf-card-grid">
      <article class="rf-card glass"><h3>Revenue Protected</h3><p class="rf-card-value" data-kpi="revenue">€4.28M</p><small>+12.6% this month</small></article>
      <article class="rf-card glass"><h3>Open Cases</h3><p class="rf-card-value" data-kpi="cases">389</p><small>41 high-priority</small></article>
      <article class="rf-card glass"><h3>Automation Rate</h3><p class="rf-card-value" data-kpi="automation">87%</p><small>Target: 90%</small></article>
      <article class="rf-card glass"><h3>Avg. Resolution</h3><p class="rf-card-value" data-kpi="resolution">3.4d</p><small>-0.8d vs last quarter</small></article>
    </section>`
};

const pageConfig = {
  dashboard: {
    title: "Command Center",
    subtitle: "Monitor refund flow, SLAs, and risk signals in one clean cockpit.",
    panel: () => `<div class="rf-chart glass"><h3>Case Velocity</h3><div class="rf-chart-bars"><span style="--h:68%"></span><span style="--h:52%"></span><span style="--h:74%"></span><span style="--h:81%"></span><span style="--h:63%"></span><span style="--h:88%"></span></div></div>`
  },
  ledger: {
    title: "Financial Ledger",
    subtitle: "Track every euro across disputes, reimbursements, and recovered funds.",
    panel: () => `
      <div class="rf-table glass">
        <div class="rf-panel-top"><h3>Recent Entries</h3><input id="ledger-search" placeholder="Search case ID..." /></div>
        <table>
          <thead><tr><th>Case</th><th>Status</th><th>Amount</th></tr></thead>
          <tbody id="ledger-body"></tbody>
        </table>
      </div>`
  },
  analytics: {
    title: "Smart Analytics",
    subtitle: "Understand trends, predict churn risk, and optimize response quality.",
    panel: () => `
      <div class="rf-chart glass">
        <div class="rf-panel-top"><h3>Win Probability</h3><select id="analytics-range"><option value="7">Last 7 Days</option><option value="30" selected>Last 30 Days</option><option value="90">Last 90 Days</option></select></div>
        <div class="rf-pills" id="analytics-pills"></div>
      </div>`
  },
  profile: {
    title: "Team Profile",
    subtitle: "Manage your company identity, preferences, and legal settings.",
    panel: () => `
      <form class="rf-profile glass" id="profile-form">
        <h3>Account Snapshot</h3>
        <label>Owner<input name="owner" value="Lisa Keller" /></label>
        <label>Company<input name="company" value="WiderrufFlow GmbH" /></label>
        <label>Locale<select name="locale"><option>DE / EN</option><option>EN</option><option>DE</option></select></label>
        <button class="rf-button rf-button-primary" type="submit">Save Profile</button>
      </form>`
  },
  "email-template": {
    title: "Email Template Designer",
    subtitle: "Craft high-converting, compliant case response emails.",
    panel: () => `
      <div class="rf-editor-grid">
        <div class="rf-editor glass"><h3>Template Draft</h3><textarea id="email-body">Hallo {{customer_name}},\n\nwir bestätigen den Eingang Ihres Widerrufs...</textarea><div class="rf-actions"><button class="rf-button" id="copy-email" type="button">Copy</button></div></div>
        <div class="rf-editor glass"><h3>Live Preview</h3><pre id="email-preview"></pre></div>
      </div>`
  },
  "widerruf-template": {
    title: "Widerruf Legal Template",
    subtitle: "Maintain legal-safe wording with dynamic customer placeholders.",
    panel: () => `
      <div class="rf-editor-grid">
        <div class="rf-editor glass"><h3>Legal Body</h3><textarea id="legal-body">Hiermit widerrufe ich den von mir abgeschlossenen Vertrag...\n\nKundennummer: {{customer_id}}</textarea><div class="rf-actions"><button class="rf-button" id="download-legal" type="button">Download .txt</button></div></div>
        <div class="rf-editor glass"><h3>Rendered Preview</h3><pre id="legal-preview"></pre></div>
      </div>`
  }
};

const ledgerData = [
  { id: "#WF-8821", status: "Recovered", amount: "€1,209.00" },
  { id: "#WF-8817", status: "Open", amount: "€89.95" },
  { id: "#WF-8792", status: "Pending Bank", amount: "€420.40" },
  { id: "#WF-8744", status: "In Review", amount: "€739.10" }
];

const analyticsByRange = {
  "7": ["Retail 81%", "SaaS 89%", "Logistics 73%", "Digital Goods 85%"],
  "30": ["Retail 84%", "SaaS 91%", "Logistics 76%", "Digital Goods 88%"],
  "90": ["Retail 78%", "SaaS 87%", "Logistics 70%", "Digital Goods 83%"]
};

const style = `
:root {
  --primary: #2563eb;
  --dark: #0f172a;
  --text: #334155;
  --muted: #64748b;
  --bg: #ffffff;
  --line: #dbe3f1;
  --card: rgba(255, 255, 255, 0.92);
  --accent: #667eea;
  --accent2: #764ba2;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system;
  color: var(--text);
  background: radial-gradient(circle at 50% -20%, #eff6ff 0%, #ffffff 100%);
  min-height: 100vh;
}
body::before,
body::after {
  content: "";
  position: fixed;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.24;
  z-index: -1;
}
body::before { background: #3b82f6; top: -120px; left: -150px; }
body::after { background: #6366f1; right: -120px; bottom: -150px; }
.rf-shell { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; gap: 20px; padding: 20px; }
.glass {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 22px 45px rgba(37, 99, 235, 0.09);
}
.rf-sidebar { padding: 22px; display: flex; flex-direction: column; gap: 22px; }
.rf-logo-wrap { display: flex; align-items: center; gap: 12px; }
.rf-logo {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #1e3a8a;
}
.rf-logo-wrap h1 { margin: 0; font-size: 1.08rem; color: var(--dark); }
.rf-logo-wrap p { margin: 0; color: var(--muted); font-size: .85rem; }
.rf-nav { display: grid; gap: 8px; }
.rf-nav a {
  color: var(--text);
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid transparent;
  font-weight: 500;
}
.rf-nav a.active,
.rf-nav a:hover {
  border-color: #cdd9f6;
  background: #eff6ff;
  color: var(--dark);
}
.rf-main { padding: 8px 4px; }
.rf-header h2 { margin: 2px 0 0; font-size: 2rem; color: var(--dark); }
.rf-header p { color: var(--muted); margin: 6px 0 20px; }
.rf-card-grid { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit,minmax(190px,1fr)); }
.rf-card { padding: 16px; }
.rf-card h3 { margin: 0; color: var(--muted); font-size: .88rem; font-weight: 500; }
.rf-card-value { font-size: 1.7rem; margin: 8px 0 4px; font-weight: 700; color: var(--dark); }
.rf-button {
  border: 1px solid #d3def9;
  border-radius: 12px;
  padding: 11px 14px;
  font-weight: 600;
  cursor: pointer;
  background: #f8fbff;
  color: var(--text);
}
.rf-button-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: #ffffff;
  border: none;
}
.rf-panel { margin-top: 16px; }
.rf-chart,.rf-table,.rf-profile,.rf-editor { padding: 16px; }
.rf-chart-bars { display: grid; grid-template-columns: repeat(6,1fr); align-items: end; gap: 8px; height: 160px; margin-top: 16px; }
.rf-chart-bars span { height: var(--h); border-radius: 10px 10px 4px 4px; background: linear-gradient(180deg, #60a5fa, #818cf8); }
.rf-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
.rf-pills span { border: 1px solid var(--line); border-radius: 20px; padding: 6px 10px; color: var(--muted); background: #f8fbff; }
.rf-table table { width: 100%; border-collapse: collapse; color: var(--text); }
.rf-table th,.rf-table td { text-align: left; padding: 10px 8px; border-bottom: 1px solid var(--line); }
textarea,input,select {
  width: 100%;
  background: #ffffff;
  color: var(--text);
  border: 1px solid #d7deeb;
  border-radius: 10px;
  padding: 10px;
  margin-top: 6px;
}
textarea:focus,input:focus,select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
textarea { min-height: 220px; resize: vertical; }
.rf-panel-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.rf-editor-grid { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.rf-actions { margin-top: 10px; display: flex; gap: 8px; }
pre { white-space: pre-wrap; margin: 0; font-family: inherit; line-height: 1.5; min-height: 220px; }
.rf-toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  background: #ffffff;
  border: 1px solid var(--line);
  color: var(--dark);
  padding: 10px 14px;
  border-radius: 12px;
  z-index: 55;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.14);
}
.rf-modal { position: fixed; inset: 0; background: rgba(15, 23, 42, .35); display: none; place-items: center; padding: 20px; z-index: 40; }
.rf-modal.open { display: grid; }
.rf-modal-card { width: min(500px,100%); padding: 16px; }
.rf-modal-header { display: flex; justify-content: space-between; align-items: center; }
.rf-icon-btn { border: 1px solid var(--line); background: transparent; color: var(--dark); width: 34px; height: 34px; border-radius: 10px; }
.rf-modal-form { display: grid; gap: 12px; }
@media (max-width: 920px) { .rf-shell { grid-template-columns: 1fr; } }
`;

function showToast(message) {
  const oldToast = document.querySelector(".rf-toast");
  if (oldToast) oldToast.remove();
  const toast = document.createElement("div");
  toast.className = "rf-toast";
  toast.textContent = message;
  document.body.append(toast);
  setTimeout(() => toast.remove(), 1800);
}

function renderLedgerRows(query = "") {
  const body = document.getElementById("ledger-body");
  if (!body) return;
  const normalized = query.trim().toLowerCase();
  const filtered = ledgerData.filter((entry) => entry.id.toLowerCase().includes(normalized));
  body.innerHTML = filtered.map((row) => `<tr><td>${row.id}</td><td>${row.status}</td><td>${row.amount}</td></tr>`).join("") || "<tr><td colspan='3'>No results</td></tr>";
}

function renderAnalytics(range = "30") {
  const host = document.getElementById("analytics-pills");
  if (!host) return;
  host.innerHTML = (analyticsByRange[range] || analyticsByRange["30"]).map((item) => `<span>${item}</span>`).join("");
}

function bindPanelInteractions(route) {
  if (route === "ledger") {
    renderLedgerRows();
    document.getElementById("ledger-search")?.addEventListener("input", (event) => renderLedgerRows(event.target.value));
  }

  if (route === "analytics") {
    renderAnalytics("30");
    document.getElementById("analytics-range")?.addEventListener("change", (event) => renderAnalytics(event.target.value));
  }

  if (route === "profile") {
    const form = document.getElementById("profile-form");
    const saved = localStorage.getItem("wf-profile");
    if (saved && form) {
      const profile = JSON.parse(saved);
      Object.keys(profile).forEach((key) => {
        if (form.elements[key]) form.elements[key].value = profile[key];
      });
    }
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem("wf-profile", JSON.stringify(data));
      showToast("Profile saved");
    });
  }

  if (route === "email-template") {
    const textarea = document.getElementById("email-body");
    const preview = document.getElementById("email-preview");
    const syncPreview = () => {
      if (preview && textarea) preview.textContent = textarea.value.replace("{{customer_name}}", "Mia Weber");
    };
    syncPreview();
    textarea?.addEventListener("input", syncPreview);
    document.getElementById("copy-email")?.addEventListener("click", async () => {
      if (!textarea) return;
      try {
        await navigator.clipboard.writeText(textarea.value);
        showToast("Email template copied");
      } catch {
        showToast("Clipboard unavailable");
      }
    });
  }

  if (route === "widerruf-template") {
    const textarea = document.getElementById("legal-body");
    const preview = document.getElementById("legal-preview");
    const syncPreview = () => {
      if (preview && textarea) preview.textContent = textarea.value.replace("{{customer_id}}", "CUST-48293");
    };
    syncPreview();
    textarea?.addEventListener("input", syncPreview);
    document.getElementById("download-legal")?.addEventListener("click", () => {
      if (!textarea) return;
      const blob = new Blob([textarea.value], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "widerruf-template.txt";
      link.click();
      URL.revokeObjectURL(url);
    });
  }
}

async function loadComponent(path, fallback) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Failed to load component");
    return await response.text();
  } catch {
    return fallback;
  }
}

async function initRevFlow() {
  const app = document.getElementById("app");
  if (!app) return;

  document.head.insertAdjacentHTML("beforeend", `<style>${style}</style>`);

  const [sidebar, modal, cards] = await Promise.all([
    loadComponent("../components/sidebar.html", fallbackComponents.sidebar),
    loadComponent("../components/modal.html", fallbackComponents.modal),
    loadComponent("../components/cards.html", fallbackComponents.cards)
  ]);

  const renderRoute = (route, pushState = true) => {
    const safeRoute = pageConfig[route] ? route : "dashboard";
    const config = pageConfig[safeRoute];

    app.innerHTML = `
      <div class="rf-shell">
        ${sidebar}
        <main class="rf-main">
          <header class="rf-header">
            <h2>${config.title}</h2>
            <p>${config.subtitle}</p>
          </header>
          ${cards}
          <section class="rf-panel">${config.panel()}</section>
        </main>
      </div>
      ${modal}
    `;

    app.querySelectorAll(".rf-nav a").forEach((link) => {
      const linkRoute = link.dataset.route;
      link.classList.toggle("active", linkRoute === safeRoute);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        renderRoute(linkRoute, true);
      });
    });

    if (pushState) {
      const target = `${safeRoute}.html`;
      if (!window.location.pathname.endsWith(target)) {
        window.history.pushState({ route: safeRoute }, "", target);
      }
    }

    bindPanelInteractions(safeRoute);

    const modalEl = document.getElementById("global-modal");
    document.getElementById("open-modal")?.addEventListener("click", () => modalEl?.classList.add("open"));
    document.getElementById("close-modal")?.addEventListener("click", () => modalEl?.classList.remove("open"));
    modalEl?.addEventListener("click", (event) => {
      if (event.target === modalEl) modalEl.classList.remove("open");
    });

    document.getElementById("quick-flow-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const customer = formData.get("customer");
      const amount = formData.get("amount");
      showToast(`Case for ${customer} (€${amount}) saved.`);
      modalEl?.classList.remove("open");
      event.target.reset();
    });
  };

  const initialRoute = window.location.pathname.split("/").pop()?.replace(".html", "") || document.body.dataset.page || "dashboard";
  renderRoute(initialRoute, false);

  window.addEventListener("popstate", () => {
    const route = window.location.pathname.split("/").pop()?.replace(".html", "") || "dashboard";
    renderRoute(route, false);
  });
}

initRevFlow();
