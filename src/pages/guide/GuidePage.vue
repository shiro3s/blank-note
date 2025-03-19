<script setup lang="ts">
// FIXME: markdownを読み込むように変更する
import VMarkdown from "@/components/common/markdown/VMarkdown.vue";
import { CUSTOM_CONTAINER, FOCUS_CODE, DIFF_CODE } from "./guide";
</script>

<template>
  <div class="guide-page">
    <h1 class="head1">How to write</h1>
    <p class="paragraph">'Blank' comes with built in Markdown Extensions.</p>

    <h2 class="head2">Custom Containers</h2>
    <p class="paragraph">Custom containers can be defined by their types, titles, and contents.</p>

    <p class="paragraph"><strong>Input</strong></p>

    <VMarkdown :text="CUSTOM_CONTAINER.INPUT" />

    <p class="paragraph"><strong>Output</strong></p>

    <VMarkdown :text="CUSTOM_CONTAINER.OUTPUT_INFO" />
    <VMarkdown :text="CUSTOM_CONTAINER.OUTPUT_TIP" />
    <VMarkdown :text="CUSTOM_CONTAINER.OUTPUT_WARNING" />
    <VMarkdown :text="CUSTOM_CONTAINER.OUTPUT_DANGER" />
    <VMarkdown :text="CUSTOM_CONTAINER.OUTPUT_DETAILS" />

    <h3 class="head3">Custom Title</h3>

    <p class="paragraph">You may set custom title by appending the text right after the "type" of the container.</p>

    <p class="paragraph"><strong>Input</strong></p>

    <VMarkdown :text="CUSTOM_CONTAINER.INPUT_TITLE" />

    <p class="paragraph"><strong>Output</strong></p>

    <VMarkdown :text="CUSTOM_CONTAINER.OUTPUT_TITLE" />

    <h2 class="head2">Focus in Code Blocks</h2>

    <p class="paragraph">
      Adding the <code>// [!code focus]</code> comment on a line will focus it and blur the other parts of the code.
    </p>

    <p class="paragraph">
      Additionally, you can define a number of lines to focus using <code>// [!code focus:&lt;lines&gt;]</code>.
    </p>

    <p class="paragraph"><strong>Input</strong></p>
    <VMarkdown :text="FOCUS_CODE.INPUT" />

    <p class="paragraph"><strong>Output</strong></p>
    <VMarkdown :text="FOCUS_CODE.OUTPUT" />
    
    <h2 class="head2">Colored Diffs in Code Blocks</h2>

    <p class="paragraph">
      Adding the <code>// [!code --]</code> or <code>// [!code ++]</code> comments on a line will create a diff of that line, while keeping the colors of the codeblock.
    </p>

    <p class="paragraph"><strong>Input</strong></p>
    <VMarkdown :text="DIFF_CODE.INPUT" />

    <p class="paragraph"><strong>Output</strong></p>
    <VMarkdown :text="DIFF_CODE.OUTPUT" />
  </div>
</template>

<style scoped>
.guide-page {
  max-width: 816px;
  margin: 0 auto;
}

.head1 {
  margin: 0;
  color: #606266;
  font-size: 28px;
}

.head2 {
  margin: 48px 0 16px;
  padding-top: 24px;
  border-top: 1px solid #e2e2e3;
  font-size: 24px;
  color: #606266;
}

.head3 {
  margin: 32px 0 0;
  color: #606266;
  font-size: 20px;
}

.paragraph {
  color: #303133;
}

.paragraph:has(strong) {
  font-size: 18px;
  color: #606266;
  margin: 8px;
}

.paragraph code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}
</style>