import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";

export const pgClient = new PGlite("idb://proto-note", {
	relaxedDurability: true,
	extensions: {
		live,
	},
});
