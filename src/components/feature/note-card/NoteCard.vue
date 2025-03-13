<script setup lang="ts">
import type { Note } from "@/types/apps";
import {format} from "@/utils/date"

type Props = Omit<Note, "isdeleted">
defineProps<Props>();
</script>

<template>
  <div class="note-card">
    <RouterLink :to="`/notes/${id}`" class="note-card__link" />
    <div class="note-card__header">
      <h2 class="note-card__title">
        {{ title }}
      </h2>

      <slot name="menu" />
    </div>

    <div class="note-card__body">
      {{ content }}
    </div>

    <div class="note-card__footer">
      <div class="note-card__date">{{ format(updatedat || createdat) }}</div>
    </div>
  </div>
</template>

<style scoped>
.note-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  box-sizing: border-box;
  text-decoration: none;
}

.note-card:hover {
  border-color: #ccc;
  box-shadow: 0 0 10px #ddd;
}

.note-card__link {
  position: absolute;
  inset: 0;
}

.note-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem;
}

.note-card__title {
  margin: 0;
  font-size: 24px;
  color: #606266;
}

.note-card__body {
  min-height: 50px;
  color: #303133;
  font-size: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.note-card__footer {
  margin-top: 12px;
}

.note-card__date {
  color: #303133;
  font-size: 12px;
}
</style>