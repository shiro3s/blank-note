<script setup lang="ts">
import NoteEditor from "@/components/feature/note-editor/NoteEditor.vue";
import { useEditNotePage } from "./useEditNotePage";

const { handleSubmit, state, note } = useEditNotePage();
</script>

<template>
  <div v-if="state.loading"></div>

  <div v-else>
    <div v-if="state.error">404</div>
    <NoteEditor
      v-else
      preview
      label="Save Changed"
      :title="note?.title"
      :content="note?.content"
      @submit="handleSubmit"
    />
  </div>

</template>

<style scoped>
</style>
