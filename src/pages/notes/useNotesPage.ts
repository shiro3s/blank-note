import { inject, onMounted, ref } from "vue";
import { PgInjectKey } from "@/composables/usePgClient";
import type { Note } from "@/types/apps";
import { now } from "@/utils/date";

export const useNotesPage = () => {
	const notes = ref<Note[]>([]);
	const pg = inject(PgInjectKey);

	const search = async () => {
		console.log("search")
		const ret = await pg?.query<Note>(
			"SELECT * FROM t_notes WHERE isDeleted = false ORDER BY updatedAt, createdAt DESC",
		);
		if (ret?.rows) notes.value = ret.rows;
	};

	const handleTrash = async (id: string) => {
		await pg?.query(
			"UPDATE t_notes SET isDeleted = $1, updatedAt = $2 WHERE id = $3",
			[false, now(), id],
		);
		await search();
	};

	onMounted(async () => {
		await search();
	});

	return { notes, handleTrash };
};
