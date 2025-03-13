<script setup lang="ts">
import {ref} from "vue";
import VIcon from "@/components/micro/icon/VIcon.vue"

interface Menu {
  action?: () => void;
  path?: string;
  type: "link" | "button"
  label: string;
}

interface Props {
  menus: Menu[]
}

defineProps<Props>()

const expanded = ref(false);
const containerRef = ref<HTMLElement>()
const handleClick = () => {
  expanded.value = !expanded.value
}
const handleFocusout = () => {
  if (!containerRef.value?.matches(":focus-within")) expanded.value = false
}
</script>

<template>
  <div class="note-card-menu" ref="containerRef" @focusout="handleFocusout">
    <button type="button" class="note-card-menu__btn" @click="handleClick">
      <VIcon icon="MoreVert" />
    </button>

    <ul 
      class="note-card-menu__list" 
      v-if="expanded"
    >
      <li 
        v-for="menu in menus" 
        :key="menu.label"
      >
        <router-link 
          v-if="menu.type === 'link' && menu.path"
          :to="menu.path" 
        >
          {{ menu.label }}
        </router-link>

        <button 
          v-else 
          type="button" 
          @click="menu.action"
        >
          {{ menu.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.note-card-menu {
  position: relative;
}

.note-card-menu__btn {
  width: 36px;
  height: 36px;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 50%;
  background: none;
  outline: none;
  cursor: pointer;
  z-index: 1;
}

.note-card-menu__btn:hover {
  background-color: #ddd;
}

.note-card-menu__list {
  position: absolute;
  right: 0;
  background-color: #fff;
  list-style: none;
  width: 72px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 8px 0;
  margin: 0;
  box-shadow: 0 0 5px #dcdcdc;
}

.note-card-menu__list a {
  display: block;
  text-decoration: none;
  padding: 0 8px;
  color: #606266;
  text-align: left;
}

.note-card-menu__list button {
  width: 100%;
  height: 24px;
  outline: none;
  background: none;
  border: none;
  padding: 0 8px;
  color: #606266;
  box-sizing: border-box;
  text-align: left;
  cursor: pointer;
}

.note-card-menu__list a:hover,
.note-card-menu__list button:hover {
  background-color: #ddd;
}
</style>