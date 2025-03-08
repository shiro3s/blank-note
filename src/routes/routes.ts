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
				"path": "",
				component: () => import("@/pages/note/NotePage.vue")
			}
		]
	},
	{
		path: "/:anymatch(.*)",
		name: "NotFound",
		component: () => import("@/pages/not-found/NotFoundPage.vue")
	}
];
