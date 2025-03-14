<script setup lang="ts">
import NoteEditor from '@/components/feature/note-editor/NoteEditor.vue';
import {useNewNotePage} from "./useNewNotePage"

const {handleSubmit} = useNewNotePage()
</script>

<template>
  <NoteEditor 
    @submit="handleSubmit"
    label="Create note"
  />
</template>

<style scoped>
</style>