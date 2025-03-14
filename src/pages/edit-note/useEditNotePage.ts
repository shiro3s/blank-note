import { inject, onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { PgInjectKey } from "@/composables/usePgClient";
import { insertNote } from "@/constants/sql";
import { now } from "@/utils/date";
import { ulid } from "ulidx";

import type { NoteValue } from "@/components/feature/note-editor/useNoteEditor";
import type { Note } from "@/types/apps";

type LocationParams = {
	id?: string;
};

export const useEditNotePage = () => {
	const state = reactive({
		loading: true,
		error: false
	})
	const note = ref<Note>()
	const pg = inject(PgInjectKey);
	const route: {
		params: LocationParams;
	} = useRoute();
	const router = useRouter();

	const handleSubmit = async (value: NoteValue) => {
		await pg?.query(insertNote, [ulid(), value.title, value.content, now()]);
		router.push("/notes");
	};

	onMounted(async () => {
		const ret = await pg?.query<Note>(
			"SELECT * from t_notes WHERE id = $1 and isDeleted = false",
			[route.params.id],
		);

		if (ret?.rows.length) {
			note.value = ret.rows[0]
		} else {
			state.error = true
		}
		state.loading = false
	});

	return { handleSubmit, note, state };
};
