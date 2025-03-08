import path from "node:path";
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue"

export default defineConfig(() => {
  return {
    server: {
      port: 4400
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    plugins: [
      vue()
    ]
  }
});
