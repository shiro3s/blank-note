import { EditorView } from "@codemirror/view";

export const theme = EditorView.theme({
	"&": {},
	"&.cm-editor": {
		outline: "none",
		padding: "16px 0",
		"box-sizing": "border-box",
		"font-size": "16px",
		"line-height": "1.5",
	},
	".cm-activeLine": {
		"background-color": "#f3f3f388",
	},
	".cm-gutters": {
		"background-color": "#fff",
		"font-size": "12px",
		display: "flex",
		"align-items": "center",
	},
	".cm-lineNumbers .cm-gutterElement": {
		"min-width": "28px",
	},
	".cm-line": {
		"padding-left": "0",
	},
});
