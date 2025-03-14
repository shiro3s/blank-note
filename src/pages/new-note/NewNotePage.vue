<script setup lang="ts">
import NoteEditor from '@/components/feature/note-editor/NoteEditor.vue';

import {useNewNotePage} from "./useNewNotePage"
import VAlertDialog from '@/components/common/alert-dialog/VAlertDialog.vue';

const {handleSubmit, dialog} = useNewNotePage()
</script>

<template>
  <NoteEditor 
    @submit="handleSubmit"
    label="Create note"
  />
  <VAlertDialog ref="dialog" />
</template>

<style scoped>
</style>