<script setup lang="ts">
import type { Props, EmitType } from "./useTextInput";
import { useTextInput } from "./useTextInput";

const props = withDefaults(defineProps<Props>(), {
	type: "text",
	autocomplete: "off",
});
const emits = defineEmits<EmitType>();

const { handleInput, handleChange } = useTextInput(props, emits);
</script>

<template>
  <div 
    :class="[
      'v-text-input',
      size ? `--${size}` : '',
      fluid ? `--fluid` : '',
      borderless ? '--borderless' : ''
    ]"
  >
    <div class="v-text-input__container">
      <template v-if="props.prefixIconUrl">
        <img 
          :src="props.prefixIconUrl" 
          class="v-text-input__prefix-icon"
          width="16px"
          height="16px"
        />
      </template>

      <input 
        class="v-text-input__main"
        :id="props.id"
        :value="props.modelValue"
        :minlength="props.minlength"
        :maxlength="props.maxlength"
        :type="props.type"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :autofocus="props.autofocus"
        :autocomplete="props.autocomplete"
        :placeholder="props.placeholder"
        :tabindex="props.tabindex"
        @input="handleInput"
        @change="handleChange"
      />

      <template v-if="props.suffixIconUrl">
        <img 
          :src="props.suffixIconUrl" 
          class="v-text-input__suffix-icon"
          width="16px"
          height="16px"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.v-text-input {
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
}

.v-text-input__container {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 11px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  cursor: text;
  box-shadow: 0 0 0 1px #dcdcdc;
}

.v-text-input__container:hover {
  box-shadow: 0 0 0 1px #c0c4cc;
}

.v-text-input__prefix-icon {
  margin-right: 3px;
}

.v-text-input__suffix-icon {
  margin-left: 3px;
}

.v-text-input__main {
  width: 100%;
  height: 30px;
  padding: 0;
  outline: none;
  border: none;
  appearance: none;
  background: none;
  box-sizing: border-box;
  color: #606266;
}

.v-text-input:is(.--fluid) {
  width: 100%;
}

.v-text-input:is(.--borderless) .v-text-input__container {
  box-shadow: none;
}

.v-text-input:is(.--borderless) .v-text-input__container:hover {
  box-shadow: none;
}

.v-text-input:is(.--large) .v-text-input__main {
  height: 42px;
  font-size: 18px;
}

.v-text-input__main::placeholder {
  color: #606266;
}
</style>
