import { inject } from "vue";
import { useRouter } from "vue-router";
import { PgInjectKey } from "@/composables/usePgClient";
import { insertNote } from "@/constants/sql";
import { now } from "@/utils/date";
import { ulid } from "ulidx";

import type { NoteValue } from "@/components/feature/note-editor/useNoteEditor";

export const useNewNotePage = () => {
	const pg = inject(PgInjectKey);
	const router = useRouter();

	const handleSubmit = async (value: NoteValue) => {
		await pg?.query(insertNote, [ulid(), value.title, value.content, now()]);
		router.push("/notes");
	};

	return { handleSubmit };
};
