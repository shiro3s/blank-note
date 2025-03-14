<script setup lang="ts">
import VBtn from "@/components/common/btn/VBtn.vue";
import VEditor from "@/components/common/editor/VEditor.vue";
import VSwitch from "@/components/common/switch/VSwitch.vue";
import VTextInput from "@/components/common/text-input/VTextInput.vue";
import VMarkdown from "@/components/common/markdown/VMarkdown.vue";

import { useNoteEditor, type EmitType, type Props } from "./useNoteEditor";

const props = withDefaults(defineProps<Partial<Props>>(), {
	title: "",
	content: "",
	preview: false,
});
const emits = defineEmits<EmitType>();
const { content, title, preview, isSubmitting, errors, onSubmit, setState } =
	useNoteEditor(props, emits);

defineExpose({
	preview,
	content,
	title,
	setState,
});
</script>

<template>
  <form class="note-editor" @submit="onSubmit">
    <div class="note-editor__container">
      <div class="note-editor__card">
        <VTextInput
          placeholder="Title"
          fluid
          borderless
          v-model="title"
        />
        <div 
          v-if="errors.title" 
          class="note-editor__field-error"
        >
          {{ errors.title }}
        </div>

        <div class="note-editor__divide" />

        <VMarkdown 
          :text="content || ''" 
          v-if="preview" 
        />
        <VEditor 
          placeholder="Write in markdown" 
          v-model="content" 
          v-else 
        />
      </div>
    </div>

    <div class="note-editor__sticky-top">
      <div class="note-editor__sticky-content">
        <VSwitch label="Preview" v-model="preview" />
        <VBtn :disabled="isSubmitting">{{ label }}</VBtn>
      </div>
    </div>
  </form>
</template>

<style scoped>
.note-editor {
  display: flex;
  flex-direction: column-reverse;
}

.note-editor__container {
  width: 100%;
  max-width: 816px;
  margin: 0 auto;
}

.note-editor__field-error {
  padding: 0 11px;
  font-size: 12px;
  color: var(--error);
}

.note-editor__card {
  box-shadow: 0 0 10px #ddd;
  padding: 2rem 20px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.note-editor__divide {
  height: 1px;
  background-color: #60626666;
  margin: 30px 0;
}

.note-editor__sticky-top {
  top: 0;
  position: sticky;
  background-color: #fff;
}

.note-editor__sticky-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  max-width: 816px;
  margin: 0 auto;
}
</style>