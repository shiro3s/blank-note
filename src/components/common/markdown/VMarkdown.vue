<script setup lang="ts">
import { type Props, useMarkdown } from "./useMarkdown";

const props = withDefaults(defineProps<Props>(), {
	text: "",
});

const { compileMarkdown } = useMarkdown(props);
</script>

<template>
  <div 
    class="v-markdown" 
    v-html="compileMarkdown"
  />
</template>

<style scoped>
.v-markdown {
  padding: 16px 0;
  box-sizing: border-box;
  min-height: 460px;
}

.v-markdown :deep(*) {
  font-family: "monospace";
  color: #303133;
  font-size: 16px;
  line-height: 1.5;

  @media screen and (max-width: 768px) {
    font-size: 14px
  }
}

.v-markdown :deep(h1),
.v-markdown :deep(h2),
.v-markdown :deep(h3),
.v-markdown :deep(h4),
.v-markdown :deep(h5),
.v-markdown :deep(h6) {
  font-weight: 500;
  line-height: 1.1;
  color: #606266;
}

.v-markdown :deep(h1) {
  margin: 20px 0 10px;
  font-size: 36px;
}

.v-markdown :deep(h2) {
  margin-top: 20px 0 10px;
  font-size: 30px;
}

.v-markdown :deep(h3) {
  margin: 20px 0 10px;
  font-size: 24px;
}

.v-markdown :deep(h4) {
  margin: 10px 0;
  font-size: 18px;
}

.v-markdown :deep(h5) {
  margin: 10px 0;
  font-size: 14px;
}

.v-markdown :deep(h6) {
  margin: 10px 0;
  font-size: 12px;
}

.v-markdown :deep(p) {
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 10px;
  word-break: break-word;
}

.v-markdown :deep(code) {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}

.v-markdown :deep(.code-block) {
  margin-bottom: 16px;
}

.v-markdown :deep(.code-block-title span) {
  display: inline-block;
  padding: 4px 20px;
  background-color: color-mix(in srgb, #272822, #fff 15%);
  color: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.v-markdown :deep(pre) {
  display: block;
  padding: 9.5px;
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
  border-radius: 4px;
  overflow-x: auto;
}

.v-markdown :deep(pre::-webkit-scrollbar) {
  height: 8px;
}

.v-markdown :deep(.code-block pre) {
  border-top-left-radius: 0;
}

.v-markdown :deep(pre code) {
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
  border-radius: 0;
}

.v-markdown :deep(pre code span) {
  color: unset;
}

.v-markdown :deep(hr) {
  margin: 30px 0;
  border: 0;
  border-top: 1px solid #eee;
  box-sizing: content-box;
}

.v-markdown :deep(ul),
.v-markdown :deep(ol) {
  margin: 0 0 10px
}

.v-markdown :deep(ul ul),
.v-markdown :deep(ol ul),
.v-markdown :deep(ul ol),
.v-markdown :deep(ol ol) {
  margin-bottom: 0;
}

.v-markdown :deep(table) {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  border-spacing: 0;
  border-collapse: collapse;
}

.v-markdown :deep(table > thead > tr > th),
.v-markdown :deep(table > tbody > tr > th),
.v-markdown :deep(table > tfoot > tr > th),
.v-markdown :deep(table > thead > tr > td),
.v-markdown :deep(table > tbody > tr > td),
.v-markdown :deep(table > tfoot > tr > td) {
  padding: 8px;
  line-height: 1.4;
  vertical-align: top;
  border-top: 1px solid #ddd
}

.v-markdown :deep(table > caption + thead > tr:first-child > th),
.v-markdown :deep(table > colgroup + thead > tr:first-child > th),
.v-markdown :deep(table > thead:first-child > tr:first-child > th),
.v-markdown :deep(table > caption + thead > tr:first-child > td),
.v-markdown :deep(table > colgroup + thead > tr:first-child > td),
.v-markdown :deep(table > thead:first-child > tr:first-child > td) {
  border-top: 0;
}

.v-markdown :deep(table > thead > tr > th) {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd; 
}

.v-markdown :deep(td)
.v-markdown :deep(th) {
  padding: 0;
}

.v-markdown :deep(th) {
  text-align: left;
}

.v-markdown :deep(a) {
  color: var(--accent-color);
  text-decoration: none;
}

.v-markdown :deep(img) {
  max-width: 100%;
}

.v-markdown :deep(.custom-block) {
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-sizing: border-box;
}

.v-markdown :deep(.custom-block-title) {
  font-weight: 600;
}

.v-markdown :deep(.custom-block:is(.info)) {
  background-color: #8e96aa24;
}

.v-markdown :deep(.custom-block:is(.tip)) {
  background-color: #646cff24;
}

.v-markdown :deep(.custom-block:is(.warning)) {
  background-color: #eab30824;
}

.v-markdown :deep(.custom-block:is(.danger)) {
  background-color: #f43f5e24;
}

.v-markdown :deep(.custom-block:is(.details)) {
  background-color: #8e96aa24;
}

.v-markdown :deep(.custom-block:is(.details) summary) {
  margin-bottom: 10px;
  font-weight: 700;
}

.v-markdown :deep(.embed-block) {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 400px;
}

.v-markdown :deep(.embed-block iframe) {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 1.5rem 0;
}

.v-markdown :deep(blockquote) {
  border-left: 5px solid #eee;
  font-size: 17.5px;
  margin: 0 0 20px;
  padding: 10px 20px;
}

.v-markdown :deep(*:first-child) {
  margin-top: 0;
}

.v-markdown :deep(*:last-child) {
  margin-bottom: 0;
}
</style>
