import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  start: {
    middleware: "./src/middleware.ts",
    ssr: true,
    server: {
      preset: "vercel",
    },
  },
  ssr: {
    noExternal: ["@kobalte/core"],
  },
  optimizeDeps: {
    exclude: ["./src/components/Timer/timer.worker.ts"],
  },
});
