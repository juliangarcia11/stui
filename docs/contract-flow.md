# Contract Fulfillment Guided Flow

A fixed-panel quickstart experience that walks a new SpaceTraders agent through their first contract: accept → buy a mining ship → navigate to an asteroid → extract resources → sell surplus → deliver goods → fulfill.

---

## Architecture Decisions

| Decision                 | Resolution                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Panel write actions      | Resource route `/api/contract-flow` (POST-only, no UI component)                                                                            |
| Panel data loading       | Resource route `/api/quickstart-context` (GET loader); panel uses `useFetcher().load()` on mount and after each mutation                    |
| Dismissed state          | Cookie (`__quickstart_dismissed`) via `createCookie` in `sessions.server.ts`; set via `DISMISS_QUICKSTART`, cleared via `REOPEN_QUICKSTART` |
| Panel layout             | `position: fixed` overlay — no changes to `AppContainer` or `AppPageLayout` structure                                                       |
| Cooldown timers          | `ClientOnly` wrapper component; SSR renders static "In transit…" label                                                                      |
| Ship selection           | UI presents a picker; eligible ships have any `MOUNT_MINING_LASER*` mount                                                                   |
| Asteroid waypoints       | Query both `ASTEROID` + `ENGINEERED_ASTEROID`; user selects from list                                                                       |
| Server reset             | Existing API integration already handles; quickstart reactivates after re-registration                                                      |
| API wrappers             | Follow `dockShip`/`acceptContract` pattern: `buildAuth`, `standardizeApiResponse`, cache invalidation on success                            |
| Step render ownership    | Each `ContractFlowStep` owns `renderContent` and `renderSummary` — no lookup maps in `QuickstartPanel`                                      |
| `steps.ts` → `steps.tsx` | Renamed to support JSX in step render functions                                                                                             |
| `StepState` location     | Defined in `types.ts`, re-exported from `components/StepRow.tsx` for backward compatibility                                                 |
| Shared sub-components    | Reusable helpers (e.g. `DataRow`) extracted to nearest `/components` directory, not duplicated across step files                            |

---

## Data Flow

```
AppPageLayout
└── QuickstartPanel
      │
      ├── contextFetcher.load("/api/quickstart-context")   ← GET, on mount + after actions
      │     └── api.quickstart-context.tsx (loader)
      │           ├── loadContractFlowContext(token)        ← assembles ContractFlowContext
      │           └── getQuickstartDismissed(cookie)
      │
      └── actionFetcher.submit → "/api/contract-flow"      ← POST, for all mutations
            └── api.contract-flow.tsx (action)
                  ├── DISMISS_QUICKSTART / REOPEN_QUICKSTART  ← handled inline (Set-Cookie header)
                  └── executeContractFlowAction(token, formData)
```

`QuickstartPanel` re-fetches context whenever `actionFetcher` transitions from non-idle → idle with data, using a `useRef` to track the previous state.

---

## Step Definitions (`steps.tsx`)

Each step is a `ContractFlowStep`:

```typescript
type ContractFlowStep = {
  key: string;
  label: string;
  isComplete: (ctx: ContractFlowContext) => boolean;
  renderSummary?: (ctx: ContractFlowContext) => string | undefined;
  renderContent: (props: StepRenderProps) => ReactNode; // props = { ctx, state }
};
```

`renderContent` is always called with `{ ctx: ContractFlowContext, state: StepState }`. The `state` is `"active"` when a step is the current one, `"complete"` when its predicate returns true, `"upcoming"` otherwise. `StepRow` only renders `renderContent` output when `state === "active"`.

### The 10 Steps

| #   | Key                    | Predicate                                                                 |
| --- | ---------------------- | ------------------------------------------------------------------------- |
| 1   | `agent-overview`       | `Boolean(ctx.agent.symbol)` — auto-completes                              |
| 2   | `starting-location`    | `ctx.waypoints.length > 0` — auto-completes                               |
| 3   | `accept-contract`      | `ctx.contract.accepted === true`                                          |
| 4   | `purchase-ship`        | `ctx.ship !== null` (ship with mining laser mount)                        |
| 5   | `navigate-to-asteroid` | ship not `IN_TRANSIT` and at `ASTEROID` or `ENGINEERED_ASTEROID` waypoint |
| 6   | `extract-resources`    | cargo holds enough of any contract deliver good                           |
| 7   | `sell-surplus`         | all cargo items are contract-required trade symbols                       |
| 8   | `navigate-to-delivery` | ship not `IN_TRANSIT` and at contract's `destinationSymbol`               |
| 9   | `deliver-goods`        | all deliver goods have `unitsFulfilled >= unitsRequired`                  |
| 10  | `fulfill-contract`     | `ctx.contract.fulfilled === true`                                         |

---

## File Map

### New files

| File                                                        | Purpose                                                                                   |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `app/components/ClientOnly.tsx`                             | SSR-safe client-only wrapper                                                              |
| `app/api/fleet/navigate-ship.ts`                            | Wraps `navigateShip`; invalidates `shipCache`                                             |
| `app/api/fleet/extract-resources.ts`                        | Wraps `extractResources`; invalidates `shipCache`                                         |
| `app/api/fleet/sell-cargo.ts`                               | Wraps `sellCargo`; invalidates `shipCache`, `agent`, `allAgents`                          |
| `app/api/fleet/purchase-ship.ts`                            | Wraps `purchaseShip`; invalidates `allShips`, `agent`, `allAgents`                        |
| `app/api/fleet/get-ships.ts`                                | Wraps `getMyShips`; uses `fetchWithCache`                                                 |
| `app/api/contracts/get-contracts.ts`                        | Wraps `getContracts`; uses `fetchWithCache`                                               |
| `app/api/contracts/deliver-contract.ts`                     | Wraps `deliverContract`; invalidates `allContracts`, `shipCache`                          |
| `app/api/systems/get-shipyard.ts`                           | Wraps `getShipyard`                                                                       |
| `app/features/contract-flow/types.ts`                       | `ContractFlowContext`, `ContractFlowStep`, `StepState`, `StepRenderProps`, `ContractFlow` |
| `app/features/contract-flow/steps.tsx`                      | All 10 step definitions with predicates + render functions                                |
| `app/features/contract-flow/loader.ts`                      | `loadContractFlowContext(token)` — assembles context from API                             |
| `app/features/contract-flow/action.ts`                      | `executeContractFlowAction(token, formData)` — action dispatcher                          |
| `app/features/contract-flow/QuickstartPanel.tsx`            | Main panel shell (fixed overlay)                                                          |
| `app/features/contract-flow/CompletionScreen.tsx`           | _(phase 8)_ Graduation screen                                                             |
| `app/features/contract-flow/components/DataRow.tsx`         | Shared `label / value` row used across step components                                    |
| `app/features/contract-flow/components/ProgressBar.tsx`     | `completed / total` progress bar                                                          |
| `app/features/contract-flow/components/StepRow.tsx`         | Single step row: icon + label/summary + expandable content                                |
| `app/features/contract-flow/components/CollapsedTab.tsx`    | Right-edge tab shown when panel is dismissed                                              |
| `app/features/contract-flow/components/CooldownTimer.tsx`   | _(phase 6)_ Client-only countdown timer                                                   |
| `app/features/contract-flow/steps/AgentOverviewStep.tsx`    | Step 1 content                                                                            |
| `app/features/contract-flow/steps/StartingLocationStep.tsx` | Step 2 content                                                                            |
| `app/features/contract-flow/steps/AcceptContractStep.tsx`   | Step 3 content                                                                            |
| `app/features/contract-flow/steps/PurchaseShipStep.tsx`     | _(phase 5)_ Step 4 content                                                                |
| `app/features/contract-flow/steps/NavigateMineStep.tsx`     | _(phase 6)_ Step 5 content                                                                |
| `app/features/contract-flow/steps/SellCargoStep.tsx`        | _(phase 7)_ Step 6–7 content                                                              |
| `app/features/contract-flow/steps/FulfillContractStep.tsx`  | _(phase 7)_ Step 8–10 content                                                             |
| `app/routes/api.quickstart-context.tsx`                     | GET loader — returns `{ context, dismissed, dismissedContractId }`                        |
| `app/routes/api.contract-flow.tsx`                          | POST action — delegates to `executeContractFlowAction`                                    |
| `app/routes/quickstart.tsx`                                 | Nav entry page under `AppPageLayout`                                                      |

### Modified files

| File                                                  | Change                                                                                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `app/sessions.server.ts`                              | Added `quickstartCookie`, `getQuickstartDismissed`, `setQuickstartDismissed`, `clearQuickstartDismissed`                      |
| `app/routes.ts`                                       | Added `api/quickstart-context`, `api/contract-flow`, `quickstart` routes                                                      |
| `app/config.ts`                                       | Added `{ label: "Quickstart", path: "/quickstart" }` to `Config.Pages`                                                        |
| `app/api/fleet/index.ts`                              | Exports `dockShip`, `extractResources`, `getShips`, `navigateShip`, `orbitShip`, `purchaseShip`, `sellCargo`                  |
| `app/api/contracts/index.ts`                          | Exports `acceptContract`, `deliverContract`, `fulfillContract`, `getContracts`, `negotiateContract` via `ContractsApi` object |
| `app/api/systems/index.ts`                            | Exports `getMarket`, `getShipyard`, `getSystemInfo`, `getWaypointsList`                                                       |
| `app/components/layout/AppPageLayout.tsx`             | Mounts `<QuickstartPanel />` after `<Outlet />`                                                                               |
| `app/features/contracts/ContractAcceptanceButton.tsx` | POSTs to `/api/contract-flow` with `action: "ACCEPT_CONTRACT"`                                                                |

---

## Implementation Progress

### Phase 0 — API Wrappers ✓

- [x] `navigate-ship.ts`, `extract-resources.ts`, `sell-cargo.ts`, `purchase-ship.ts`, `get-ships.ts`
- [x] `get-contracts.ts`, `deliver-contract.ts`
- [x] `get-shipyard.ts`
- [x] Fleet, contracts, and systems `index.ts` updated

### Phase 1 — Foundation ✓

- [x] `quickstartCookie` + helpers in `sessions.server.ts`
- [x] `types.ts`, `steps.tsx`, `loader.ts`, `action.ts`
- [x] Resource routes `api.quickstart-context.tsx` + `api.contract-flow.tsx`
- [x] `quickstart.tsx` page route, `routes.ts` wired, `config.ts` updated

### Phase 2 — Panel Shell ✓

- [x] `ClientOnly.tsx`, `ProgressBar.tsx`, `StepRow.tsx`, `CollapsedTab.tsx`
- [x] `QuickstartPanel.tsx` — fixed overlay, fetcher pattern, dismiss/reopen
- [x] Mounted in `AppPageLayout`

### Phase 3 — Steps 1 & 2 ✓

- [x] `AgentOverviewStep.tsx` — callsign, credits, faction, HQ
- [x] `StartingLocationStep.tsx` — system, waypoint, type, coords, ASCII hierarchy
- [x] `DataRow.tsx` extracted as shared component

### Phase 4 — Step 3: Accept Contract ✓

- [x] `ContractAcceptanceButton` posts to `/api/contract-flow`
- [x] `AcceptContractStep.tsx` — compact terms display + accept button
- [x] `ACCEPT_CONTRACT` implemented in `action.ts`

### Phase 5 — Step 4: Purchase Ship ✓

- [x] `PurchaseShipStep.tsx` — shipyard picker, cost display, `PURCHASE_SHIP` action
- [x] `PURCHASE_SHIP` in `action.ts`
- [x] Wire into `steps.tsx`

### Phase 6 — Step 5: Navigate & Mine ✓

- [x] `CooldownTimer.tsx` — client-only countdown with `ClientOnly` wrapper
- [x] `NavigateMineStep.tsx` — navigate / in-transit / extract sub-states, 5s polling
- [x] `NAVIGATE_SHIP`, `EXTRACT_RESOURCES` in `action.ts`
- [x] `get-ship-cooldown.ts` — API wrapper for `GET /my/ships/{shipSymbol}/cooldown`
- [x] `shipCooldown` added to `ContractFlowContext`; `onRequestRefresh` added to `StepRenderProps`

### Phase 7 — Steps 6–10: Sell, Deliver, Fulfill ✓

- [x] `SellCargoStep.tsx` — sell surplus + navigate-to-delivery sub-states, 5s polling in transit
- [x] `FulfillContractStep.tsx` — deliver goods + fulfill contract sub-states
- [x] `SELL_CARGO`, `DELIVER_CONTRACT`, `FULFILL_CONTRACT` in `action.ts`

### Phase 8 — Completion State

- [ ] `CompletionScreen.tsx` — credits earned, fleet size, nav links
- [ ] Auto-dismiss after 5s or manual close

### Phase 9 — Polish & Resilience

- [ ] Inline error + retry on every `ButtonFetcherForm`
- [ ] Out-of-order state verification
- [ ] Loading skeletons + button busy states
- [ ] Accessibility: `aria-current="step"`, keyboard focus
- [ ] Full typecheck pass
- [ ] Manual smoke test: fresh agent → contract fulfilled
- [ ] Let users view previous/completed quickstart steps' content
