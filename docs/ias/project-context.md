# Project context (canonical)

Update this file at the start of any substantial run. It is the shared “world model” for agents and reviewers.

## Status

- production: false (assumed; see decision `docs/ias/decisions/20260401-0001-confirm-goal-stakeholders-production.md`)
- deployed_version_ref: n/a
- engagement_type: brownfield
- execution_mode: local-runtime-first (record any temporary framework-specific command path in notes)

## Research tools (optional)

- web_search: true
- mcp_pack: none
- mcp_budget_calls_per_task: 3
- preferred_mcp_servers:
  - (optional) perplexity
  - (optional) context7
- cli_skills:
  - (optional) firecrawl — CLI skill, not MCP; requires `FIRECRAWL_API_KEY`

## Goal

- base_goal_ref: `docs/ias/context/base-goal.md`
- success_criteria:
  - Meet `docs/ias/runs/20260401-api-observability-monitoring-implementation/acceptance-criteria.md`.

## Stakeholders

- primary_stakeholder: Engineering (TBD; see decision `docs/ias/decisions/20260401-0001-confirm-goal-stakeholders-production.md`)
- users: Backend developers and operators (DevOps/SRE)
- other_stakeholders:
  - Security/compliance (PII/secret handling in logs)

## Non-negotiable constraints (hard constraints)

- Markdown-only documentation under `docs/` (keep docs current with behavior changes).
- No real secrets in git (use placeholders/mocks and document required env vars).
- Must use Pino for logging (structured JSON + redaction).
- Must use LogRocket for error tracking.
- `/status` dashboard must be internal and secured.

## Constraints (soft / preferences)

- tech_preferences:
  - Node.js (>=20) + Express (v5) + ESM
  - Minimal dependencies; prefer small middleware and simple primitives
- testing_preferences:
  - unit_tests_for_core_logic: true (Node `node:test` + `supertest`)
  - frontend_e2e: false
- docs_conventions:
  - markdown_only: true
  - keep_docs_current: true
- ux_preferences:
  - design_gate: optional
  - design_human_review: optional
  - ui_snapshots_commit: false

## Risks / sensitivities

- sensitive_data: none
- security_baseline: "no known critical vulnerabilities; do not commit secrets"
- operational_risk_tolerance: medium
