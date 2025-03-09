<script setup lang="ts">
interface Props {
	iconSrc?: string;
	disabled?: boolean;
	theme?: "success" | "danger";
}
const { iconSrc, theme, disabled } = defineProps<Props>();
</script>

<template>
  <button 
    v-bind="$attrs" 
    :class="[
      'v-btn',
      theme ? `--${theme}` : ''
    ]"
    :disabled="disabled"
  >
    <template v-if="iconSrc">
      <img 
        :src="iconSrc" 
        class="v-btn__icon" 
        width="16px" 
        height="16px" 
      />
    </template>
    
    <slot />
  </button>
</template>

<style scoped>
.v-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  box-sizing: border-box;
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  font-weight: 500;
  user-select: none;
  appearance: none;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  background-color: #fff;
  color: #606266;
}

.v-btn:is(.--success) {
  background-color: #1aa71a;
  color: #fff;
  border-color: color-mix(in srgb, #1aa71a, black 10%);
}

.v-btn:is(.--danger) {
  color: #fff;
  background-color: #d34141;
  border-color: color-mix(in srgb, #d34141, black 10%);
}
</style>
