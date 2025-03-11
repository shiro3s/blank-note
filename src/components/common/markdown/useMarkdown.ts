import { computed, onMounted, onUnmounted, ref } from "vue";
import mdItSup from "markdown-it-sup";
import mdItSub from "markdown-it-sub";
import mdItMark from "markdown-it-mark";
import mdItFootnote from "markdown-it-footnote";
import mdItAttrs from "markdown-it-attrs";
import mdItAsync from "markdown-it-async";

import { container } from "./container";
import { link } from "./link";
import { customHighlight } from "./highlight";

export interface Props {
	text: string;
}

export const useMarkdown = (props: Props) => {
	const textRef = ref("");
	const containerElmRef = ref<HTMLDivElement>();

	const md = mdItAsync({
		html: false,
		xhtmlOut: false,
		breaks: true,
		linkify: true,
		typographer: true,
		highlight: customHighlight,
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
		.use(link);

	const compileMarkdown = computed(() => {
		return textRef.value;
	});

	const handleClick = (event: Event) => {
		const el = event.target as HTMLElement;
		const timeoutIdMap: WeakMap<HTMLElement, number> = new WeakMap();

		if (el.matches("button[class='code-block__clipboard-btn']")) {
			const textContent =
				el.parentElement?.querySelector("pre")?.textContent || "";
			const text = textContent.replace(/^ *(\$|>) /gm, "").trim();

			navigator.clipboard.writeText(text).then(() => {
				el.classList.add("copied");
				clearTimeout(timeoutIdMap.get(el));
				const timeoutId = window.setTimeout(() => {
					el.classList.remove("copied");
				}, 2000);
				timeoutIdMap.set(el, timeoutId);
			});
		}
	};

	onMounted(async () => {
		textRef.value = await md.renderAsync(props.text);
		containerElmRef.value?.addEventListener("click", handleClick);
	});

	onUnmounted(() => {
		containerElmRef.value?.removeEventListener("click", handleClick);
	});

	return {
		compileMarkdown,
		containerElmRef,
	};
};
