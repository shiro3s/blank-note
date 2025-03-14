import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/pages/home/HomePage.vue"),
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
				component: () => import("@/pages/trash-notes/TrashNotesPage.vue")
			},
			{
				path: ":id",
				component: () => import("@/pages/note/NotePage.vue"),
				strict: true
			}
		],
	},
	{
		path: "/:anymatch(.*)",
		name: "NotFound",
		component: () => import("@/pages/not-found/NotFoundPage.vue"),
	},
];
