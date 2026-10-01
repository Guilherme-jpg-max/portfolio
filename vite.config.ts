import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  build: {
    // O chunk da cena (three.js + pós-processamento) tem ~960 kB e é carregado
    // sob demanda só no cliente; o restante do app fica bem abaixo disso.
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 8080,
  },
});
