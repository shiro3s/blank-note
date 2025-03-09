import { computed, ref, onMounted, onUnmounted } from "vue";
import { type Extension, EditorState } from "@codemirror/state";
import {
	placeholder,
	lineNumbers,
	keymap,
	highlightActiveLine,
	EditorView,
	highlightSpecialChars,
} from "@codemirror/view";
import {
	history,
	defaultKeymap,
	historyKeymap,
	indentWithTab,
} from "@codemirror/commands";
import { syntaxHighlighting } from "@codemirror/language";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { customKeymap } from "./keymap";

import { highlight } from "./highlight";
import { theme } from "./theme";
import { handleDrop } from "./drop";
import { handlePaste } from "./paste";

export interface Props {
	modelValue?: string;
	placeholder?: string;
	lineNumber?: boolean;
	extensions?: Extension[];
	uploader?: (file: File) => Promise<string>;
}

export interface ExEditorView extends EditorView {
	insert?: (insertText: string) => void;
}

export type EmitType = {
	"update:modelValue": [value: string];
	ready: [value: ExEditorView];
};

type Emits = ((evt: "update:modelValue", value: string) => void) &
	((evt: "ready", value: ExEditorView) => void);


// NOTE: state を vue内のステートとしてもつと動かないため
// https://discuss.codemirror.net/t/i-use-snippet-to-add-content-throw-exception/8547/2
let state: EditorState | null = null; 

export const useEditor = (props: Props, emits: Emits) => {
	const parentElm = ref<HTMLDivElement>();
	const editor = ref<ExEditorView>();
	const text = ref(props.modelValue);

	const extensions = computed(() => {
		const ex: Extension[] = [];
		if (props.placeholder) ex.push(placeholder(props.placeholder));
		if (props.lineNumber) ex.push(lineNumbers());

		if (props.extensions) return [...props.extensions, ...ex];

		return ex;
	});

	const editorState = EditorState.create({
		doc: text.value,
		extensions: [
			keymap.of([
				...defaultKeymap,
				...historyKeymap,
				...customKeymap,
				indentWithTab,
			]),
			theme,
			history(),
			highlightActiveLine(),
			highlightSpecialChars(),
			syntaxHighlighting(highlight),
			markdown({
				base: markdownLanguage,
				codeLanguages: languages,
			}),
			EditorView.lineWrapping,
			EditorView.domEventHandlers({
				drop: (event, view) => {
					handleDrop({ event, view, uploader: props.uploader });
				},
				paste: (event, view) => {
					handlePaste({ event, view, uploader: props.uploader });
				},
			}),
			// NOTE: https://discuss.codemirror.net/t/listen-to-change-event/5095
			EditorView.updateListener.of((update) => {
				editor.value = update.view
				state = update.state
				if (update.docChanged) {
					emits("update:modelValue", update.state.doc.toString());
				}
			}),
			...extensions.value,
		],
	});

	const insert = (insertText: string) => {
		if (!state || !editor.value) return;
		const transaction = state.update({
			changes: {
				from: state.selection.main.head,
				insert: insertText,
			},
		});
		editor.value.dispatch(transaction);
	};

	onMounted(() => {
		const view = new EditorView({
			parent: parentElm.value,
			state: editorState,
		});
		editor.value = view;
		state = editorState

		editor.value.insert = insert;
		emits("ready", editor.value);
	});

	onUnmounted(() => {
		editor.value?.destroy();
		state = null
	});

	return {
		parentElm,
	};
};
