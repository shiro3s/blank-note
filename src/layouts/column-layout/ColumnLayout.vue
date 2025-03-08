<script setup lang="ts">
import ColumnLayoutSidebar from "./ColumnLayoutSidebar.vue"
</script>

<template>
  <div class="column-layout">
    <ColumnLayoutSidebar />
    <main class="column-layout__main">
      <section class="column-layout__section">
        <router-view />
      </section>
    </main>
  </div>
</template>

<style scoped>
.column-layout__main {
  padding-left: 48px;
}

.column-layout__section {
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
