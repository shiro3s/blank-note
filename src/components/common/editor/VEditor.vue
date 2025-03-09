<script setup lang="ts">
import { useEditor, type Props, type EmitType } from "./useEditor";

const props = withDefaults(defineProps<Props>(), {
	modelValue: "",
});
const emits = defineEmits<EmitType>();

const { parentElm } = useEditor(props, emits);
</script>

<template>
	<div 
		ref="parentElm" 
		class="v-editor"
		id="v-editor"
	/>
</template>
