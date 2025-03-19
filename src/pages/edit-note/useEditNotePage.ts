import { inject, onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { PgInjectKey } from "@/composables/usePgClient";
import { now } from "@/utils/date";

import { STORAGE_CAPACITY } from "@/constants/bite";
import { toMegaBite, getBite } from "@/utils/bite";

import type { NoteValue } from "@/components/feature/note-editor/useNoteEditor";
import type { Note } from "@/types/apps";

type LocationParams = {
	id?: string;
};

export const useEditNotePage = () => {
	const state = reactive({
		loading: true,
		error: false,
	});

	const dialog = ref<{
		openDialog: ({
			title,
			message,
		}: { title?: string; message?: string }) => void;
		closeDialog: () => void;
	}>();

	const note = ref<Note>();
	const pg = inject(PgInjectKey);
	const route: {
		params: LocationParams;
	} = useRoute();
	const router = useRouter();

	const handleSubmit = async (value: NoteValue) => {
		const estimate = await navigator.storage.estimate();
		const usage = toMegaBite(estimate.usage);

		const writeBite = getBite(value.title) + getBite(value.content);
		const writeMegaBite = toMegaBite(writeBite);

		if (usage + writeMegaBite > STORAGE_CAPACITY.MAX.MEGA) {
			dialog.value?.openDialog({
				title: "Not enough free storage space.",
				message:
					"Could not update note.<br />Please increase free space and try again.",
			});
			return;
		}

		await pg?.query(
			"UPDATE t_notes SET title = $1, content = $2, updatedAt = $3 WHERE id = $4",
			[value.title, value.content, now(), note.value?.id],
		);
		router.push("/notes");
	};

	onMounted(async () => {
		const ret = await pg?.query<Note>(
			"SELECT * from t_notes WHERE id = $1 and isDeleted = false",
			[route.params.id],
		);

		if (ret?.rows.length) {
			note.value = ret.rows[0];
		} else {
			state.error = true;
		}
		state.loading = false;
	});

	return { handleSubmit, note, state, dialog };
};
