import type { RouteRecordRaw } from "vue-router";
import { strToBool } from "@/utils/string";
import { pgClient } from "@/composables/pg";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/pages/home/HomePage.vue"),
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
		component: () => import("@/layouts/column-layout/ColumnLayout.vue"),
		children: [
			{
				path: "",
				component: () => import("@/pages/notes/NotesPage.vue"),
			},
			{
				path: "new",
				component: () => import("@/pages/new-note/NewNotePage.vue"),
			},
			{
				path: "edit/:id",
				component: () => import("@/pages/edit-note/EditNotePage.vue"),
			},
			{
				path: "trash",
				component: () => import("@/pages/trash-notes/TrashNotesPage.vue"),
			},
			{
				path: "guide",
				component: () => import("@/pages/guide/GuidePage.vue"),
			},
			{
				path: ":id",
				component: () => import("@/pages/note/NotePage.vue"),
				strict: true,
			},
		],
	},
	{
		path: "/:anymatch(.*)",
		name: "NotFound",
		component: () => import("@/pages/not-found/NotFoundPage.vue"),
	},
];
