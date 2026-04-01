# Intake (base problem/goal)

## Base goal

What do we want to achieve (outcome statement)?

If this is a project-level goal, ensure it’s also captured in `docs/ias/context/base-goal.md`.

## Handshake (confirm before building)

Write a short “what we understood” summary and the minimum questions needed to proceed.

- understanding summary:
- proposed next actions:
- assumptions:
- follow-up questions:
- explicit go/no-go (who approves?):

## Engagement type

- greenfield | brownfield | process

## UX / UI relevance

- user_facing: true|false
- design_gate (from `docs/ias/project-context.md`): required|optional
- ui_snapshots_commit (from `docs/ias/project-context.md`): true|false

## Production status

- production: true|false
- deployed_version_ref (if applicable):

## Stakeholders

- primary stakeholder:
- users:
- other stakeholders:

## Non-negotiable constraints (hard constraints)

- TODO

- Must use Pino for logging as per architectural preference.
- Must use LogRocket for error tracking.
- Dashboard must be internal and secured.
- No external database should be required for metrics storage in this phase.
## Context and inputs

- repo links / docs:
- existing requirements:
- examples / references:

## Success criteria

- TODO

- GET /health returns 200 OK when DB is connected, 503 otherwise.
- Logs are emitted in JSON format to stdout.
- PII and secrets are redacted from logs using Pino's redaction feature.
- LogRocket SDK is initialized and captures 500-level errors.
- GET /status is secured by Basic Auth and displays uptime and latency metrics.
- Setting DISABLE_MONITORING=true disables the monitoring middleware.
## Risk tolerance

- low | medium | high
