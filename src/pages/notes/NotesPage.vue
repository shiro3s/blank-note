<script setup lang="ts">
import { useNotesPage } from "./useNotesPage";
import NoteCard from "@/components/feature/note-card/NoteCard.vue";

const { notes } = useNotesPage();
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
  grid-template-columns: repeat(3, minmax(300px, 1fr));

  @media screen and (max-width: 1136px) {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }

  @media screen and (max-width: 820px) {
    grid-template-columns: none;
  }
}
</style>