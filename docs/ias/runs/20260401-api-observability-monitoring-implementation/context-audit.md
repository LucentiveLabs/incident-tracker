# Context audit (brownfield)

Goal: inventory and assess existing context in the repo, then decide what to adopt vs improve.

## Discovered context sources

List any of the following if present:

- README(s):
- architecture docs / ADRs:
- runbooks / ops docs:
- CI/CD docs:
- existing agent instructions (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, etc.):
- existing “project context” docs (PRDs, specs, docs/ folders):

- README(s): `README.md`
- architecture docs / ADRs: none found
- runbooks / ops docs: none found
- CI/CD docs: none found
- existing agent instructions: `AGENTS.md`, `CLAUDE.md`
- existing “project context” docs: `docs/ias/` (IAS scaffolding), run requirements in `docs/ias/runs/20260401-api-observability-monitoring-implementation/requirements.md`

## Quality assessment

For each key doc/instruction surface:

- status: current | partially stale | stale | unknown
- contradictions / risks:
- decision: adopt | patch | deprecate | archive

- `README.md`
  - status: current (minimal)
  - contradictions / risks: none
  - decision: adopt
- `docs/ias/project-context.md` + `docs/ias/context/*`
  - status: partially stale (contained template TODOs)
  - contradictions / risks: default greenfield tech preferences did not match repo (Express/JS)
  - decision: patch (done)
- `docs/ias/runs/20260401-api-observability-monitoring-implementation/*`
  - status: partially stale (template TODOs)
  - contradictions / risks: none
  - decision: patch (done)

## Proposed clean-up plan (minimal)

- patch now:
- patch now: fill canonical context + run artifacts; record decisions/gaps for missing inputs.
- defer (log gaps/decisions): confirm `/health` dependency definition and LogRocket backend integration details.
