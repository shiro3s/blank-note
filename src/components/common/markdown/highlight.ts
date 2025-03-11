import { codeToHtml } from "shiki";
import {
	transformerNotationDiff,
	transformerNotationFocus,
} from "@shikijs/transformers";

const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#fff"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>`

export const customHighlight = async (
	code: string,
	lang: string,
	attrs: string,
) => {
	const language = lang ?? "text";
	const fileName = attrs.split(":")[1];
	
	const copyBtn = `<button class="code-block__clipboard-btn" type="button"><i class="code-block__icon">${copyIcon}</i></button>`
	try {
		const highlightContent = await codeToHtml(code, {
			lang: language,
			theme: "monokai",
			transformers: [transformerNotationDiff(), transformerNotationFocus()],
		});

		if (!fileName) return `<div class="code-block__content">${highlightContent}${copyBtn}</div>`;

		return `<div class="code-block"><div class="code-block__title"><span>${fileName}</span></div><div class="code-block__content">${highlightContent}${copyBtn}</div></div>`;
	} catch {
		// langをtextとして処理
		const highlightContent = await codeToHtml(code, {
			lang: "text",
			theme: "monokai",
			transformers: [transformerNotationDiff(), transformerNotationFocus()],
		});
		return `<div class="code-block__content">${highlightContent}${copyBtn}</div>`;
	}
};
