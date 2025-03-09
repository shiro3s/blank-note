import type mdIt from "markdown-it";
import mdItContainer from "markdown-it-container";

export const container = (md: mdIt, name: string) => {
	md.use(mdItContainer, name, {
		render: (tokens, idx) => {
			const token = tokens[idx];
			const info = token.info.trim().slice(name.length).trim();
			const attrs = md.renderer.renderAttrs(token);

      if (token.nesting === 1) {
				const title = md.renderInline(info || name.toUpperCase());

				// Opening tag
				if (name === "details") {
					return `<details class="${name} custom-block" ${attrs}><summary>${title}</summary>\n`;
				}

				return `<div class="${name} custom-block" ${attrs}><p class="custom-block-title">${title}</p>\n`;
			}

			// Closing tag
			return name === "details" ? "</details>\n" : "</div>\n";
		},
	} as mdItContainer.ContainerOpts);
};
