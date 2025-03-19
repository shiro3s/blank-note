import { type InjectionKey, onMounted } from "vue";
import { pgClient } from "./pg";
import { createTable, insertSetting } from "@/constants/sql";
import type { Setting } from "@/types/apps";

export const usePgClient = () => {
	const pg = pgClient;
	onMounted(async () => {
		await pg.exec(createTable);
		const ret = await pg.query<Setting>("SELECT * from m_settings");

		if (ret.rows.length === 0) {
			Promise.all([
				await pg.query(insertSetting, [1, "started", "false"]),
				await pg.query(insertSetting, [2, "capacity", "50"]),
			]);
		}
	});

	return pg;
};

export type PgContext = ReturnType<typeof usePgClient>;
export const PgInjectKey: InjectionKey<PgContext> = Symbol("pg");
