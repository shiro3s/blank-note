import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/valibot";
import { object, string, pipe, nonEmpty, optional, required } from "valibot";

type NoteValue = {
	title: string;
	content?: string;
};

export type EmitType = {
	submit: [value: NoteValue];
};

type Emits = (evt: "submit", value: NoteValue) => void;

export const useNoteEditor = (emits: Emits) => {
	const preview = ref(false);
	const { defineField, errors, handleSubmit, isSubmitting } = useForm({
		validationSchema: toTypedSchema(
			object({
				title: pipe(string(), nonEmpty("Title is required")),
				content: optional(string()),
			}),
		),
		initialValues: {
			title: "",
			content: "",
		},
	});

	const [title] = defineField("title");
	const [content] = defineField("content");

	const onSubmit = handleSubmit((values) => {
		console.log(values);
		emits("submit", values);
	});

	return {
		title,
		content,
		preview,
		errors,
		isSubmitting,
		onSubmit,
	};
};
