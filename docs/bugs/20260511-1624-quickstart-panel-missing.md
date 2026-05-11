# Bug: Quickstart Progress panel not found in e2e tests

**Discovered:** 2026-05-11  
**Tests affected:** `tests/contract-flow/panel.spec.ts`, `tests/mocked/contract-flow.spec.ts`

## Symptom

All contract-flow tests fail because `getByRole('region', { name: 'Quickstart Progress' })` is never found.

Two failure modes:
- **chromium (real server):** Panel not visible. Coincides with a server reset that re-registered the test agent (`JELLTEST260511`).
- **mocked:** Panel times out (30s) even with mock context injected via `page.route`.

## Likely causes

1. The `QuickstartPanel` component's ARIA region or label has drifted from `aria-label="Quickstart Progress"`.
2. The panel does not render at all for a freshly registered agent (no contract accepted yet).

## Where to look

- `app/features/` — find the `QuickstartPanel` component, check its ARIA region and label.
- `tests/contract-flow/panel.spec.ts:6` — the first failing assertion.
- `tests/mocked/contract-flow.spec.ts:27` — `openPanel` helper that all mocked tests depend on.
