# Acceptance criteria

## Outcome

Operators and developers can quickly assess API health and debug incidents via structured logs, health endpoints, error tracking, and a secured internal status dashboard, without leaking PII/secrets.

## Non-negotiables (hard constraints)

- Markdown-only documentation under `docs/` (keep docs current with behavior changes).
- No real secrets in git (use placeholders/mocks and document required env vars).
- Must use Pino for logging as per architectural preference.
- Must use LogRocket for error tracking.
- Dashboard must be internal and secured.
- No external database should be required for metrics storage in this phase.

## Success criteria (checklist)
- [ ] GET /health returns 200 OK when DB is connected, 503 otherwise.
- [ ] Logs are emitted in JSON format to stdout.
- [ ] PII and secrets are redacted from logs using Pino's redaction feature.
- [ ] LogRocket SDK is initialized and captures 500-level errors.
- [ ] GET /status is secured by Basic Auth and displays uptime and latency metrics.
- [ ] Setting DISABLE_MONITORING=true disables the monitoring middleware.

## Proxy metrics (optional)

- Uptime seconds (since process start)
- Total requests, 5xx count (since process start)
- Latency (ms): rolling p50/p95 or min/avg/max (in-memory)
