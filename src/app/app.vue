<script setup lang="ts">
import { provide } from "vue";
import { usePgClient, PgInjectKey } from "@/composables/usePgClient";

provide(PgInjectKey, usePgClient());
</script>

<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --error: #e5534b;
  --sidebar-width: 180px;
  --desktop: 1136px;
}

html,
body {
  line-height: 1.5;
}
</style>

<style scoped>

</style>
