<script setup lang="ts">
interface Props {
	href: string;
	iconSrc?: string;
	theme?: "success" | "danger";
}
const { href, iconSrc, theme } = defineProps<Props>();
</script>

<template>
  <router-link 
    :to="href" 
    :class="[
      'v-anchor-btn',
      theme ? `--${theme}` : ''
    ]"
  >
    <template v-if="iconSrc">
      <img 
        :src="iconSrc" 
        class="v-anchor-btn__icon"
         width="16px" 
         height="16px" 
      />
    </template>
    <slot />
  </router-link>
</template>

<style scoped>
.v-anchor-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  padding: 8px 15px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 14px;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 500;
  background-color: #fff;
  color: #606266;
  white-space: nowrap;
}

.v-anchor-btn__icon {
  margin-right: 3px;
}

.v-anchor-btn:is(.--success) {
  background-color: #1aa71a;
  color: #fff;
  border-color: color-mix(in srgb, #1aa71a, black 10%);
}

.v-anchor-btn:is(.--danger) {
  color: #fff;
  background-color: #d34141;
  border-color: color-mix(in srgb, #d34141, black 10%);
}

</style>
