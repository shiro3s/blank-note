<script setup lang="ts">
</script>

<template>
  <div class="notes-empty">
    <h1 class="notes-empty__head">No items</h1>

    <p class="notes-empty__msg">Only items delete from 'Notes' show here</p>
  </div>
</template>

<style scoped>
.notes-empty {
  padding-top: 10vh;
  max-width: 816px;
  margin: 0 auto;
}

.notes-empty__head {
  margin: 0;
  font-size: 32px;
  color: #606266;
}

.notes-empty__msg {
  color: #303133;
}
</style>
