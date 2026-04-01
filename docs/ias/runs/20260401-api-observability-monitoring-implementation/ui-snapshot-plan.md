# UI snapshot plan

Use this when the work is user-facing and screenshots are required.

## Target

- type: web | ios | android | other
- entrypoint:
  - `http://localhost:3000/status` (internal status dashboard, Basic Auth)

## Viewports / devices

- Desktop (web): 1440x900
- Mobile (web): 390x844
- iOS simulator device (if applicable): TODO
- Android emulator device (if applicable): TODO

## Screens to capture (ordered)

1) `/status` (healthy) — desktop + mobile

For each screen define:

- state (logged out / logged in / seeded user)
- required data setup
- success + error/empty variant (if relevant)

For this run:

- state: Basic Auth credentials set via env vars (`STATUS_USER`, `STATUS_PASS`)
- required data setup: none (metrics are in-memory; generate a few requests to populate)
- variants:
  - success: shows uptime + latency metrics
  - error: (optional) show “monitoring disabled” state when `DISABLE_MONITORING=true`

## How to capture (commands)

Document the exact terminal commands for this repo (agents can execute them).

Examples (repo-agnostic, no Playwright dependency required):

- Web (Playwright via `npx`):
  - `npx -y playwright@latest install chromium`
  - `npx -y playwright@latest screenshot http://localhost:3000/login docs/ias/runs/YYYYMMDD-<run>/screenshots/login-mobile.png --viewport-size=390,844 --full-page`
  - `npx -y playwright@latest screenshot http://localhost:3000/login docs/ias/runs/YYYYMMDD-<run>/screenshots/login-desktop.png --viewport-size=1440,900 --full-page`

If the flow requires auth, prefer making auth reproducible (seeded user + scripted login) rather than relying on a manual browser session.

Repo-specific (non-secret placeholders):

1) Start the server:
   - `STATUS_USER=snapshot STATUS_PASS=snapshot npm run dev`
2) Generate a bit of traffic (optional, for metrics):
   - `curl -s http://localhost:3000/api/incidents >/dev/null`
3) Capture screenshots (Playwright via `npx`):
   - `npx -y playwright@latest install chromium`
   - `npx -y playwright@latest screenshot http://snapshot:snapshot@localhost:3000/status docs/ias/runs/20260401-api-observability-monitoring-implementation/screenshots/status-desktop.png --viewport-size=1440,900 --full-page`
   - `npx -y playwright@latest screenshot http://snapshot:snapshot@localhost:3000/status docs/ias/runs/20260401-api-observability-monitoring-implementation/screenshots/status-mobile.png --viewport-size=390,844 --full-page`

## Notes

- Do not use real credentials in screenshot commands; use local placeholders.

## Commit policy (optional)

Default: keep screenshots local (the run scaffolding creates a `.gitignore` inside `screenshots/`).

If humans need to review without running the app, force-add selected screenshots:

- `git add -f docs/ias/runs/YYYYMMDD-<run>/screenshots/*.png`
