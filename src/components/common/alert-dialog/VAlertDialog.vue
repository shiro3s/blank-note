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
  <dialog ref="dialogRef" class="v-alert-dialog">
    <h1 class="v-alert-dialog__header" v-if="state.title">
      {{ state.title }}
    </h1>

    <div class="v-alert-dialog__body" v-html="state.message" />

    <div class="v-alert-dialog__footer">
      <VBtn 
        type="button" 
        theme="success"
        @click="closeDialog"
      >
        OK
      </VBtn>
    </div>
  </dialog>
</template>

<style scoped>
.v-alert-dialog {
  outline: none;
  border: 1px solid #ddd;
  width: min(80%, 360px);
  border-radius: 6px;
}

.v-alert-dialog__header {
  margin: 0;
  font-size: 16px;
  color: #606266;
  margin-bottom: 1rem;
}

.v-alert-dialog__body {
  color: #303133;
  font-size: 14px;
}

.v-alert-dialog__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>