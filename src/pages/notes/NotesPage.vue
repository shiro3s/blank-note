<script setup lang="ts">
import { useNotesPage } from "./useNotesPage";
import NoteCard from "@/components/feature/note-card/NoteCard.vue";
import NoteCardMenus from "@/components/feature/note-card-menu/NoteCardMenus.vue";
import VPagination from "@/components/common/pagination/VPagination.vue";
import Empty from "./Empty.vue"

const { notes, count, currentPage, state, handleTrash } = useNotesPage();
</script>

<template>
  <div v-if="state.loading"></div>

  <div class="note-page" v-else>
    <Empty v-if="count === 0" />

    <div class="note-page__items" v-else>
      <NoteCard 
        v-for="note in notes" 
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :content="note.content"
        :createdat="note.createdat"
        :updatedat="note.updatedat"
      >
        <template #menu>
          <NoteCardMenus 
            :menus="[
              {label: 'Edit', type: 'link', path: `/notes/edit/${note.id}`},
              {label: 'Trash', type: 'button', action: () => handleTrash(note.id)}
            ]"
          />
        </template>
      </NoteCard>
    </div>

    <div class="note-page__footer">
      <VPagination 
        :total-count="count" 
        :pager-count="4" 
        :current-page="currentPage" 
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
    grid-template-columns: minmax(248px, 1fr);
  }
}

.note-page__footer {
  margin-top: 40px;
}
</style>