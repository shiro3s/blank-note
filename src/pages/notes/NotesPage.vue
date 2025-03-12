<script setup lang="ts">
import { useNotePage } from "./useNotesPage";
import NoteCard from "@/components/feature/note-card/NoteCard.vue";

const { notes } = useNotePage();
</script>

<template>
  <div class="note-page">
    <div class="note-page__items">
      <NoteCard 
        v-for="note in notes" 
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :content="note.content"
        :createdat="note.createdat"
        :updatedat="note.updatedat"
      />
    </div>
  </div>
</template>

<style scoped>
.note-page__items {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(auto, 300px));
}
</style>