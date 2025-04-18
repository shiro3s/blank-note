import type { Icon } from "@/components/micro/icon/type"

export interface Menu {
	icon: Icon;
	path: string;
	name: string;
}

export const menus: Menu[] = [
	{
		path: "/notes",
		icon: "NoteStack",
		name: "Notes",
	},
	{
		path: "/notes/new",
		icon: "Add",
		name: "New note"
	},
	{
		path: "/notes/trash",
		icon: "Trash",
		name: "Trash"
	},
	{
		path: "/notes/guide",
		icon: "Help",
		name: "How to write"
	}
];
