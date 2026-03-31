import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { store } from "../src/store.js";
import request from "supertest";
import { app } from "../src/server.js";

describe("store", () => {
  beforeEach(() => store.reset());

  it("lists seed incidents", () => {
    const incidents = store.list();
    assert.ok(incidents.length >= 3, "should have seed data");
    assert.ok(incidents[0].id, "each incident has an id");
    assert.ok(incidents[0].title, "each incident has a title");
    assert.ok(incidents[0].severity, "each incident has a severity");
    assert.ok(incidents[0].status, "each incident has a status");
    assert.ok(incidents[0].createdAt, "each incident has createdAt");
  });

  it("gets a single incident by id", () => {
    const all = store.list();
    const found = store.get(all[0].id);
    assert.equal(found.id, all[0].id);
  });

  it("returns null for unknown id", () => {
    const found = store.get("nonexistent");
    assert.equal(found, null);
  });

  it("creates an incident", () => {
    const before = store.list().length;
    const created = store.create({ title: "Test incident", severity: "low" });
    assert.equal(store.list().length, before + 1);
    assert.equal(created.title, "Test incident");
    assert.equal(created.severity, "low");
    assert.equal(created.status, "open");
    assert.ok(created.id);
    assert.ok(created.createdAt);
    assert.equal(created.resolvedAt, null);
  });

  it("updates an incident", () => {
    const all = store.list();
    const updated = store.update(all[0].id, { status: "resolved" });
    assert.equal(updated.status, "resolved");
    assert.ok(updated.resolvedAt);
  });

  it("returns null when updating unknown id", () => {
    const result = store.update("nonexistent", { status: "resolved" });
    assert.equal(result, null);
  });
});

describe("API", () => {
  beforeEach(() => store.reset());

  it("GET /api/incidents returns list", async () => {
    const res = await request(app).get("/api/incidents");
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length >= 3);
  });

  it("POST /api/incidents creates incident", async () => {
    const res = await request(app)
      .post("/api/incidents")
      .send({ title: "New incident", severity: "high" });
    assert.equal(res.status, 201);
    assert.equal(res.body.title, "New incident");
    assert.equal(res.body.severity, "high");
    assert.equal(res.body.status, "open");
  });

  it("POST /api/incidents validates required fields", async () => {
    const res = await request(app).post("/api/incidents").send({});
    assert.equal(res.status, 400);
  });

  it("POST /api/incidents rejects invalid severity", async () => {
    const res = await request(app)
      .post("/api/incidents")
      .send({ title: "Test", severity: "bananas" });
    assert.equal(res.status, 400);
  });

  it("GET /api/incidents/:id returns single incident", async () => {
    const list = await request(app).get("/api/incidents");
    const id = list.body[0].id;
    const res = await request(app).get(`/api/incidents/${id}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.id, id);
  });

  it("GET /api/incidents/:id returns 404 for unknown", async () => {
    const res = await request(app).get("/api/incidents/nonexistent");
    assert.equal(res.status, 404);
  });

  it("PATCH /api/incidents/:id updates incident", async () => {
    const list = await request(app).get("/api/incidents");
    const id = list.body[0].id;
    const res = await request(app)
      .patch(`/api/incidents/${id}`)
      .send({ status: "resolved" });
    assert.equal(res.status, 200);
    assert.equal(res.body.status, "resolved");
    assert.ok(res.body.resolvedAt);
  });

  it("PATCH /api/incidents/:id changes severity", async () => {
    const list = await request(app).get("/api/incidents");
    const id = list.body[0].id;
    const res = await request(app)
      .patch(`/api/incidents/${id}`)
      .send({ severity: "low" });
    assert.equal(res.status, 200);
    assert.equal(res.body.severity, "low");
  });

  it("PATCH /api/incidents/:id returns 404 for unknown", async () => {
    const res = await request(app)
      .patch("/api/incidents/nonexistent")
      .send({ status: "resolved" });
    assert.equal(res.status, 404);
  });
});
