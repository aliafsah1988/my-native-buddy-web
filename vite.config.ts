import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

process.env = { ...process.env, ...loadEnv("development", process.cwd()) };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@test": fileURLToPath(new URL("./test", import.meta.url)),
    },
  },
  server: {
    port: 5000,
    proxy: {
      "^/-/.*": {
        target: process.env.VITE_PROXY_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/-/, ""),
      },
    },
  },
});
