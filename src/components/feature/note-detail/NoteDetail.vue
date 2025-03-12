<script setup lang="ts">
import type {Note} from "@/types/apps";
import VMarkdown from "@/components/common/markdown/VMarkdown.vue";

type Props = Omit<Note, "id" | "isdeleted">;
defineProps<Props>()
</script>

<template>
  <div class="note-detail">
    <div class="note-detail__card">
      <h1 class="note-detail__title">{{ title }}</h1>
      <VMarkdown :text="content || ''" />
    </div>

  </div>
</template>

<style scoped>
.note-detail {
  width: 100%;
  max-width: 816px;
  margin: 0 auto;
}

.note-detail__card {
  box-shadow: 0 0 10px #ddd;
  padding: 2rem 20px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.note-detail__title {
  font-size: 24px;
  margin: 0 0 20px;
  color: #606266;
}
</style>
