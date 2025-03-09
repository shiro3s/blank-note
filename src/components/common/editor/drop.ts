import type { EditorView } from "@codemirror/view";

type Args = {
	event: DragEvent;
	view: EditorView;
	uploader?: (file: File) => Promise<string>;
};

export const handleDrop = ({ event, view, uploader }: Args) => {
	if (!event.dataTransfer || !uploader) return;

	const insertText = (url: string) => {
		const cursorPos = view.posAtCoords({
			x: event.pageX,
			y: event.pageY,
		});
		const insertText = `![](${url})`;
		const transaction = view.state.update({
			changes: {
				from: cursorPos || 0,
				insert: insertText,
			},
		});

		view.dispatch(transaction);
	};

	if (event.dataTransfer.items) {
		for (let i = 0; i < event.dataTransfer.items.length; i++) {
			const item = event.dataTransfer.items[i];

			if (item.kind !== "file") return;

			const file = item.getAsFile();
			if (!file) return;

			uploader(file).then((path) => {
				insertText(path);
			});
		}
		return;
	}

	for (let i = 0; i < event.dataTransfer.files.length; i++) {
		const file = event.dataTransfer.files[i];

		uploader(file).then((path) => {
			insertText(path);
		});
	}
};
