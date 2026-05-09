import { expect, test } from "@playwright/test";

test("dashboard loads with heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("agent overview card is visible", async ({ page }) => {
  await page.goto("/");
  // AgentOverviewCard renders the agent symbol as a heading
  await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
});

test("nav links are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /waypoints/i })).toBeVisible();
});
