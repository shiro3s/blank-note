<script setup lang="ts">
import VBtn from '@/components/common/btn/VBtn.vue';
import VEditor from '@/components/common/editor/VEditor.vue';
import VSwitch from '@/components/common/switch/VSwitch.vue';
import VTextInput from '@/components/common/text-input/VTextInput.vue';
</script>

<template>
  <div class="content">
    <div class="container">
      <div class="card">
        <VTextInput
          placeholder="Title"
          fluid
          borderless
        />

        <div class="divide" />

        <VEditor placeholder="Write in markdown" />
      </div>
    </div>

    <div class="sticky-top">
      <div class="sticky-content">
        <VSwitch label="Preview" />
        <VBtn>Create Note</VBtn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column-reverse;
}

.container {
  width: 100%;
  max-width: 816px;
  margin: 0 auto;
}

.sticky-top {
  top: 0;
  position: sticky;
  background-color: #fff;
}

.sticky-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  max-width: 816px;
  margin: 0 auto;
}

.card {
  box-shadow: 0 0 10px #ddd;
  padding: 2rem 20px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.divide {
  height: 1px;
  background-color: #60626666;
  margin: 30px 0;
}
</style>