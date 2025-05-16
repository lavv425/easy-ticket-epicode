import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 30000,
      strictPort: true,
      host: "localhost",
    },
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
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
