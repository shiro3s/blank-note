export const strToNum = (str?: string) => {
	if (!str) return 0;

	const num = Number.parseInt(str, 10);
	if (Number.isNaN(num)) return 0;

	return num;
};

export const strToBool = (str?: string) => {
	switch (str) {
		case "true":
			return true
		case "false":
			return false
	}

	return false
}
