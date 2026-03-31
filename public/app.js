const listEl = document.getElementById("incident-list");
const form = document.getElementById("create-form");

async function loadIncidents() {
  const res = await fetch("/api/incidents");
  const incidents = await res.json();

  if (incidents.length === 0) {
    listEl.textContent = "No incidents reported.";
    listEl.className = "empty";
    return;
  }

  // Clear and rebuild with safe DOM methods
  listEl.textContent = "";
  incidents.forEach((i) => {
    const card = document.createElement("div");
    card.className = "incident-card";

    const dot = document.createElement("div");
    dot.className = `severity-dot ${i.severity}`;

    const info = document.createElement("div");
    info.className = "incident-info";

    const title = document.createElement("div");
    title.className = "incident-title";
    title.textContent = i.title;

    const meta = document.createElement("div");
    meta.className = "incident-meta";
    meta.textContent = `${i.severity} \u00b7 ${timeAgo(i.createdAt)}`;

    info.appendChild(title);
    info.appendChild(meta);

    const status = document.createElement("span");
    status.className = `incident-status ${i.status}`;
    status.textContent = i.status;

    card.appendChild(dot);
    card.appendChild(info);
    card.appendChild(status);

    if (i.status !== "resolved") {
      const btn = document.createElement("button");
      btn.className = "resolve-btn";
      btn.textContent = "Resolve";
      btn.addEventListener("click", async () => {
        await fetch(`/api/incidents/${i.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "resolved" }),
        });
        loadIncidents();
      });
      card.appendChild(btn);
    }

    listEl.appendChild(card);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const severity = document.getElementById("severity").value;
  if (!title || !severity) return;

  await fetch("/api/incidents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, severity }),
  });

  form.reset();
  loadIncidents();
});

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

// Initial load
loadIncidents();
