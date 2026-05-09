import { expect, test } from "@playwright/test";

test("market page loads via Market POI button", async ({ page }) => {
  await page.goto("/waypoints");
  await page.getByRole("heading", { name: /Waypoints at:/i }).waitFor();

  // Click the first "Market" POI button — navigates to /{symbol}/market
  const marketLink = page.getByRole("link", { name: "Market" }).first();
  await expect(marketLink).toBeVisible();
  await marketLink.click();

  await expect(page).toHaveURL(/\/market$/);
  await expect(page.getByRole("tab", { name: "Tradegoods" })).toBeVisible();
});

test("market trade goods table has expected columns", async ({ page }) => {
  await page.goto("/waypoints");
  await page.getByRole("heading", { name: /Waypoints at:/i }).waitFor();

  const marketLink = page.getByRole("link", { name: "Market" }).first();
  await marketLink.click();
  await expect(page).toHaveURL(/\/market$/);

  await expect(page.getByRole("columnheader", { name: "Good" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Type" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: /Supply/i })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: /Purchase Price/i })).toBeVisible();
});

test("market table has at least one trade good row", async ({ page }) => {
  await page.goto("/waypoints");
  await page.getByRole("heading", { name: /Waypoints at:/i }).waitFor();

  const marketLink = page.getByRole("link", { name: "Market" }).first();
  await marketLink.click();
  await expect(page).toHaveURL(/\/market$/);

  const rows = page.getByRole("rowgroup").last().getByRole("row");
  await expect(rows.first()).toBeVisible();
});
