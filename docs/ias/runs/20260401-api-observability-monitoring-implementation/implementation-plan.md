# Implementation plan (milestones)

Goal: keep the holistic plan visible while still enabling iterative delivery.

## North star

- Base goal (link): `docs/ias/context/base-goal.md`
- Success criteria (link): `docs/ias/runs/20260401-api-observability-monitoring-implementation/acceptance-criteria.md`

## Milestones (ordered)

For each milestone, define a PR-sized deliverable.

### M0 — Design package (if user-facing)

- Outcome: repo-only design system + key screens are explicit and implementable.
- Deliverables:
  - `docs/ias/design/brief.md`
  - `docs/ias/design/system.md`
  - `docs/ias/design/flows.md`
  - `docs/ias/design/screens.md`
- Evidence (optional): UI snapshots for key screens (desktop + mobile).

### M1 — Observability foundations (logging + health + metrics)

- Outcome: Requests are logged in structured JSON with redaction, `/health` is available, and in-memory latency metrics are collected behind a kill switch.
- Scope (what’s included):
  - Pino + request logging middleware (JSON logs to stdout)
  - Redaction for PII/secrets in request fields/headers
  - `DISABLE_MONITORING=true` bypasses monitoring middleware
  - `GET /health` endpoint (process + dependency check scaffold)
  - In-memory request latency + uptime stats (exported for `/status` later)
  - Tests for core behaviors (health status, redaction, kill switch)
- Non-goals:
  - LogRocket integration
  - `/status` dashboard UI
  - Persistent metrics storage
- Acceptance checks (how we know it’s done):
  - JSON logs emitted for requests
  - Redaction verified by tests
  - `/health` returns 200 by default and can return 503 when dependency check indicates unhealthy (see decision)
  - Kill switch disables logging/metrics middleware
- Verification (tests/build/lint/typecheck):
  - `npm test`
- UX evidence (screenshots/demo steps, if user-facing):
  - n/a (no UI change expected in M1)
- Risks / decisions / gaps:
  - Define “DB connected” for `/health`: `docs/ias/decisions/20260401-0002-define-health-db-check.md`

### M2 — Internal status dashboard + LogRocket

- Outcome: Operators can view a secured internal status dashboard and 500-level errors are captured by LogRocket.
- Scope:
  - `GET /status` route (HTML) showing uptime + latency metrics
  - Basic Auth protection for `/status`
  - LogRocket initialization (env-driven) + capture unhandled errors and 500 responses
- Non-goals:
  - External log aggregation configuration
  - Distributed tracing / OpenTelemetry
- Acceptance checks:
  - `/status` requires Basic Auth and renders metrics
  - LogRocket is initialized and called for 500 errors (verified via tests/mocks)
- Verification:
  - `npm test`
- UX evidence:
  - UI snapshots per `docs/ias/runs/20260401-api-observability-monitoring-implementation/ui-snapshot-plan.md`
- Risks / decisions / gaps:
  - Confirm LogRocket backend integration: `docs/ias/decisions/20260401-0003-logrocket-backend-integration.md`

## Open questions (if any)

- Confirm production status + stakeholder owner: `docs/ias/decisions/20260401-0001-confirm-goal-stakeholders-production.md`
- Define `/health` dependency (“DB connected”) check: `docs/ias/decisions/20260401-0002-define-health-db-check.md`
- Confirm LogRocket backend SDK/API and env vars: `docs/ias/decisions/20260401-0003-logrocket-backend-integration.md`
