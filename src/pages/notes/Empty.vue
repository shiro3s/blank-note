<script setup lang="ts"></script>

<template>
  <div class="notes-empty">
    <h1 class="notes-empty__head">No items</h1>

    <p class="notes-empty__msg">Let's create first 'Note'</p>

    <div class="notes-empty__img">
      <img src="/undraw_notes.svg" />
    </div>
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

.notes-empty__img {
  margin: 30px 0;
}

.notes-empty__img img {
  width: 100%;
  max-width: 816px;
  aspect-ratio: 16 / 9;
}
</style>
