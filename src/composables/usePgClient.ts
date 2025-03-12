import { type InjectionKey, onMounted } from "vue";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { createTableNotes } from "@/constants/sql";

export const usePgClient = () => {
	const pg = new PGliteWorker(
		new Worker(new URL("./pglite-worker.ts", import.meta.url), {
			type: "module",
		}),
	);

	onMounted(async () => {
		await pg.exec(createTableNotes);
	});

	return pg;
};

export type PgContext = ReturnType<typeof usePgClient>;
export const PgInjectKey: InjectionKey<PgContext> = Symbol("pg");
