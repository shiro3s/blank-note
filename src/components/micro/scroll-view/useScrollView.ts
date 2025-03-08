import { ref, onMounted } from "vue";

export interface Props {
	height: number;
}

export const useScrollView = (props: Props) => {
	const containerRef = ref<HTMLDivElement>();
	const scrollbarRef = ref<HTMLDivElement>();
	const scrollable = ref(false);

	const handleScroll = (e: Event) => {
		if (!containerRef.value || !scrollbarRef.value) return;
		if (!(e.target instanceof HTMLDivElement)) return;
		if (!scrollable.value) return;

		const { offsetHeight, scrollHeight, scrollTop } = containerRef.value;

		const offset = scrollTop * (offsetHeight / scrollHeight)
		scrollbarRef.value.style.transform = `translateY(${offset}px)`;
	};

	onMounted(() => {
		if (!scrollbarRef.value || !containerRef.value) return;

		const { offsetHeight, scrollHeight } = containerRef.value;
		const scrollbarHeight = (offsetHeight ** 2) / scrollHeight;

		if (scrollbarHeight < offsetHeight) {
			scrollbarRef.value.style.height = `${scrollbarHeight}px`;
			scrollable.value = true;
		}
	});

	return {
		containerRef,
		scrollbarRef,
    scrollable,
		handleScroll,
	};
};
