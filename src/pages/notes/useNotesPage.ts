import { inject, onMounted, ref } from "vue";
import { PgInjectKey } from "@/composables/usePgClient";
import type { Note } from "@/types/apps";

export const useNotePage = () => {
	const notes = ref<Note[]>([]);
	const pg = inject(PgInjectKey);

	onMounted(async () => {
		const ret = await pg?.query<Note>("SELECT * FROM t_notes ORDER BY updatedAt, createdAt DESC");
		if (ret?.rows) notes.value = ret.rows;
	});

	return { notes };
};
