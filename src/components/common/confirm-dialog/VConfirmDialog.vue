<script setup lang="ts">
import { ref, reactive } from "vue";
import VBtn from "@/components/common/btn/VBtn.vue"

interface Props {
	title?: string;
	message?: string;
}

const props = defineProps<Props>();
const state = reactive({
	title: props.title || "",
	message: props.message || "",
	onSuccess: () => {}
});

const dialogRef = ref<HTMLDialogElement>();
const openDialog = ({
	title,
	message,
	onSuccess
}: {
	title?: string;
	message?: string;
	onSuccess?: () => void;
} = {}) => {
	if (title) state.title = title;
	if (message) state.message = message;
	if (onSuccess) state.onSuccess = onSuccess

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
		<h1 
			class="v-confirm-dialog__header" 
			v-if="state.title"
		>
      {{ state.title }}
    </h1>
		<div 
			class="v-confirm-dialog__body" 
			v-html="state.message" 
		/>

		<div class="v-confirm-dialog__footer">
			<VBtn type="button" @click="closeDialog">
        Cancel
      </VBtn>

			<VBtn 
        type="button" 
        theme="success"
        @click="state.onSuccess"
      >
        OK
      </VBtn>
		</div>
  </dialog>
</template>

<style scoped>
.v-confirm-dialog {
  outline: none;
  border: 1px solid #ddd;
  width: min(80%, 360px);
  border-radius: 6px;
}

.v-confirm-dialog__header {
  margin: 0;
  font-size: 16px;
  color: #606266;
  margin-bottom: 1rem;
}

.v-confirm-dialog__body {
	color: #303133;
  font-size: 14px;
}

.v-confirm-dialog__footer {
  display: flex;
	align-items: center;
  justify-content: center;
	gap: 20px;
  margin-top: 16px;
}
</style>