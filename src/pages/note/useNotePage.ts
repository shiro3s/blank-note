import {inject, onMounted} from "vue";
import {PgInjectKey} from "@/composables/usePgClient"

export const useNotePage = () => {
  const pg = inject(PgInjectKey);

  onMounted(async () => {
    const res = await pg?.query("SELECT * FROM t_notes")
    console.log(res)
  })
}