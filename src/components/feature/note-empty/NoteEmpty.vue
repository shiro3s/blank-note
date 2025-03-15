<script setup lang="ts"></script>

<template>
  <div class="note-empty">
    <h1 class="note-empty__head">Not Found</h1>

    <p class="note-empty__msg">The page you are looking for may be temporarily inaccessible, moved or deleted.</p>
  </div>
</template>

<style scoped>
.note-empty {
  padding-top: 15vh;
  max-width: 816px;
  margin: 0 auto;
}

.note-empty__head {
  margin: 0;
  font-size: 32px;
  color: #606266;
}

.note-empty__msg {
  color: #303133;
}
</style>