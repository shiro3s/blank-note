import { onMounted } from "vue";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { createTableNotes } from "./init-sql";

export const usePgClient = () => {
	const pg = new PGliteWorker(
		new Worker(new URL("./pglite-worker.ts", import.meta.url), {
			type: "module",
		}),
	);

	onMounted(async () => {
		await pg.exec(createTableNotes);
	});
};
