import { expect, test } from "@playwright/test";
import { MARKET_WAYPOINT, SYSTEM_SYMBOL } from "../../app/mocks/fixtures/waypoints";

test("waypoints heading shows mocked system symbol", async ({ page }) => {
  await page.goto("/waypoints");
  await expect(page.getByRole("heading", { name: /Waypoints at:/i })).toContainText(SYSTEM_SYMBOL);
});

test("waypoints table has exactly 2 rows from fixture", async ({ page }) => {
  await page.goto("/waypoints");
  await page.getByRole("heading", { name: /Waypoints at:/i }).waitFor();
  const rows = page.getByRole("rowgroup").last().getByRole("row");
  await expect(rows).toHaveCount(2);
});

test("market waypoint row has a Market POI link", async ({ page }) => {
  await page.goto("/waypoints");
  await page.getByRole("heading", { name: /Waypoints at:/i }).waitFor();
  await expect(page.getByRole("link", { name: "Market" })).toBeVisible();
});

test("clicking Market link navigates to market page", async ({ page }) => {
  await page.goto("/waypoints");
  await page.getByRole("heading", { name: /Waypoints at:/i }).waitFor();
  await page.getByRole("link", { name: "Market" }).click();
  await expect(page).toHaveURL(new RegExp(`${MARKET_WAYPOINT}/market$`));
});

test("market page shows Tradegoods tab", async ({ page }) => {
  await page.goto(`/waypoints/${MARKET_WAYPOINT}/market`);
  await expect(page.getByRole("tab", { name: "Tradegoods" })).toBeVisible();
});

test("market trade goods table has 3 rows from fixture", async ({ page }) => {
  await page.goto(`/waypoints/${MARKET_WAYPOINT}/market`);
  await page.getByRole("tab", { name: "Tradegoods" }).waitFor();
  const rows = page.getByRole("rowgroup").last().getByRole("row");
  await expect(rows).toHaveCount(3);
});

test("market trade good names from fixture are visible", async ({ page }) => {
  await page.goto(`/waypoints/${MARKET_WAYPOINT}/market`);
  await page.getByRole("tab", { name: "Tradegoods" }).waitFor();
  await expect(page.getByRole("rowheader", { name: "Iron Ore" })).toBeVisible();
  await expect(page.getByRole("rowheader", { name: "Copper" })).toBeVisible();
  await expect(page.getByRole("rowheader", { name: "Aluminum" })).toBeVisible();
});
