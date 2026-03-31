import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { store } from "./store.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// --- API routes ---

app.get("/api/incidents", (_req, res) => {
  res.json(store.list());
});

app.get("/api/incidents/:id", (req, res) => {
  const incident = store.get(req.params.id);
  if (!incident) return res.status(404).json({ error: "Not found" });
  res.json(incident);
});

app.post("/api/incidents", (req, res) => {
  const { title, severity } = req.body;
  const validSeverities = ["low", "medium", "high", "critical"];
  if (!title || !severity || !validSeverities.includes(severity)) {
    return res.status(400).json({ error: "title and valid severity are required" });
  }
  const incident = store.create({ title, severity });
  res.status(201).json(incident);
});

app.patch("/api/incidents/:id", (req, res) => {
  const { status, severity } = req.body;
  const incident = store.update(req.params.id, { ...(status && { status }), ...(severity && { severity }) });
  if (!incident) return res.status(404).json({ error: "Not found" });
  res.json(incident);
});

// --- Start server (only when run directly, not when imported by tests) ---

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Incident Tracker running at http://localhost:${PORT}`);
  });
}
