# Requirements

## Goal

API Observability Suite

# Proposal: API Observability & Monitoring Suite

This proposal outlines the implementation of a comprehensive monitoring and observability layer for the `incident-tracker` Express API. It integrates structured logging, error tracking, and health monitoring to ensure production reliability and rapid incident response.

## Phased Implementation Plan

### Phase 1: Foundation (Logging & Health)
- **Structured Logging**: Integrate `pino` and `pino-http` for high-performance JSON logging. 
- **Redaction**: Configure comprehensive redaction for sensitive fields including `password`, `authorization`, `cookie`, `email`, `phone`, and `address` to ensure PII compliance.
- **Health Endpoint**: Implement `GET /health` as a 'Deep' check. This endpoint will verify the Node.js process and perform a data…

## Hard constraints

- Must use Pino for logging as per architectural preference.
- Must use LogRocket for error tracking.
- Dashboard must be internal and secured.
- No external database should be required for metrics storage in this phase.

## Acceptance criteria

- [ ] GET /health returns 200 OK when DB is connected, 503 otherwise.
- [ ] Logs are emitted in JSON format to stdout.
- [ ] PII and secrets are redacted from logs using Pino's redaction feature.
- [ ] LogRocket SDK is initialized and captures 500-level errors.
- [ ] GET /status is secured by Basic Auth and displays uptime and latency metrics.
- [ ] Setting DISABLE_MONITORING=true disables the monitoring middleware.

## Notes

# Proposal summary

- intent_type: infra_ops
- autonomy_profile: balanced

## Title

API Observability Suite

## One-liner

Add health checks, JSON logging, LogRocket tracking, and a secured status dashboard.

## Objective

- primary_user: Backend Developers and DevOps Engineers
- jtbd: Monitor API health and debug production issues quickly.
- north_star: 100% visibility into API errors and health status.
- guardrails:
  - Logging overhead must not increase latency by more than 5ms.
  - No PII or secrets leaked in logs.

Value hypothesis:
Implementing structured logging and error tracking will reduce the Mean Time to Resolution (MTTR) for production incidents.

## Scope

In scope:
- Deep health check endpoint (/health)
- Pino structured JSON logging with PII redaction
- LogRocket error tracking integration
- Secured status dashboard (/status) with Basic Auth
- In-memory performance metrics (latency/uptime)
- Emergency kill-switch environment variable

Out of scope:
- External log aggregation setup (e.g., ELK/Splunk configuration)
- Infrastructure-level monitoring (CPU/RAM alerts)
- Persistent historical metrics database

Later:
- OpenTelemetry integration — For distributed tracing if the architecture moves to microservices.
- Persistent Metrics Store — To track uptime trends across server restarts.

## Key risks

- security: Risk Assessment & Mitigation | Risk | Mitigation | Owner | | :--- | :--- | :--- | | **PII/Secret Leakage** | Implementation of `pino` redaction for all known sensitive fields (passwords, PII). LogRocket SDK will be configured to ignore input fields by default. | Security Lead | | **Performance Overhead** | Use of `pino` for non-blocking asynchronous logging and a manual `DISABLE_MONITORING` kill-switch to bypass middleware if latency spikes. | DevOps Engineer | | **Information Disclosure** | The `/status` endpoint is restricted via `express-basic-auth` using strong, environment-injected creden (mitigation: Apply the reviewed mitigation plan.)

## Validation plan (top items)

- LogRocket SDK is compatible with the current Express version. (method: Dry-run installation and unit test verification.) (pass: App starts and handles a test request with LogRocket initialized.)

## Rollout

- flags: DISABLE_MONITORING
- phases: Development: Implement endpoints and middleware in local env → Staging: Verify LogRocket data flow, PII redaction, and Basi → Production: Deploy with environment variables configured.
- fallback: Set DISABLE_MONITORING=true to bypass all new middleware logic.
- kill_switch: DISABLE_MONITORING=true

## Evidence confidence

- confidence: high
- provenance:
  - User explicit tool choices (Pino, LogRocket)
  - Standard Express.js observability patterns
  - Prior answers confirming Basic Auth and Deep Health Checks
- assumptions:
  - Comprehensive PII redaction is the safest default.
  - In-memory metrics are sufficient for the initial dashboard version.
  - Basic Auth provides adequate security for an internal status route.
- open_questions:
  - Specific credentials for Basic Auth (to be provided via ENV).
  - Exact list of PII fields for redaction beyond standard defaults.

## Typed pack (truncated JSON)

```json
{"product_spec_pack":{"assumptions":[],"baseline":{"alternatives":[],"how_done_today":""},"data":{"entities":[],"events":[],"retention":""},"decisions":[],"experience":{"pillars":[],"trust_contract":{"confidence_signals":[],"guarantees":["Risk Assessment & Mitigation"],"non_guarantees":[]}},"flows":[],"identity":{"one_liner":"Add health checks, JSON logging, LogRocket tracking, and a secured status dashboard.","stakeholders":[],"title":"API Observability Suite"},"integrations":{"apis":[],"dependencies":[]},"objective":{"jtbd":"Monitor API health and debug production issues quickly.","primary_user":"Backend Developers and DevOps Engineers","problem":"","success_metrics":{"guardrails":["Logging overhead must not increase latency by more than 5ms.","No PII or secrets leaked in logs."],"north_star":"100% visibility into API errors and health status."},"value_hypothesis":"Implementing structured logging and error tracking will reduce the Mean Time to Resolution (MTTR) for production incidents."},"open_questions":[],"requirements":{"execution_functional":[],"non_functional":[{"id":"NFR-GATEC-1","statement":"Satisfy the reviewed non-functional guardrails.","target":"Meet the reviewed non-functional target.","verification":["Manual smoke test confirms the reviewed non-functional guardrails are covered."]}],"product_functional":[{"acceptance":["The implementation matches the reviewed functional guardrails."],"id":"PFR-GATEC-1","statement":"**Structured JSON Logging**","success_signal"…
```

---

The current API lacks visibility into its operational state. Implementing structured logging and error tracking will reduce the Mean Time to Resolution (MTTR) for production incidents, while health checks ensure that load balancers only route traffic to healthy instances.
