<script setup lang="ts">
import { useNotePage } from "./useNotePage";
// import VMarkdown from "@/components/common/markdown/VMarkdown.vue";
import NoteDetail from "@/components/feature/note-detail/NoteDetail.vue";

const { note, loading } = useNotePage();
console.log(note.value?.content);
</script>

<template>
  <div class="note-page">
    <div class="" v-if="loading"></div>

    <div class="" v-else>
      <NoteDetail
        v-if="note"
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