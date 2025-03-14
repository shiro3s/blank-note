import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/valibot";
import { object, string, pipe, nonEmpty, optional, required } from "valibot";

export type NoteValue = {
	title: string;
	content?: string;
};

export type EmitType = {
	submit: [value: NoteValue];
};

export type Props = {
	preview: boolean;
	title: string;
	content: string;
	label: string;
}

type State = {
	preview: boolean;
	title: string;
	content: string;
}

type Emits = (evt: "submit", value: NoteValue) => void;

export const useNoteEditor = (props: Omit<Props, "label">, emits: Emits) => {
	const preview = ref(props.preview);
	const { defineField, errors, handleSubmit, isSubmitting } = useForm({
		validationSchema: toTypedSchema(
			object({
				title: pipe(string(), nonEmpty("Title is required")),
				content: optional(string()),
			}),
		),
		initialValues: {
			title: props.title,
			content: props.content,
		},
	});

	const [title] = defineField("title");
	const [content] = defineField("content");

	const onSubmit = handleSubmit((values) => {
		emits("submit", values);
	});

	const setState = (state: State) => {
		content.value = state.content;
		title.value = state.title;
		preview.value = state.preview
	}

	return {
		title,
		content,
		preview,
		errors,
		isSubmitting,
		onSubmit,
		setState
	};
};
