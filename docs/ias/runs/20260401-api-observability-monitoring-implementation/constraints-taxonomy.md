# Constraints taxonomy

## Hard constraints (100% true)

- Must use Pino for logging (JSON format) with PII/secret redaction.
- Must use LogRocket for error tracking (integration approach pending).
- `/status` dashboard must be internal and secured (Basic Auth).
- No external database is required for metrics storage in this phase (in-memory only).
- No real secrets in git; use env vars and safe placeholders.
- Keep documentation under `docs/` Markdown-only and up to date with behavior.

## Soft constraints (negotiable)

- Logging/monitoring overhead should be small and easy to disable (`DISABLE_MONITORING=true`).
- Avoid introducing new infrastructure dependencies (e.g., Redis, external metrics DB).
- Keep code changes minimal and consistent with current Express/ESM style.

## Preferences (defaults)

- Node.js >= 20, ESM modules
- Express middleware pattern; small focused modules
- Tests via `node:test` + `supertest`

## Assumptions (explicit and testable)

- In-memory metrics are acceptable for an internal `/status` dashboard in this phase.
- Basic Auth is sufficient because `/status` is intended for internal access only.
- “DB connected” health semantics can be implemented via a configurable dependency probe (there is no DB today).

## Unknowns (to resolve)

- What dependency does “DB connected” refer to for `/health`? See `docs/ias/decisions/20260401-0002-define-health-db-check.md`.
- Which LogRocket backend SDK/API should be used for server-side error capture? See `docs/ias/decisions/20260401-0003-logrocket-backend-integration.md`.
- Who is the primary stakeholder / what is production status? See `docs/ias/decisions/20260401-0001-confirm-goal-stakeholders-production.md`.
