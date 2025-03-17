import type { MarkdownItAsync } from "markdown-it-async";

const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#fff"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>`;
const copyBtn = `<button class="code-block__clipboard-btn" type="button"><i class="code-block__icon">${copyIcon}</i></button>`;

export const fence = (md: MarkdownItAsync) => {
	const fence = md.renderer.rules.fence;
	md.renderer.rules.fence = (...args) => {
		const [tokens, idx] = args;
		const token = tokens[idx];

		const fileName = token.info.trim().split(":")[1]?.trim();

		if (fileName) {
			return `<div class="code-block"><div class="code-block__title"><span>${fileName}</span></div><div class="code-block__content">${fence?.(...args)}${copyBtn}</div></div>`;
		}

		return `<div class="code-block__content">${fence?.(...args)}${copyBtn}</div>`;
	};
};
