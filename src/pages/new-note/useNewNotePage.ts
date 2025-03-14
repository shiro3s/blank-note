import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { PgInjectKey } from "@/composables/usePgClient";
import { insertNote } from "@/constants/sql";
import {STORAGE_CAPACITY} from "@/constants/bite"
import { ulid } from "ulidx";

import type { NoteValue } from "@/components/feature/note-editor/useNoteEditor";
import { toMegaBite } from "@/utils/bite";
import {getBite} from "@/utils/string"
import { now } from "@/utils/date";


export const useNewNotePage = () => {
	const dialog = ref<{
		openDialog: ({title, message}: {title?: string, message?: string}) => void;
		closeDialog: () => void;
	}>()
	const pg = inject(PgInjectKey);
	const router = useRouter();

	const handleSubmit = async (value: NoteValue) => {
		const estimate = await navigator.storage.estimate()	
		const usage = toMegaBite(estimate.usage);

		const writeBite = getBite(value.title) + getBite(value.content)
		const writeMegaBite = toMegaBite(writeBite)

		if (usage + writeMegaBite > STORAGE_CAPACITY.MAX.MEGA) {
			dialog.value?.openDialog({
				title: "Not enough free storage space.",
				message: "Could not create note.<br />Please increase free space and try again."
			})
			return
		}

		await pg?.query(insertNote, [ulid(), value.title, value.content, now()]);
		router.push("/notes");
	};

	return { handleSubmit, dialog };
};
