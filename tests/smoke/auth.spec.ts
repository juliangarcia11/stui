import { expect, test } from "@playwright/test";
import { getOrRegisterAgent } from "../../playwright/agent-store";

test("redirects unauthenticated users to /login", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/login");
});

test("login happy path", async ({ page }) => {
  const accountToken = process.env.VITE_SPACETRADERS_ACCOUNT_TOKEN!;
  const agent = await getOrRegisterAgent(accountToken);

  await page.goto("/login");
  await page.locator('[name="symbol"]').fill(agent.symbol.toLowerCase());
  await page.locator('[name="token"]').fill(agent.token);
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page).toHaveURL("/");
});

test("shows error on bad credentials", async ({ page }) => {
  await page.goto("/login");
  await page.locator('[name="symbol"]').fill("NOTREAL");
  await page.locator('[name="token"]').fill("not-a-valid-token");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator('[data-accent-color="red"]')).toBeVisible();
});
