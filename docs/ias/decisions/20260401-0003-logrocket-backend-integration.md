# Decision: Choose LogRocket integration approach for backend 500 errors

- status: pending
- merge_blocker: false
- date: 2026-04-01
- owner: human

## Context

Acceptance criteria require that the LogRocket SDK is initialized and captures 500-level errors. LogRocket is commonly used in frontend apps; this repo is a Node/Express backend. We need to choose a concrete, supportable approach for server-side error capture that matches LogRocket’s capabilities and the project’s operational constraints.

## Options considered

- Option A: Use an official LogRocket Node/backend SDK (if supported) and call it from Express error middleware.
- Option B: Capture errors in logs only (Pino) and treat LogRocket as frontend-only (would require revising acceptance criteria).
- Option C: Implement a thin adapter in the backend that forwards errors to a LogRocket ingestion endpoint (if available), gated by env vars.

## Recommendation (current best guess)

Start with Option A if LogRocket supports a backend SDK for Node/Express. If not, decide whether to revise the acceptance criteria (Option B) or implement an ingestion adapter (Option C).

## Implementation notes

- Integrations must be env-driven (no secrets in repo).
- Tests should verify “integration hook invoked on 500 errors” via mocks/stubs rather than requiring real LogRocket credentials.

## Acceptance criteria

- A documented env var contract exists for enabling/disabling LogRocket integration.
- 500-level responses trigger the LogRocket capture path (tested with mocks).
