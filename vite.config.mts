import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
	server: {
		port: 4400,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	plugins: [vue(), basicSsl()],
	optimizeDeps: {
		exclude: ["@electric-sql/pglite"],
	},
});
