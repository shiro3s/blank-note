export interface Props {
	modelValue?: string | number;
	minlength?: number;
	maxlength?: number;
	tabindex?: number;
	disabled?: boolean;
	readonly?: boolean;
	autofocus?: boolean;
	fluid?: boolean
	borderless?: boolean;
	id?: string;
	autocomplete?: string;
	placeholder?: string;
	prefixIconUrl?: string;
	suffixIconUrl?: string;
	type?: "text" | "search" | "url";
	size?: "large"
}

export type EmitType = {
	"update:modelValue": [value: string];
	input: [value: string];
	change: [value: string];
};

type Emits = ((evt: "update:modelValue", value: string) => void) &
	((evt: "input", value: string) => void) &
	((evt: "change", value: string) => void);

export const useTextInput = (props: Props, emits: Emits) => {
	const handleInput = (event: Event) => {
		if (!(event.target instanceof HTMLInputElement)) return;

		const value = event.target.value;

		emits("update:modelValue", value);
		emits("input", value);
	};

	const handleChange = (event: Event) => {
		if (!(event.target instanceof HTMLInputElement)) return;

		const value = event.target.value;
		emits("change", value);
	};

	return { handleInput, handleChange };
};
