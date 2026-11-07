// vite.config.ts — Dr. Ahmed Pharmacy Frontend
//
// Build engine: @lovable.dev/vite-tanstack-config (bundles TanStack Start,
// Nitro, Tailwind v4, tsconfig-paths, React dedupe, and @ alias automatically).
//
// Do NOT manually add these plugins — they are already included:
//   TanStack devtools (dev), tanstackStart, viteReact, tailwindcss,
//   tsConfigPaths, nitro (cloudflare preset), VITE_* env injection,
//   @ path alias, React/TanStack dedupe, error logger, sandbox detection.
//
// To add extra Vite config pass it via defineConfig({ vite: { ... } }).

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // SSR entry point — Nitro/Vite builds from dr-ahmed/src/server.ts
    server: { entry: "server" },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
              return "vendor-react";
            }
            if (id.includes("node_modules/@tanstack/")) {
              return "vendor-tanstack";
            }
            if (id.includes("node_modules/@supabase/")) {
              return "vendor-supabase";
            }
            if (id.includes("node_modules/motion/") || id.includes("node_modules/framer-motion/")) {
              return "vendor-motion";
            }
            if (id.includes("node_modules/lucide-react/")) {
              return "vendor-icons";
            }
            if (id.includes("node_modules/@radix-ui/")) {
              return "vendor-radix";
            }
            return undefined;
          },
        },
      },
    },
  },
});
