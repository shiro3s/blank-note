<script setup lang="ts">
import VAnchorBtn from "@/components/common/anchor-btn/VAnchorBtn.vue";
import { useHomePage } from "./useHomePage";

const { handleClick } = useHomePage();
</script>

<template>
  <div class="home-page">
    <div class="hero">
      <div class="section">
        <h1 class="heading">
          <span class="name clip">Blank</span>
          <span class="text">Simple note</span>
        </h1>
      </div>

      <div class="action">
        <VAnchorBtn 
          href="/notes" 
          @click="handleClick"
        >
          Getting Started
        </VAnchorBtn>
      </div>
    </div>
  </div>
</template>

<style scoped>

.home-page {
  max-width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 15rem 20px 48px;
}

.heading {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.name,
.text {
  line-height: 64px;
  font-size: 56px;
  color: #606266;

  @media screen and (max-width: 820px) {
    font-size: 32px;
    line-height: 40px;
  }
}

.clip {
  color: transparent;
  background-clip: text !important;
  -webkit-background-clip: text;
  background: -webkit-linear-gradient(120deg, #fff 30%, #42b883);
}

.action {
  margin-top: 50px;
}

.action .v-anchor-btn {
  height: 40px;
  border-radius: 25px;
  padding: 12px 20px;
  color: #fff;
  background-color: #42b883;
  border: 1px solid #3aad7a;
}

.action .v-anchor-btn:hover {
  background-color: #4ac28c;
}
</style>