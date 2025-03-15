import { inject, onMounted, ref, computed, watch, reactive } from "vue";
import { useRoute } from "vue-router";

import { PgInjectKey } from "@/composables/usePgClient";
import type { Note } from "@/types/apps";
import { strToNum } from "@/utils/string";
import { now } from "@/utils/date";

const limit = 15;

type LocationQuery = {
	page?: string;
};

export const useTrashNotesPage = () => {
	const notes = ref<Note[]>([]);
	const state = reactive({
		loading: true,
	})
	const dialog = ref<{
		openDialog: ({
			title,
			message,
			onSuccess,
		}: {
			title?: string;
			message?: string;
			onSuccess?: () => void;
		}) => void;
		closeDialog: () => void;
	}>();

	const count = ref(0);
	const pg = inject(PgInjectKey);
	const route: {
		query: LocationQuery;
	} = useRoute();

	const currentPage = computed(() => strToNum(route.query?.page || "1"));

	const getCount = async () => {
		const ret = await pg?.query<{ count: number }>(
			"SELECT count(*) FROM t_notes WHERE isDeleted = true",
		);
		if (ret?.rows.length) count.value = ret.rows[0].count;
	};

	const search = async () => {
		const offset = (currentPage.value - 1) * limit;
		const ret = await pg?.query<Note>(
			"SELECT * FROM t_notes WHERE isDeleted = true ORDER BY createdAt DESC, updatedAt DESC LIMIT $1 OFFSET $2",
			[limit, offset],
		);

		if (ret?.rows) notes.value = ret.rows;
	};

	const restoreNote = async (id: string) => {
		await pg?.query(
			"UPDATE t_notes SET isDeleted = $1, updatedAt = $2 WHERE id = $3",
			[false, now(), id],
		);

		await Promise.all([search(), getCount()]);
	};

	const handleOpenDialog = (id: string) => {
		dialog.value?.openDialog({
			title: "Would you like to delete note?",
			message:
				"Deleted notes cannot be restored.<br />Would you like to delete it?",
			onSuccess: async () => {
				await deleteNote(id);
				dialog.value?.closeDialog();
			},
		});
	};

	const deleteNote = async (id: string) => {
		await pg?.query("DELETE FROM t_notes WHERE id = $1", [id]);
		await Promise.all([search(), getCount()]);
	};

	watch(
		() => route.query,
		async () => {
			await Promise.all([search(), getCount()]);

			window.scrollTo(0, 0);
		},
	);

	onMounted(async () => {
		await Promise.all([search(), getCount()]);
		state.loading = false
	});

	return { notes, count, currentPage, dialog, state, restoreNote, handleOpenDialog };
};
