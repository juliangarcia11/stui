import { expect, test } from "@playwright/test";

test("waypoints list loads with table", async ({ page }) => {
  await page.goto("/waypoints");
  await expect(page.getByRole("heading", { name: /Waypoints at:/i })).toBeVisible();
});

test("waypoints table has at least one row", async ({ page }) => {
  await page.goto("/waypoints");
  // Wait for the heading, then check table body rows exist
  await page.getByRole("heading", { name: /Waypoints at:/i }).waitFor();
  const rows = page.getByRole("rowgroup").last().getByRole("row");
  await expect(rows.first()).toBeVisible();
});

test("waypoints table has expected columns", async ({ page }) => {
  await page.goto("/waypoints");
  await expect(page.getByRole("columnheader", { name: "Faction" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Type" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Coordinates" })).toBeVisible();
});
