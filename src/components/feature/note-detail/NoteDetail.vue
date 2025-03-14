<script setup lang="ts">
import type {Note} from "@/types/apps";
import VMarkdown from "@/components/common/markdown/VMarkdown.vue";
import { format } from "@/utils/date";

type Props = Omit<Note, "id" | "isdeleted">;
defineProps<Props>()
</script>

<template>
  <div class="note-detail">
    <div class="note-detail__card">
      <div class="note-detail__head">
        <h1 class="note-detail__title">{{ title }}</h1>

        <div class="note-detail__date">
          <div v-if="createdat">Creation Date: {{ format(createdat) }}</div>
          <div v-if="updatedat">Update Date: {{ format(updatedat) }}</div>
        </div>
      </div>
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

.note-detail__date {
  font-size: 12px;
  color: #606266;
  text-align: right;
}

.note-detail__title {
  font-size: 24px;
  margin: 0;
  color: #606266;
}
</style>
