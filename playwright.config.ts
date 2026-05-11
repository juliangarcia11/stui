import { defineConfig, devices } from "@playwright/test";
import * as path from "path";

process.loadEnvFile(path.resolve(import.meta.dirname, ".env"));

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
      testDir: "./playwright",
    },
    {
      name: "chromium",
      testIgnore: [/smoke\/auth\.spec\.ts/, /mocked\//],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/session.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "auth-tests",
      testMatch: /smoke\/auth\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
    {
      name: "mocked",
      testMatch: /mocked\/.+\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:5174",
        storageState: "playwright/.auth/session.json",
      },
      dependencies: ["setup"],
    },
  ],

  webServer: [
    {
      command: "pnpm dev",
      url: "http://localhost:5173",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "pnpm dev:mocked",
      url: "http://localhost:5174",
      reuseExistingServer: !process.env.CI,
      env: { VITE_ENABLE_MOCKS: "true" },
    },
  ],
});
