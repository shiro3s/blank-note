<script setup lang="ts">
import { menus } from "./menus";
import ColumnLayoutSidebarMenu from "./ColumnLayoutSidebarMenu.vue";
// import CalumnLayoutCapacity from "./CalumnLayoutCapacity.vue";
</script>

<template>
  <aside class="column-layout-sidebar">
    <ul class="column-layout-sidebar__list">
      <li v-for="menu in menus" :key="menu.name">
        <ColumnLayoutSidebarMenu :icon="menu.icon" :path="menu.path" :name="menu.name"  />
      </li>
    </ul>

    <!-- <CalumnLayoutCapacity /> -->
  </aside>
</template>

<style scoped>
.column-layout-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  box-sizing: border-box;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
  padding: 32px 8px;

  @media screen and (max-width: 820px) {
    width: var(--sidebar-min-width);
  }
}

.column-layout-sidebar__list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
