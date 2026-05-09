import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import {
  atAsteroidCtx,
  completedCtx,
  fulfillCtx,
  preAcceptCtx,
  purchaseShipCtx,
  TRADE_SYMBOL,
  UNITS_REQUIRED,
} from "../../app/mocks/fixtures/contract-flow";

// Intercept /api/quickstart-context so the panel renders deterministic fixture state
// without making real SpaceTraders API calls for context assembly.
async function mockCtx(page: Page, ctx: unknown) {
  await page.route(/api\/quickstart-context/, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ context: ctx, dismissed: false, dismissedContractId: null }),
    }),
  );
}

async function openPanel(page: Page) {
  await page.goto("/");
  await page.getByRole("region", { name: "Quickstart Progress" }).waitFor();
}

// ─── Step 3 — Accept Contract ────────────────────────────────────────────────

test.describe("step 3 — Accept Contract", () => {
  test.beforeEach(async ({ page }) => {
    await mockCtx(page, preAcceptCtx);
    await openPanel(page);
  });

  test("active step is Accept Contract", async ({ page }) => {
    const panel = page.getByRole("region", { name: "Quickstart Progress" });
    await expect(panel.locator('[aria-current="step"]')).toContainText("Accept Contract");
  });

  test("shows contract faction and trade symbol", async ({ page }) => {
    const panel = page.getByRole("region", { name: "Quickstart Progress" });
    await expect(panel.getByText("COSMIC")).toBeVisible();
    await expect(panel.getByText(TRADE_SYMBOL)).toBeVisible();
  });

  test("shows units required", async ({ page }) => {
    const panel = page.getByRole("region", { name: "Quickstart Progress" });
    await expect(panel.getByText(String(UNITS_REQUIRED))).toBeVisible();
  });

  test("Accept Contract button is present", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Accept Contract" })).toBeVisible();
  });
});

// ─── Step 4 — Purchase Ship ──────────────────────────────────────────────────

test.describe("step 4 — Purchase Ship", () => {
  test.beforeEach(async ({ page }) => {
    await mockCtx(page, purchaseShipCtx);
    await openPanel(page);
  });

  test("active step is Purchase Ship", async ({ page }) => {
    const panel = page.getByRole("region", { name: "Quickstart Progress" });
    await expect(panel.locator('[aria-current="step"]')).toContainText("Purchase Ship");
  });

  test("shows available ship option name and price", async ({ page }) => {
    const panel = page.getByRole("region", { name: "Quickstart Progress" });
    await expect(panel.getByText("Mining Drone")).toBeVisible();
    await expect(panel.getByText(/20,000/)).toBeVisible();
  });

  test("Purchase button is present", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Purchase" })).toBeVisible();
  });
});

// ─── Step 6 — Extract Resources ─────────────────────────────────────────────

test.describe("step 6 — Extract Resources", () => {
  test.beforeEach(async ({ page }) => {
    await mockCtx(page, atAsteroidCtx);
    await openPanel(page);
  });

  test("active step is Extract Resources", async ({ page }) => {
    const panel = page.getByRole("region", { name: "Quickstart Progress" });
    await expect(panel.locator('[aria-current="step"]')).toContainText("Extract Resources");
  });

  test("Extract Resources button is present", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Extract Resources" })).toBeVisible();
  });
});

// ─── Step 10 — Fulfill Contract ──────────────────────────────────────────────

test.describe("step 10 — Fulfill Contract", () => {
  test.beforeEach(async ({ page }) => {
    await mockCtx(page, fulfillCtx);
    await openPanel(page);
  });

  test("active step is Fulfill Contract", async ({ page }) => {
    const panel = page.getByRole("region", { name: "Quickstart Progress" });
    await expect(panel.locator('[aria-current="step"]')).toContainText("Fulfill Contract");
  });

  test("shows all goods delivered message", async ({ page }) => {
    await expect(page.getByText("All goods delivered.")).toBeVisible();
  });

  test("Fulfill Contract button is present", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Fulfill Contract" })).toBeVisible();
  });
});

// ─── Completion Screen ───────────────────────────────────────────────────────

test.describe("completion screen", () => {
  test.beforeEach(async ({ page }) => {
    await mockCtx(page, completedCtx);
    await openPanel(page);
  });

  test("shows contract complete heading", async ({ page }) => {
    await expect(page.getByText("Contract complete!")).toBeVisible();
  });

  test("shows earned credits from fixture", async ({ page }) => {
    await expect(page.getByText(/40,000/)).toBeVisible();
  });

  test("shows fleet size", async ({ page }) => {
    await expect(page.getByText("Fleet size")).toBeVisible();
  });

  test("shows dismissal countdown button", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Dismiss/ })).toBeVisible();
  });
});
