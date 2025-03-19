import { worker } from "@electric-sql/pglite/worker";
import { pgClient } from "./pg";

worker({
	async init() {
		return pgClient;
	},
});
