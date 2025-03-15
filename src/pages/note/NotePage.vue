<script setup lang="ts">
import { useNotePage } from "./useNotePage";

import NoteEmpty from "@/components/feature/note-empty/NoteEmpty.vue"
import NoteDetail from "@/components/feature/note-detail/NoteDetail.vue";

const { note, state } = useNotePage();
console.log(note.value?.content);
</script>

<template>
  <div class="note-page">
    <div class="" v-if="state.loading"></div>

    <div class="" v-else>
      <NoteEmpty v-if="state.error || !note" />
      <NoteDetail
        v-else
        :title="note.title"
        :content="note.content"
        :createdat="note.createdat"
        :updatedat="note.updatedat"
      />
    </div>
  </div>
</template>

<style scoped>
</style>