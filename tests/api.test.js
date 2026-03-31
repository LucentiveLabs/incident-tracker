import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { store } from "../src/store.js";

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
