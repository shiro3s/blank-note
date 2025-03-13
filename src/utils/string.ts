export const strToNum = (str?: string) => {
	if (!str) return 0;

	const num = Number.parseInt(str, 10);
	if (Number.isNaN(num)) return 0;

	return num;
};
