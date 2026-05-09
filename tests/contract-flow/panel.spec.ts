import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  // Wait for the panel to finish its initial context fetch (loading → steps visible)
  await expect(page.getByRole("region", { name: "Quickstart Progress" })).toBeVisible();
});

test("quickstart panel is visible on dashboard", async ({ page }) => {
  await expect(page.getByRole("region", { name: "Quickstart Progress" })).toBeVisible();
});

test("panel renders all 10 step rows", async ({ page }) => {
  const panel = page.getByRole("region", { name: "Quickstart Progress" });
  const steps = panel.getByRole("listitem");
  await expect(steps).toHaveCount(10);
});

test("upcoming steps show their labels", async ({ page }) => {
  const panel = page.getByRole("region", { name: "Quickstart Progress" });
  // Steps 4-10 are always upcoming for a fresh agent — labels are shown (not summary)
  await expect(panel.getByText("Purchase Ship")).toBeVisible();
  await expect(panel.getByText("Navigate to Asteroid")).toBeVisible();
  await expect(panel.getByText("Extract Resources")).toBeVisible();
  await expect(panel.getByText("Sell Surplus Cargo")).toBeVisible();
  await expect(panel.getByText("Navigate to Delivery")).toBeVisible();
  await expect(panel.getByText("Deliver Goods")).toBeVisible();
  await expect(panel.getByText("Fulfill Contract")).toBeVisible();
});

test("exactly one step is marked active", async ({ page }) => {
  const panel = page.getByRole("region", { name: "Quickstart Progress" });
  const activeSteps = panel.locator('[aria-current="step"]');
  await expect(activeSteps).toHaveCount(1);
});

test("active step for a fresh agent is Accept Contract", async ({ page }) => {
  const panel = page.getByRole("region", { name: "Quickstart Progress" });
  await expect(panel.locator('[aria-current="step"]')).toContainText("Accept Contract");
});

test("dismiss collapses panel to side tab", async ({ page }) => {
  await page.getByRole("button", { name: "Dismiss quickstart" }).click();
  await expect(page.getByRole("region", { name: "Quickstart Progress" })).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Open quickstart panel" })).toBeVisible();
});

test("collapsed tab reopens the panel", async ({ page }) => {
  await page.getByRole("button", { name: "Dismiss quickstart" }).click();
  await expect(page.getByRole("button", { name: "Open quickstart panel" })).toBeVisible();
  await page.getByRole("button", { name: "Open quickstart panel" }).click();
  await expect(page.getByRole("region", { name: "Quickstart Progress" })).toBeVisible();
});
