# Research notes

## Tools used (optional)

- MCP servers: (none)
- WebSearch/WebFetch: no

## Questions

- What do we need to know that isn’t in the repo?
  - What LogRocket backend SDK/API is expected for server-side 500 error capture?
  - What should “DB connected” mean for `/health` given the app currently has no DB?

## Findings (with sources)

- Finding: The API is a minimal Express 5 server (`src/server.js`) with an in-memory incident store (`src/store.js`); no DB dependency exists today.
  - Source: `src/server.js`, `src/store.js`
- Finding: The repo already has automated tests using Node’s test runner and `supertest`.
  - Source: `package.json`, `tests/`

## Recommendations

- Implement observability as small, testable modules (logger + middleware + metrics) and keep integrations env-driven to avoid secrets in repo.

## Assumptions and unknowns

- Unknowns are tracked as decisions/gaps:
  - `/health` dependency definition: `docs/ias/decisions/20260401-0002-define-health-db-check.md`
  - LogRocket backend integration: `docs/ias/decisions/20260401-0003-logrocket-backend-integration.md`
