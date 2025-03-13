<script setup lang="ts">
import { watch, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { megaBite, STORAGE_CAPACITY } from "@/constants/bite";
import VIcon from "@/components/micro/icon/VIcon.vue";

const estimate = ref<StorageEstimate>();
const route = useRoute();

const storageCapacityUsed = computed(() => {
	if (!estimate.value || !estimate.value.usage) return 0;
	const usage = estimate.value.usage / megaBite;

	return Math.round(usage * 10) / 10;
});

const storageAlert = computed(() => {
	if (!storageCapacityUsed.value) return "";

	if (storageCapacityUsed.value > STORAGE_CAPACITY.DANGER.MEGA)
		return "--danger";

	if (storageCapacityUsed.value > STORAGE_CAPACITY.WARNING.MEGA)
		return "--warning";

	return "";
});

watch(
	() => route.path,
	async () => {
		estimate.value = await navigator.storage.estimate();
	},
);

onMounted(async () => {
	estimate.value = await navigator.storage.estimate();
});
</script>

<template>
  <div class="column-layout-capacity">
    <div class="column-layout-capacity__divide" />
    <button type="button" class="column-layout-capacity__btn">
      <VIcon icon="Storage" />
      <span>Storage</span>

      <div
        v-if="storageAlert"
        :class="[
          'column-layout-capacity__alert',
          storageAlert
        ]" 
      />
    </button>
  </div>
</template>

<style scoped>
.column-layout-capacity__divide {
  height: 1px;
  background-color: #ddd;
  margin: 40px 0 10px;
}

.column-layout-capacity__btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 4px;
}

.column-layout-capacity__btn:hover {
  background-color: #cccccc66;
}

.column-layout-capacity__alert {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
  bottom: 10px;
  left: 17px;
}

.column-layout-capacity__alert:is(.--danger) {
  background-color: var(--error);
}

.column-layout-capacity__alert:is(.--warning) {
  background-color: var(--warning);
}

.column-layout-capacity :deep(.v-icon) {
  width: 24px;
  height: 24px;
  color: #606266;
}

.column-layout-capacity span {
  color: #606266;
  font-size: 16px;
  font-weight: 500;

  @media screen and (max-width: 820px) {
    display: none;
  }
}
</style>