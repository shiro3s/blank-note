import type mdIt from "markdown-it";

interface ExToken extends mdIt.Token {
	service?: string;
	src?: string;
}

const embedRegex = /@\[(youtube|figma)]\((.+)\)/im;

export const embed = (md: mdIt) => {
	md.renderer.rules.embed = (tokens, idx, options, env, self) => {
		const token = tokens as ExToken[];
		const service = token[idx].service;
		const src = token[idx].src;

		if (!service || !src) return "";

		const url = new URL(src);
		switch (service) {
			case "figma": {
				const embedURL = `https://embed.figma.com${url.pathname}${url.search}&embed-host=share`;
				return `<div class="embed-block"><iframe src="${embedURL}" allowfullscreen frameborder="0" loading="lazy"></iframe></div>`;
			}
			case "youtube": {
				const embedURL = `https://www.youtube-nocookie.com/embed${url.pathname}${url.search}`;
				return `<div class="embed-block"><iframe src="${embedURL}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" loading="lazy" allowfullscreen></iframe></div>`;
			}
		}

		return "";
	};

	md.block.ruler.before(
		"fence",
		"embed",
		(state, startLine, endLine, silent) => {
			const startPos = state.bMarks[startLine] + state.tShift[startLine];
			const maxPos = state.eMarks[startLine];
			const block = state.src.slice(startPos, maxPos);

			if (
				state.src.charCodeAt(startPos) !== 0x40 || // @
				state.src.charCodeAt(startPos + 1) !== 0x5b // [
			)
				return false;

			const match = embedRegex.exec(block);
			if (!match || match.length < 3) return false;

			const [_, service, src] = match;

			if (!silent) {
				const token = state.push("embed", "", 0) as ExToken;
				token.block = true;
				token.service = service;
				token.src = src;
				token.map = [startLine, endLine];
				state.line = startLine + 1;
			}

			return true;
		},
	);
};
