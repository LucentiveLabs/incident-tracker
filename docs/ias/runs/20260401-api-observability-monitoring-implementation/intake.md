# Intake (base problem/goal)

## Base goal

What do we want to achieve (outcome statement)?

If this is a project-level goal, ensure it’s also captured in `docs/ias/context/base-goal.md`.

Add an API observability and monitoring suite to `incident-tracker` (health checks, JSON logging with PII redaction, LogRocket error tracking, and a secured internal status dashboard) without requiring an external metrics database.

## Handshake (confirm before building)

Write a short “what we understood” summary and the minimum questions needed to proceed.

- understanding summary: Add request/response observability to the Express API (logging + health + minimal metrics), plus an internal `/status` dashboard and error capture via LogRocket.
- proposed next actions: Implement M1 (Pino logging + redaction, monitoring toggle, `/health`, in-memory latency metrics + tests), then M2 (`/status` + Basic Auth + LogRocket hookup).
- assumptions: This repo is not currently deployed to production; a “DB check” must be defined because there is no DB integration yet.
- follow-up questions: Confirm production status + stakeholder owner; confirm what “DB connected” means for `/health`; confirm which LogRocket backend SDK/API to use.
- explicit go/no-go (who approves?): Primary stakeholder (TBD; see decision `docs/ias/decisions/20260401-0001-confirm-goal-stakeholders-production.md`).

## Engagement type

- brownfield

## UX / UI relevance

- user_facing: true (internal `/status` dashboard)
- design_gate (from `docs/ias/project-context.md`): optional
- ui_snapshots_commit (from `docs/ias/project-context.md`): false

## Production status

- production: false (assumed; see decision `docs/ias/decisions/20260401-0001-confirm-goal-stakeholders-production.md`)
- deployed_version_ref (if applicable): n/a

## Stakeholders

- primary stakeholder: Engineering (TBD)
- users: Backend developers and operators (DevOps/SRE)
- other stakeholders: Security/compliance (PII/secret handling), on-call responders

## Non-negotiable constraints (hard constraints)

- Markdown-only documentation under `docs/` (keep docs current with behavior changes).
- No real secrets in git (use placeholders/mocks and document required env vars).
- Must use Pino for logging as per architectural preference.
- Must use LogRocket for error tracking.
- Dashboard must be internal and secured.
- No external database should be required for metrics storage in this phase.

## Context and inputs

- repo links / docs: `README.md`, `docs/ias/project-context.md`, `docs/ias/context/inputs.md`
- existing requirements: `docs/ias/runs/20260401-api-observability-monitoring-implementation/requirements.md`
- examples / references: `docs/ias/context/inputs.md` (external links)

## Success criteria

- See: `docs/ias/runs/20260401-api-observability-monitoring-implementation/acceptance-criteria.md`
- GET /health returns 200 OK when DB is connected, 503 otherwise.
- Logs are emitted in JSON format to stdout.
- PII and secrets are redacted from logs using Pino's redaction feature.
- LogRocket SDK is initialized and captures 500-level errors.
- GET /status is secured by Basic Auth and displays uptime and latency metrics.
- Setting DISABLE_MONITORING=true disables the monitoring middleware.

## Risk tolerance

- medium
