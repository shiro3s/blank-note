<script setup lang="ts">
import { ref, reactive } from "vue";

interface Props {
	title?: string;
	message?: string;
}

const props = defineProps<Props>();
const state = reactive({
	title: props.title || "",
	message: props.message || "",
});

const dialogRef = ref<HTMLDialogElement>();
const openDialog = ({
	title,
	message,
}: {
	title?: string;
	message?: string;
} = {}) => {
	if (title) state.title = title;
	if (message) state.message = message;

	dialogRef.value?.showModal();
};

const closeDialog = () => {
	dialogRef.value?.close();
};

defineExpose({
	openDialog,
	closeDialog,
});
</script>

<template>
  <dialog ref="dialogRef" class="v-confirm-dialog">
  </dialog>
</template>

<style scoped>
.v-confirm-dialog {
  outline: none;
  border: 1px solid #ddd;
  width: min(80%, 360px);
  border-radius: 6px;
}
</style>