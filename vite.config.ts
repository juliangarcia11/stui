import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import type { Plugin } from "vite";

function mswPlugin(): Plugin {
  return {
    name: "msw",
    apply: "serve",
    async configureServer() {
      if (process.env.VITE_ENABLE_MOCKS !== "true") return;
      const { server } = await import("./app/mocks/node.js");
      server.listen({ onUnhandledRequest: "bypass" });
      console.log("[msw] Node server started");
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), mswPlugin()],
});
