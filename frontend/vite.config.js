import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const BACKEND_BASE_URL = mode === "development" || !mode ? "http://localhost:30001/api" : "https://easy-ticket-epc.michaellavigna.com/api";

  return {
    server: {
      port: 30000,
      strictPort: true,
      host: "localhost",
    },
    define: {
      "import.meta.env.BACKEND_BASE_URL": JSON.stringify(BACKEND_BASE_URL),
    },
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      VitePWA({
        registerType: "autoUpdate",
        includeManifestIcons: false,
        manifest: {
          name: "Easy Ticket",
          short_name: "Easy Ticket",
          description: "Easy to use ticketing system for your business",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/",
          icons: [
            {
              src: "/assets/images/android-icon-36x36.png",
              sizes: "36x36",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "/assets/images/android-icon-48x48.png",
              sizes: "48x48",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "/assets/images/android-icon-72x72.png",
              sizes: "72x72",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "/assets/images/android-icon-96x96.png",
              sizes: "96x96",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "/assets/images/android-icon-144x144.png",
              sizes: "144x144",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "/assets/images/android-icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        },
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "assets/[hash].js", // Entry filename
          chunkFileNames: "assets/[hash].js", // Chunks filename
          assetFileNames: "assets/[hash].[ext]", // Assets filename
        },
      },
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          ecma: 2020,
          module: true,
          toplevel: true,
          passes: 25,
          unsafe: true,
          hoist_vars: true,
          inline: true,
          pure_funcs: ["console.log", "console.info", "console.warn"],
        },
        format: {
          comments: false,
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "es2020",
        minify: true,
        minifyWhitespace: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        sourcemap: mode === "development",
        treeShaking: true,
      },
    },
  };
});
