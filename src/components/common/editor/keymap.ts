import type { KeyBinding, EditorView } from "@codemirror/view";

const ArrowUp = (view: EditorView) => {
	if (view.state.selection.main.head === 0 && window.scrollY !== 0)
		window.scrollTo({ top: 0, behavior: "smooth" });
	return true;
};

const ArrowDown = (view: EditorView) => {
	const lastLine = view.state.doc.length;
	if (view.state.selection.main.head === lastLine) {
		const scrollHeight = document.scrollingElement?.scrollHeight || 0;
		const pos = scrollHeight - window.innerHeight;

		if (pos !== window.scrollY)
			window.scrollTo({ top: scrollHeight, behavior: "smooth" });
	}

	return true;
};

export const customKeymap: KeyBinding[] = [
	{
		key: "ArrowUp",
		run: ArrowUp,
	},
	{
		key: "ArrowDown",
		run: ArrowDown,
	},
];
