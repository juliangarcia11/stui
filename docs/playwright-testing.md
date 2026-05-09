# Playwright E2E Testing

End-to-end tests for STUI using Playwright. Tests run against the live SpaceTraders API using a dedicated test agent whose credentials are managed automatically.

---

## Strategy

**Real API for smoke tests, MSW for deterministic flows.**

- Smoke tests (auth, navigation, page loads) hit the real SpaceTraders API. They're slow but catch real integration bugs.
- Tests that need deterministic API state (e.g., contract flow steps) use MSW (`VITE_ENABLE_MOCKS=true`). MSW is already installed; mock handlers can be added incrementally.
- The dev server is started by Playwright's `webServer` config — no manual `pnpm dev` required.

---

## Test Agent

Tests use a dedicated SpaceTraders agent rather than the developer's personal account. The agent is registered automatically and its credentials are cached locally.

**Symbol format:** `JELLTEST` + `YYMMDD` (e.g. `JELLTEST260509`) — closest valid approximation of `jellhee_test_DATETIME` within the SpaceTraders 14-char alphanumeric constraint.

**Registration is automatic.** `playwright/agent-store.ts` handles the lifecycle:

1. On each test run, fetch the current `resetDate` from `GET /v2/`.
2. Compare against the `resetDate` stored in `playwright/.auth/agent.json`.
3. If they match, reuse the stored token.
4. If they differ (server reset) or no file exists, register a new agent with a fresh datetime symbol, write new credentials to `agent.json`, then proceed.

The account token from `VITE_SPACETRADERS_ACCOUNT_TOKEN` (`.env`) is used only for registration. The agent token returned by `POST /register` is what tests authenticate with.

---

## Auth Handling

The app uses server-side cookie sessions. `playwright/global.setup.ts` calls `agent-store.ts` to get a valid agent token, then drives a real browser login and saves the resulting session cookie to `playwright/.auth/session.json`. All tests in the `chromium` project load that storage state, so the login UI is only exercised once per suite invocation.

---

## Directory Structure

```
playwright/
  .auth/             # gitignored — session.json, agent.json
  agent-store.ts     # register / cache test agent credentials
  global.setup.ts    # one-time browser login, saves session.json
tests/
  smoke/
    auth.spec.ts        # login, bad credentials, redirect-to-login
    dashboard.spec.ts   # dashboard loads, agent card visible
  waypoints/
    market.spec.ts      # market page renders data (todo)
  contract-flow/
    steps.spec.ts       # MSW-backed step-by-step flow (todo)
playwright.config.ts
```

---

## Coverage Plan

| Phase | Tests | Status |
|-------|-------|--------|
| 1 — Setup | Config, agent-store, global-setup, scripts | done |
| 2 — Auth smoke | Login happy path, bad credentials, redirect-to-login | done |
| 3 — App smoke | Dashboard loads, nav links | done |
| 4 — Waypoints | Market page renders table rows | todo |
| 5 — Contract flow | MSW-backed step-by-step contract fulfillment | todo |

---

## Commands

```bash
pnpm test:e2e             # run all tests (headless)
pnpm test:e2e --ui        # Playwright UI mode
pnpm test:e2e --headed    # headed browser
pnpm test:e2e smoke/auth  # run a specific file
```
