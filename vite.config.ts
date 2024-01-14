import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  start: {
    middleware: "./src/middleware.ts",
    // TODO: add SSR support
    ssr: false,
    server: {
      preset: "vercel",
    },
  },
});
