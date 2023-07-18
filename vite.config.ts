import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    outDir: "docs",
  },
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      "@/": `${__dirname}/src/`,
    },
  },
});
