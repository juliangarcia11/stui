import { expect, test as setup } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { getOrRegisterAgent } from "./agent-store";

const SESSION_FILE = path.join(import.meta.dirname, ".auth", "session.json");

setup("authenticate", async ({ page }) => {
  const accountToken = process.env.VITE_SPACETRADERS_ACCOUNT_TOKEN;
  if (!accountToken) throw new Error("VITE_SPACETRADERS_ACCOUNT_TOKEN is not set");

  const agent = await getOrRegisterAgent(accountToken);

  // POST directly to the login action — bypasses React Router's client-side
  // fetcher plumbing and lets us verify the server action in isolation.
  await page.request.post("/login", {
    form: {
      symbol: agent.symbol.toLowerCase(),
      token: agent.token,
    },
  });

  // The POST sets a session cookie (via Set-Cookie on the 302 redirect).
  // Verify the cookie landed by navigating to / which requires auth.
  await page.goto("/");
  await expect(page).toHaveURL("/");

  fs.mkdirSync(path.dirname(SESSION_FILE), { recursive: true });
  await page.context().storageState({ path: SESSION_FILE });
});
