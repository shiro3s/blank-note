import { computed, inject, onMounted, ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";

import { PgInjectKey } from "@/composables/usePgClient";
import type { Note } from "@/types/apps";
import { now } from "@/utils/date";
import { strToNum } from "@/utils/string";

const limit = 15;

type LocationQuery = {
	page?: string;
};

export const useNotesPage = () => {
	const notes = ref<Note[]>([]);
	const state = reactive({
		loading: true,
	});

	const count = ref(0);
	const pg = inject(PgInjectKey);
	const route: {
		query: LocationQuery;
	} = useRoute();

	const currentPage = computed(() => strToNum(route.query?.page || "1"));

	const getCount = async () => {
		const ret = await pg?.query<{ count: number }>(
			"SELECT count(*) FROM t_notes WHERE isDeleted = false",
		);
		if (ret?.rows) count.value = ret.rows[0].count;
	};

	const search = async () => {
		const offset = (currentPage.value - 1) * limit;
		const ret = await pg?.query<Note>(
			"SELECT * FROM t_notes WHERE isDeleted = false  ORDER BY createdAt DESC, updatedAt DESC LIMIT $1 OFFSET $2",
			[limit, offset],
		);

		if (ret?.rows) notes.value = ret.rows;
	};

	const handleTrash = async (id: string) => {
		await pg?.query(
			"UPDATE t_notes SET isDeleted = $1, updatedAt = $2 WHERE id = $3",
			[true, now(), id],
		);
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
		state.loading = false;
	});

	return { notes, count, currentPage, state, handleTrash };
};
