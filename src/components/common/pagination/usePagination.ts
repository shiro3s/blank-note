import { computed, ref, watchEffect } from "vue";
import { calcPager } from "./calcPager";

export interface Props {
	// total item count
	totalCount: number;
	// item count per page
	perPageItem?: number;
	// number of pagers
	pagerCount?: number;
	// current page number
	currentPage?: number;
	disabled?: boolean;
  // paginationUrl: (i: number) => number;
}

export const usePagination = (props: Props) => {
	const pagerCount = props.pagerCount || 7;
	const currentPage = computed(() => props.currentPage || 1);
	const perPageItem = props.perPageItem || 10;

	const pageCount = computed(() => {
		return Math.max(1, Math.ceil(props.totalCount / perPageItem));
	});

	const prevMore = ref(false);
	const nextMore = ref(false);

	const pagers = computed(() => {
		const halfPageCount = (pagerCount - 1) / 2;

		if (pageCount.value > pagerCount) {
			if (currentPage.value > pagerCount - halfPageCount) prevMore.value = true;
			if (currentPage.value < pageCount.value - halfPageCount) nextMore.value = true;
		}

		return calcPager({
			pageCount: pageCount.value,
			pagerCount: pagerCount,
			currentPage: currentPage.value,
			prevMore: prevMore.value,
			nextMore: nextMore.value,
		});
	});


	watchEffect(() => {
		const halfPageCount = (pagerCount -1) / 2;
		prevMore.value = false
		nextMore.value = false;

		if (pageCount.value > pagerCount) {
			if (currentPage.value > pagerCount - halfPageCount) prevMore.value = true
			if (currentPage.value < pageCount.value - halfPageCount) nextMore.value = true;
		}
	})

	return {
		pagers,
		pageCount,
    prevMore,
    nextMore
	};
};
