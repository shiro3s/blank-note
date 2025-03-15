import { inject, onMounted, ref, reactive } from "vue";
import {useRoute} from "vue-router"
import { PgInjectKey } from "@/composables/usePgClient";
import type { Note } from "@/types/apps";

export const useNotePage = () => {
  // const loading = ref(true)
  const state = reactive({
    loading: true,
    error: false
  })
  const note = ref<Note>();
  const pg = inject(PgInjectKey);
  const route = useRoute()
  
  onMounted(async () => {
    const ret = await pg?.query<Note>("SELECT * FROM t_notes WHERE id = $1", [route.params?.id]);
    if (ret?.rows.length) {
      note.value = ret.rows[0]
    } else {
      state.error = true
    }
    state.loading = false
  });

  return { note, state };
};
