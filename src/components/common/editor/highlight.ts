import { tags } from "@lezer/highlight";
import { HighlightStyle } from "@codemirror/language";

export const highlight = HighlightStyle.define([
	{ tag: tags.strong, fontWeight: "bold" },
	{ tag: tags.emphasis, fontStyle: "italic" },
	{ tag: tags.url, textDecoration: "underline", color: "#0000ff" },
	{ tag: tags.strikethrough, textDecoration: "line-through" },
	{ tag: tags.keyword, color: "#770088" },
	{ tag: [tags.string], color: "#a11" },
	{ tag: [tags.bool], color: "#164" },
	{ tag: [tags.typeName], color: "#085" },
	{
		tag: [tags.function(tags.variableName), tags.function(tags.propertyName)],
		color: "#3535e7",
	},
	{ tag: tags.comment, color: "#999" },
]);
