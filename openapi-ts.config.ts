import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://api.spacetraders.io/v2/documentation/json",
  output: {
    path: "./app/api/client",
    postProcess: ["prettier", "eslint"],
  },
  plugins: [
    "@hey-api/schemas",
    {
      dates: true,
      name: "@hey-api/transformers",
    },
    {
      enums: "javascript",
      name: "@hey-api/typescript",
    },
    {
      name: "@hey-api/sdk",
      transformer: true,
    },
  ],
});
