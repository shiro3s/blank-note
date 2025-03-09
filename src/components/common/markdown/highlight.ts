import { codeToHtml } from "shiki";
import {
	transformerNotationDiff,
	transformerNotationFocus,
} from "@shikijs/transformers";

export const customHighlight = async (
	code: string,
	lang: string,
	attrs: string,
) => {
	const language = lang ?? "text";
	const fileName = attrs.split(":")[1];

	const highlightContent = await codeToHtml(code, {
		lang: language,
		theme: "monokai",
		transformers: [transformerNotationDiff(), transformerNotationFocus()],
	});

	if (!fileName) return highlightContent;

	return `<div class="code-block"><div class="code-block-title"><span>${fileName}</span></div>${highlightContent}</div>`;
};
