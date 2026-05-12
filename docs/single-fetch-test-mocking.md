# Single-Fetch Test Mocking in Playwright

## The Problem

React Router v7 enables **single-fetch** by default. All `useFetcher.load()` calls — including those targeting resource routes (loader-only, no component) — go through the single-fetch pipeline:

1. The browser requests `{route-path}.data?_routes={routeId}` instead of `{route-path}`.
2. The response must be encoded as **turbo-stream** (`Content-Type: text/x-script`), not plain JSON.
3. The client decodes via `fetchAndDecodeViaTurboStream` and expects the body to be a turbo-stream-encoded envelope in the shape `{ [routeId]: { data: <loaderReturn> } }`.

A `page.route()` handler that returns plain JSON will produce the error:

```
Error: Unable to decode turbo-stream response
  at fetchAndDecodeViaTurboStream
  at singleFetchLoaderFetcherStrategy
```

This was verified in `tests/mocked/contract-flow.spec.ts` when mocking `/api/quickstart-context`. The React Router maintainers confirmed there are no official testing utilities for this (as of 2025-05); they pointed to the `turbo-stream` npm package as the workaround. See [Discussion #14282](https://github.com/remix-run/react-router/discussions/14282).

---

## The Fix

`tests/helpers/mock-single-fetch.ts` exports `mockLoaderData`, a thin wrapper around `page.route()` that:

1. Builds the correct envelope: `{ [routeId]: { data } }`.
2. Encodes it with `turbo-stream`'s `encode()`.
3. Fulfills the request with `Content-Type: text/x-script` and `X-Remix-Response: yes`.

Usage:

```ts
import { mockLoaderData } from "../helpers/mock-single-fetch";

await mockLoaderData(
  page,
  "/api/quickstart-context",          // route URL path (no .data suffix)
  "routes/api.quickstart-context",    // React Router route ID
  { context: preAcceptCtx, dismissed: false, dismissedContractId: null },
);
```

The route ID comes from the file path under `app/routes/` — `routes/api.quickstart-context.tsx` → `"routes/api.quickstart-context"`. Verify with `react-router routes` or by inspecting the `_routes` query param on a real network request.

`turbo-stream` is installed as a dev dependency pinned to `2.4.1` — the same version React Router v7 bundles internally.

---

## What to Watch For

### 1. turbo-stream version drift
`turbo-stream` is **inlined** into React Router's build — it is not a peer dependency or listed in its `package.json`. If React Router upgrades its internal copy to a version with a different wire format, our separately-installed `turbo-stream@2.4.1` will produce a body the client can't decode.

**Action:** When upgrading `react-router`, check the changelog for turbo-stream version bumps and update `turbo-stream` in `package.json` to match.

### 2. The envelope shape
The shape `{ [routeId]: { data: value } }` is an internal React Router implementation detail (see `singleFetchLoaders` in `node_modules/react-router/dist/development/index.js`). Error responses use `{ [routeId]: { error: value } }`. If this shape changes across major versions, `mockLoaderData` will silently produce wrong results — the fetcher's `.data` will be `undefined`.

**Action:** After a React Router major upgrade, run the mocked tests and inspect `contextFetcher.data` in the browser devtools if they fail unexpectedly.

### 3. Headers
The response must include `Content-Type: text/x-script` and `X-Remix-Response: yes`. Omitting either causes the client to skip turbo-stream decoding and fall back to plain-text error handling.

### 4. URL pattern
The `.data` suffix is appended by `singleFetchUrl()` in the React Router client bundle. If React Router ever changes the suffix or adds a basepath, the URL predicate in `mockLoaderData` (`url.pathname === \`${routePath}.data\``) will stop matching.

### 5. Limitation: complex types
`turbo-stream` supports rich types (Date, Error, Promise, Map, etc.) that plain JSON cannot represent. `mockLoaderData` works fine for plain JSON-serializable fixture data. If a loader returns Dates or class instances, the fixture must match — passing a plain `{}` where a `Date` is expected will produce a type mismatch at runtime.

---

## Considered Alternatives

| Approach | Why not chosen |
|---|---|
| MSW node-layer mocking | Each test needs a different assembled context; switching MSW handler state per test requires a test-only server endpoint or per-test server restart — more infrastructure than warranted |
| Change `useFetcher.load` to plain `fetch()` | Loses React Router's loading-state machine and cache invalidation; treats a framework limitation as a reason to change correct production code |
| Official React Router test utilities | Don't exist yet for this case (as of RR v7.12) |
