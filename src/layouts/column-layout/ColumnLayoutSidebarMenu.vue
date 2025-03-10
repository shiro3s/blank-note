<script setup lang="ts">
import VIcon from "@/components/micro/icon/VIcon.vue";
import type { Menu } from "./menus";

defineProps<Menu>();
</script>

<template>
  <router-link :to="path" class="column-layout-sidebar-menu" exact-active-class="active">
    <VIcon :icon="icon" />
    <span>{{ name }}</span>
  </router-link>
</template>

<style scoped>
.column-layout-sidebar-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  text-decoration: none;
  padding: 4px 0;
  border-radius: 6px;
  box-sizing: border-box;
}

.column-layout-sidebar-menu:hover {
  background-color: #cccccc66;
}

.column-layout-sidebar-menu :deep(.v-icon) {
  width: 24px;
  height: 24px;
  color: #606266;
}

.column-layout-sidebar-menu span {
  color: #606266;
  font-size: 16px;
  font-weight: 500;
}


.column-layout-sidebar-menu:is(.active) span {
  color: #42b883 !important;
}
</style>
