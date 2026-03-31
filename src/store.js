import { randomUUID } from "node:crypto";

const SEED = [
  {
    id: randomUUID(),
    title: "Login endpoint returning 500 for SSO users",
    severity: "critical",
    status: "open",
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(),
    resolvedAt: null,
  },
  {
    id: randomUUID(),
    title: "Dashboard charts not loading on Safari",
    severity: "medium",
    status: "investigating",
    createdAt: new Date(Date.now() - 5 * 3600_000).toISOString(),
    resolvedAt: null,
  },
  {
    id: randomUUID(),
    title: "Stale cache headers on /api/users",
    severity: "low",
    status: "open",
    createdAt: new Date(Date.now() - 24 * 3600_000).toISOString(),
    resolvedAt: null,
  },
  {
    id: randomUUID(),
    title: "Memory leak in background job processor",
    severity: "high",
    status: "resolved",
    createdAt: new Date(Date.now() - 48 * 3600_000).toISOString(),
    resolvedAt: new Date(Date.now() - 12 * 3600_000).toISOString(),
  },
];

let incidents = [];

function reset() {
  incidents = SEED.map((i) => ({ ...i }));
}

// Initialize on import
reset();

export const store = {
  list() {
    return [...incidents].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },

  get(id) {
    return incidents.find((i) => i.id === id) ?? null;
  },

  create({ title, severity }) {
    const incident = {
      id: randomUUID(),
      title,
      severity,
      status: "open",
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };
    incidents.push(incident);
    return incident;
  },

  update(id, fields) {
    const incident = incidents.find((i) => i.id === id);
    if (!incident) return null;
    Object.assign(incident, fields);
    if (fields.status === "resolved" && !incident.resolvedAt) {
      incident.resolvedAt = new Date().toISOString();
    }
    return incident;
  },

  reset,
};
