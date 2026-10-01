import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Config separada do vite.config.ts: os testes não precisam dos plugins do
// Cloudflare e do TanStack Start, só do alias `@/`.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
