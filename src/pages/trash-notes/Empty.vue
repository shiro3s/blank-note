<script setup lang="ts">
</script>

<template>
  <div class="trash-note-empty">
    <h1 class="trash-note-empty__head">No items</h1>

    <p class="trash-note-empty__msg">Only items delete from 'Notes' show here</p>

    <div class="trash-note-empty__img">
      <img src="/undraw_cleanup.svg" />
    </div>
  </div>
</template>

<style scoped>
.trash-note-empty {
  padding-top: 10vh;
  max-width: 816px;
  margin: 0 auto;
}

.trash-note-empty__head {
  margin: 0;
  font-size: 32px;
  color: #606266;
}

.trash-note-empty__msg {
  color: #303133;
}

.trash-note-empty__img {
  margin: 30px 0;
}

.trash-note-empty__img img {
  width: 100%;
  max-width: 816px;
  aspect-ratio: 16 / 9;
}
</style>
