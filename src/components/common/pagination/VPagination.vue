<script setup lang="ts">
import { type Props, usePagination } from "./usePagination";
import { useRoute } from "vue-router";

const props = withDefaults(defineProps<Props>(), {
	perPageItem: 10,
	pagerCount: 7,
});

const route = useRoute();
const { pagers, pageCount, nextMore, prevMore } = usePagination(props);
</script>

<template>
  <div class="v-pagination" v-if="pageCount > 1">
    <ul class="v-pagination__list">
      <li>
        <router-link 
          :to="{query: {...route.query, page: 1}}"
          :class="[
            {
              'active-page': props.currentPage === 1
            }
          ]"
        >
          1
        </router-link>
      </li>

      <li v-if="prevMore">
        <span>...</span>
      </li>

      <li v-for="pager in pagers">
        <router-link 
          :to="{query: {...route.query, page: pager}}"
          :class="[
            {
              'active-page': props.currentPage === pager
            }
          ]"
        >
          {{ pager }}
        </router-link>
      </li>

      <li v-if="nextMore">
        <span>...</span>
      </li>

      <li>
        <router-link 
          :to="{query: {...route.query, page: pageCount}}"
          :class="[
            {
              'active-page': props.currentPage === pageCount
            }
          ]"
        >
          {{ pageCount }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.v-pagination {
  display: flex;
  justify-content: center;
}

.v-pagination__list {
  list-style: none;
  display: flex;
  gap: 6px;
  margin: 0;
  padding: 0;
}

.v-pagination__list a,
.v-pagination__list span {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
}

.v-pagination__list a {
  text-decoration: none;
  color: #606266;
}

.v-pagination__list a.active-page {
  color: var(--accent-color);
  pointer-events: none;
}
</style>
