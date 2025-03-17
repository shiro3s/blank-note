<script setup lang="ts">
import NoteEmpty from "@/components/feature/note-empty/NoteEmpty.vue";
import NoteEditor from "@/components/feature/note-editor/NoteEditor.vue";
import { useEditNotePage } from "./useEditNotePage";
import VAlertDialog from "@/components/common/alert-dialog/VAlertDialog.vue";

const { handleSubmit, state, note, dialog } = useEditNotePage();
</script>

<template>
  <div v-if="state.loading"></div>

  <div v-else>
    <NoteEmpty v-if="state.error" />
    <NoteEditor
      v-else
      preview
      label="Save Changed"
      :title="note?.title"
      :content="note?.content"
      @submit="handleSubmit"
    />
    <VAlertDialog ref="dialog" />
  </div>

</template>

<style scoped>
</style>
