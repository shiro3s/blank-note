type Args = {
	currentPage: number;
	pageCount: number;
	pagerCount: number;
	prevMore: boolean;
	nextMore: boolean;
};

export const calcPager = (args: Args) => {
	const { currentPage, pageCount, pagerCount, prevMore, nextMore } = args;
	const pager: number[] = [];

	if (prevMore && !nextMore) {
		const start = pageCount - (pagerCount - 2);
		for (let i = start; i < pageCount; i++) pager.push(i);
		return pager;
	}

	if (!prevMore && nextMore) {
		for (let i = 2; i < pagerCount; i++) pager.push(i);
		return pager;
	}

	if (prevMore && nextMore) {
		const offset = Math.floor(pagerCount / 2) - 1;
		for (let i = currentPage - offset; i <= currentPage + offset; i++)
			pager.push(i);
		return pager;
	}

	for (let i = 2; i < pageCount; i++) pager.push(i);
	return pager;
};
