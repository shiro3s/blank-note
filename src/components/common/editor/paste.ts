import type { EditorView } from "@codemirror/view";

type Args = {
	event: ClipboardEvent;
	view: EditorView;
	uploader?: (file: File) => Promise<string>;
};

export const handlePaste = ({ event, view, uploader }: Args) => {
	if (!event.clipboardData?.files.length || !uploader) return;

	for (let i = 0; i < event.clipboardData.files.length; i++) {
		const file = event.clipboardData.files[i];

		uploader(file).then((path) => {
			const insertText = `![](${path})`;
			const transaction = view.state.update({
				changes: {
					from: view.state.selection.main.head,
					insert: insertText,
				},
			});
			view.dispatch(transaction);
		});
	}
};
