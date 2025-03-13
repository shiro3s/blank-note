<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import type {Icon} from "./type"

const props = defineProps<{ icon: Icon }>();
const dynamicIcon = defineAsyncComponent(() => {
	switch (props.icon) {
		case "Add":
			return import("./Add.vue");
		case "Copy":
			return import("./Copy.vue");
		case "List":
			return import("./List.vue");
		case "MoreVert":
			return import("./MoreVert.vue");
		case "NoteStack":
			return import("./NoteStack.vue");
		case "Storage":
			return import("./Storage.vue");
		case "Trash":
			return import("./Trash.vue");
	}
});
</script>


<template>
  <i class="v-icon" v-bind="$attrs">
    <component :is="dynamicIcon" />
  </i>
</template>

<style scoped>
.v-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1em;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
