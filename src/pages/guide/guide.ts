export const CUSTOM_CONTAINER = {
	INPUT:
		"```" +
		`
::: info
This is an info box.
:::

::: tip
THIS is an tip.
:::

::: warning
THIS is a warning.
:::

::: danger
This is a danger.
:::

::: details
This is a details block.
:::
  ` +
		"```",
	OUTPUT_INFO: `
  ::: info
  This is an info box.
  :::
  `,
	OUTPUT_TIP: `
  ::: tip
  This is a tip.
  :::
  `,
	OUTPUT_WARNING: `
  ::: warning
  This is a warning.
  :::
  `,
	OUTPUT_DANGER: `
  ::: danger
  This is a danger.
  :::
  `,
	OUTPUT_DETAILS: `
  ::: details
  This is a detail block.
  :::
  `,
	INPUT_TITLE:
		"```" +
		`
::: tip Memo
Make note of it appropriately.
:::
  ` +
		"```",
	OUTPUT_TITLE: `
  ::: tip Memo
  Make note of it appropriately.
  :::
  `,
};

export const FOCUS_CODE = {
	INPUT:
		"````\n" +
		"```js" +
		`
export const test = (a, b) => {
  console.log(a + b); // [!code focus]
}
` +
		"```\n" +
		"````",
	OUTPUT:
		"```js" +
		`
export const test = (a, b) => {
  console.log(a + b); // [!code focus]
}
` +
		"```",
};

export const DIFF_CODE = {
	INPUT:
		"````\n" +
		"```js" +
		`
export const test = (a, b) => {
  console.log(a + b); // [!code --]
  return a + b; [!code ++]
}
  ` +
		"```\n" +
		"````",
	OUTPUT:
		"```js" +
		`
export const test = (a, b) => {
  console.log(a + b); // [!code --]
  return a + b; // [!code ++]
}
  ` +
		"```",
};
