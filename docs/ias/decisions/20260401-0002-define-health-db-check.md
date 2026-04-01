# Decision: Define what “DB connected” means for `/health`

- status: pending
- merge_blocker: false
- date: 2026-04-01
- owner: human

## Context

Acceptance criteria require `GET /health` to return `200` when the DB is connected and `503` otherwise. The current `incident-tracker` repo has an in-memory store and no database integration, so “DB connected” is ambiguous.

## Options considered

- Option A: Treat the in-memory incident store as the “DB” (always connected unless the process is unhealthy).
- Option B: Make the dependency check configurable (env-driven) and default to healthy when no DB is configured; add a deterministic way to simulate unhealthy for tests.
- Option C: Introduce a real DB dependency solely for the health check.

## Recommendation (current best guess)

Option B. Keep `/health` semantics compatible with a future real DB without adding new infrastructure today.

## Implementation notes

Until a real DB exists, implement `/health` with:

- a shallow process health check (always on)
- an optional dependency probe that can be:
  - enabled/configured via env vars, and
  - forced healthy/unhealthy for deterministic tests

## Acceptance criteria

- `/health` returns 200 in the default local configuration.
- `/health` can deterministically return 503 when dependency probe indicates unhealthy (documented and tested).
- If/when a real DB is introduced, the probe is updated to reflect it without changing the endpoint contract.
