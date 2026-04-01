# Work allocation (parallel coordination)

Use this when running multiple agents in parallel.

## Global constraints

- Branch strategy: single branch
- Filesystem ownership rule: no overlapping edits
- Verification cadence: after each chunk

## Workstreams

### WS1 — Observability foundations (M1)

- owner (agent): worker
- subgoal: Add Pino logging + redaction, monitoring kill switch, `/health`, and metrics scaffold with tests.
- files/dirs owned: `src/`, `tests/`, `docs/ias/runs/20260401-api-observability-monitoring-implementation/`
- dependencies: none (decisions inform edge cases; proceed with placeholders)
- deliverables: PR-sized change implementing M1 acceptance checks.

### WS2 — Status dashboard + LogRocket (M2)

- owner (agent): worker
- subgoal: Add secured `/status` dashboard and LogRocket 500 error capture with tests; capture UI snapshots.
- files/dirs owned: `src/`, `tests/`, `docs/ias/runs/20260401-api-observability-monitoring-implementation/`
- dependencies: Decision `docs/ias/decisions/20260401-0003-logrocket-backend-integration.md`
- deliverables: PR-sized change implementing M2 acceptance checks + screenshots job.
