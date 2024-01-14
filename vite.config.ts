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
  optimizeDeps: {
    exclude: ["./src/components/Timer/timer.worker.ts"],
  },
});
