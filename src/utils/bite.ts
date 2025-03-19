import { megaBite } from "@/constants/bite";

export const toMegaBite = (bite?: number) => {
	if (!bite) return 0;

	const m = bite / megaBite;
	return Math.round(m * 10) / 10;
};

export const getBite = (str?: string) => {
	if (!str) return 0;

	const blob = new Blob([str], { type: "text/plain" });
	return blob.size;
};
