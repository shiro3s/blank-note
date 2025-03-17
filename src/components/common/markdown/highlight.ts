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
	try {
		const highlightContent = await codeToHtml(code, {
			lang: language,
			theme: "monokai",
			transformers: [transformerNotationDiff(), transformerNotationFocus()],
		});

		return highlightContent;
	} catch {
		// langをtextとして処理
		const highlightContent = await codeToHtml(code, {
			lang: "text",
			theme: "monokai",
			transformers: [transformerNotationDiff(), transformerNotationFocus()],
		});

		return highlightContent;
	}
};
