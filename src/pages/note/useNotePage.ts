import { inject, onMounted, ref } from "vue";
import {useRoute} from "vue-router"
import { PgInjectKey } from "@/composables/usePgClient";
import type { Note } from "@/types/apps";

export const useNotePage = () => {
  const loading = ref(false)
  const note = ref<Note>();
  const pg = inject(PgInjectKey);
  const route = useRoute()
  
  onMounted(async () => {
    loading.value = true
    const ret = await pg?.query<Note>("SELECT * FROM t_notes WHERE id = $1", [route.params?.id]);
    if (ret?.rows) note.value = ret.rows[0]
    loading.value = false;
  });

  return { note, loading };
};
