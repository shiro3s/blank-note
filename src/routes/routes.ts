import type { RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/home/HomePage.vue"
import ColumnLayout from "@/layouts/column-layout/ColumnLayout.vue";
import NotesPage from "@/pages/notes/NotesPage.vue";
import NewNotePage from "@/pages/new-note/NewNotePage.vue";
import EditNotePage from "@/pages/edit-note/EditNotePage.vue"
import TrashNotesPage from "@/pages/trash-notes/TrashNotesPage.vue"
import GuidePage from "@/pages/guide/GuidePage.vue"
import NotePage from "@/pages/note/NotePage.vue"
import NotFoundPage from "@/pages/not-found/NotFoundPage.vue"

import { strToBool } from "@/utils/string";
import { pgClient } from "@/composables/pg";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Home",
		component: HomePage,
		beforeEnter: async (to, from, next) => {
			try {
				const ret = await pgClient.query<{ value: string }>(
					"SELECT value FROM m_settings WHERE id =1",
				);

				if (ret.rows.length) {
					const bool = strToBool(ret.rows[0].value);
					if (bool) next("/notes");
				}
				next();
			} catch {
				next();
			}
		},
	},
	{
		path: "/notes",
		component: ColumnLayout,
		children: [
			{
				path: "",
				component: NotesPage,
			},
			{
				path: "new",
				component: NewNotePage,
			},
			{
				path: "edit/:id",
				component: EditNotePage,
			},
			{
				path: "trash",
				component: TrashNotesPage,
			},
			{
				path: "guide",
				component: GuidePage,
			},
			{
				path: ":id",
				component: NotePage,
				strict: true,
			},
		],
	},
	{
		path: "/:anymatch(.*)",
		name: "NotFound",
		component: NotFoundPage,
	},
];
