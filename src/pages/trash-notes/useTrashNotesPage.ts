import { inject, onMounted, ref } from "vue";
import { PgInjectKey } from "@/composables/usePgClient";
import type { Note } from "@/types/apps";

export const useTrashNotesPage = () => {
  const notes = ref<Note[]>([]);
  const pg = inject(PgInjectKey);

  const search = async () => {
    console.log("search")
    const ret = await pg?.query<Note>(
      "SELECT * FROM t_notes WHERE isDeleted = true ORDER BY updatedAt, createdAt DESC",
    );
    if (ret?.rows) notes.value = ret.rows;
  };

  onMounted(async () => {
    await search();
  });

  return { notes };
};
