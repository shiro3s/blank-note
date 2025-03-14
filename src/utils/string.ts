export const strToNum = (str?: string) => {
	if (!str) return 0;

	const num = Number.parseInt(str, 10);
	if (Number.isNaN(num)) return 0;

	return num;
};

export const getBite = (str?: string) => {
	if (!str) return 0;

	const blob = new Blob([str], { type: "text/plain" });
	return blob.size;
};
