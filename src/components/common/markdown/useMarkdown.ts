import { computed, nextTick, onMounted, ref } from "vue";
import mdItSup from "markdown-it-sup";
import mdItSub from "markdown-it-sub";
import mdItMark from "markdown-it-mark";
import mdItFootnote from "markdown-it-footnote";
import mdItAttrs from "markdown-it-attrs";
import mdItAsync from "markdown-it-async";

import { container } from "./container";
import { link } from "./link";
import { embed } from "./embed";
import {customHighlight} from "./highlight"

export interface Props {
	text: string;
}

export const useMarkdown = (props: Props) => {
	const textRef = ref("");
	const md = mdItAsync({
		html: false,
		xhtmlOut: false,
		breaks: true,
		linkify: true,
		typographer: true,
		highlight: customHighlight
	})
		.use(mdItSup)
		.use(mdItSub)
		.use(mdItMark)
		.use(mdItFootnote)
		.use(mdItAttrs, {
			allowedAttributes: ["class"],
		})
		.use(container, "info")
		.use(container, "tip")
		.use(container, "warning")
		.use(container, "danger")
		.use(container, "details")
		.use(link)
		.use(embed)

	const compileMarkdown = computed(() => {
		return textRef.value;
	});

	onMounted(async () => {
		textRef.value = await md.renderAsync(props.text);
	});

	return {
		compileMarkdown,
	};
};
