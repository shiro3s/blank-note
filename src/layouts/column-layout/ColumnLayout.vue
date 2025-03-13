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
  padding-left: var(--sidebar-width);
  
  @media screen and (max-width: 820px) {
    padding-left: var(--sidebar-min-width);
  }
}

.column-layout__section {
  padding: 2rem 12px;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
