<script setup lang="ts">
import {watch, ref, onMounted, computed} from "vue"
const bite = 1000000
const estimate = ref<StorageEstimate>()

const storageCapacityUsed = computed(() => {
  if (!estimate.value || !estimate.value.usage) return 0
  const usage = estimate.value.usage / bite
  
  return Math.round(usage * 10) / 10
})

onMounted(async () => {
  estimate.value = await navigator.storage.estimate()
})

// watch(async () => await navigator.storage.estimate(), (v) => {
//   console.log(v)
// }, {immediate: true})
</script>

<template>
  <div>
    {{ storageCapacityUsed }}
  </div>
</template>
