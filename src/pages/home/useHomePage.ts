import { inject } from "vue";
import { PgInjectKey } from "@/composables/usePgClient";

export const useHomePage = () => {
	const pg = inject(PgInjectKey);

	const handleClick = async () => {
		await pg?.query("UPDATE m_settings SET value = $1 WHERE id = $2", [
			"true",
			1,
		]);
	};
  
	return {
		handleClick,
	};
};
