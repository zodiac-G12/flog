import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: false,
  server: {
    baseURL: process.env.BASE_PATH,
    preset: "static",
    prerender: {
      crawLinks: true,
    },
  },
});
