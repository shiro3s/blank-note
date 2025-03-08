<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  label?: string
}

defineProps<Props>()
const emits = defineEmits<{
  "update:modelValue": [value: boolean]
  "changed": [value: boolean]
}>();

const handleChange = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement)) return;

  const value = event.target.checked
  emits("update:modelValue", value)
  emits("changed", value)
}
</script>

<template>
  <div class="v-switch">
    <label 
      class="v-switch__toggle"
      :data-label="label"
    >
      <input 
        type="checkbox" 
        :checked="modelValue"
        @change="handleChange"
      />
    </label>
  </div>
</template>

<style scoped>
.v-switch {
  display: inline-flex;
}

.v-switch__toggle {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 60px;
  height: 20px;
  background-color: #ddd;
  border-radius: 30px;
}

.v-switch__toggle::before {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  content: "";
  transition: transform 0.4s ease; 
  box-shadow: 0 0 0 1px #dcdcdc;
}

.v-switch__toggle::after {
  content: attr(data-label);
  position: absolute;
  left: 68px;
  top: 0;
  font-size: 14px;
  color: #606266;
}

.v-switch__toggle:has(:checked) {
  background-color: #222;
}

.v-switch__toggle:has(:checked)::before {
  transform: translateX(40px)
}

.v-switch__toggle input[type="checkbox"] {
  display: none;
}

.v-switch__label {
  font-size: 14px;
  color: #606266;
}
</style>
