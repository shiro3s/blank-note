<script setup lang="ts">
import { useTrashNotesPage } from "./useTrashNotesPage";
import NoteCard from "@/components/feature/note-card/NoteCard.vue";
import NoteCardMenus from "@/components/feature/note-card-menu/NoteCardMenus.vue";
import VConfirmDialog from "@/components/common/confirm-dialog/VConfirmDialog.vue";
import Empty from "./Empty.vue";

const { notes, count, currentPage, dialog, state, restoreNote, handleOpenDialog } =
	useTrashNotesPage();
</script>

<template>
  <div v-if="state.loading"></div>

  <div class="trash-note-page" v-else>
    <Empty 
      v-if="count === 0" 
    />

    <div 
      v-else
      class="trash-note-page__items" 
    >
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
              {label: 'Restore', type: 'button', action: () => restoreNote(note.id)},
              {label: 'Delete', type: 'button', action: () => handleOpenDialog(note.id)}
            ]"
          />
        </template>
      </NoteCard>
    </div>

    <div class="trash-note-page__footer">
      <VPagination 
        :total-count="count" 
        :pager-count="4" 
        :current-page="currentPage" 
      />
    </div>
  </div>

  <VConfirmDialog ref="dialog" />
</template>

<style scoped>
.trash-note-page__items {
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

.trash-note-page__footer {
  margin-top: 40px;
}
</style>