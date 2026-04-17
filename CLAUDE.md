# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with HMR (http://localhost:5173)
pnpm build        # Production build
pnpm start        # Run production server
pnpm typecheck    # Generate React Router types + run tsc
pnpm client:gen   # Regenerate API client from SpaceTraders OpenAPI spec
```

No test or lint scripts are currently configured.

## Architecture Overview

**STUI** is a React Router v7 (SSR enabled) app for interacting with the [SpaceTraders API v2](https://spacetraders.io). Stack: React Router 7, Vite, TypeScript (strict), Tailwind CSS 4, Radix UI (themes + primitives), TanStack React Query 5, openapi-fetch.

### Routing

Routes are declared in [app/routes.ts](app/routes.ts) using React Router v7's config-based API. Two layouts exist: `AppPageLayout` (authenticated app shell with header/nav) and `AuthLayout` (login/register). Route components live in [app/routes/](app/routes/) and use React Router's `loader()` / `action()` for server-side data.

### API Layer (`app/api/`)

The OpenAPI client is auto-generated into [app/api/client/](app/api/client/) via `pnpm client:gen` from the live SpaceTraders spec. Do not hand-edit generated files.

Hand-written modules wrap the generated client by feature domain: `AgentApi`, `ContractsApi`, `FleetApi`, `GlobalApi`, `SystemsApi`. All return a standardized `ApiResponse<T>` (`{ status: 'success'|'error', data?, message? }`). Use `standardizeApiResponse()` / `standardizeListApiResponse()` from [app/api/utils.ts](app/api/utils.ts) when adding new endpoints.

### Caching Strategy

Two layers:
1. **Fetch-level LRU cache** — [app/api/cache/fetch-w-cache.ts](app/api/cache/fetch-w-cache.ts) wraps GET requests with an LRU cache. Import `fetchWithCache` instead of raw `fetch` for cacheable API calls.
2. **React Query** — used for client-side synchronization and invalidation. Cache invalidation helpers live in [app/api/cache/invalidator.ts](app/api/cache/invalidator.ts).

### Auth & Sessions

Server-side cookie sessions via React Router's `createCookieSessionStorage` ([app/sessions.server.ts](app/sessions.server.ts)). Session stores `token` and `agentSymbol`. Auth is validated by calling the SpaceTraders API with the token. Helpers: `getSession`, `commitSession`, `destroySession`.

### Components vs Features

- [app/components/](app/components/) — generic, reusable UI (form fields, layout primitives, Paginator, ErrorBoundary, etc.)
- [app/features/](app/features/) — feature-scoped components tied to a domain (auth, dashboard, contracts, market, ships, factions, agent)

### Styling

Tailwind CSS 4 (via `@tailwindcss/vite` plugin) is the primary approach. Radix UI `<Theme>` wraps the app for design tokens and component primitives. Global styles are in [app/app.css](app/app.css).

### Path Aliases

`~/` maps to `./app/` (configured in tsconfig and Vite via `vite-tsconfig-paths`).

### Environment Variables

- `VITE_SPACETRADERS_ACCOUNT_TOKEN` — dev JWT token
- `VITE_ENABLE_MOCKS` — set to `"true"` to enable MSW mocking

## Model Usage

- Use **Haiku** for file reading tasks
- Use **Opus** for thinking/planning tasks
