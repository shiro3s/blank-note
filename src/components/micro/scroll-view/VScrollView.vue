<script setup lang="ts">
import { useScrollView, type Props } from "./useScrollView";

const props = defineProps<Props>();
const { scrollbarRef, containerRef, scrollable, handleScroll } =
	useScrollView(props);
</script>

<template>
  <div class="v-scroll-view">
    <div 
      ref="containerRef"
      class="v-scroll-view__container"
      :style="{
        height: `${height}px`
      }"
      @scroll="handleScroll"
    >
      <slot />
    </div>

    <div
      ref="scrollbarRef"
      class="v-scroll-view__bar" 
      v-show="scrollable"
    />
  </div>
</template>

<style scoped>
.v-scroll-view {
  overflow: hidden;
  position: relative;
}

.v-scroll-view__container {
  scrollbar-width: none;
  overflow: auto;
}

.v-scroll-view__bar {
  position: absolute;
  top: 0;
  right: 2px;
  width: 6px;
  background-color: #bcbcbc;
  border-radius: 6px; 
}
</style>
