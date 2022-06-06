<script setup>
import { computed, ref } from 'vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const props = defineProps({
  column: { type: Object, required: true },
});

const sort = () => {
  const { ordering } = route.query;
  const { sortable, field } = props.column;
  const query = { ...route.query };

  if (!sortable) return;

  if (ordering != sortable || ordering != `-${sortable}`) {
    query['ordering'] = sortable;
  }

  if (ordering == sortable) {
    query['ordering'] = `-${sortable}`;
  }

  if (ordering == `-${sortable}`) {
    query['ordering'] = sortable;
  }

  router.push({
    query,
  });
};

const isSorting = computed(() => {
  const { query } = route;
  const { sortable } = props.column;

  if (!query.ordering) {
    return false;
  }

  return query?.ordering == sortable || query?.ordering == `-${sortable}`
    ? true
    : false;
});

const isSortingAsc = computed(() => {
  const { query } = route;
  const { sortable } = props.column;
  return query?.ordering == sortable ? true : false;
});

const isSortingDesc = computed(() => {
  const { query } = route;
  const { sortable } = props.column;
  return query?.ordering == `-${sortable}` ? true : false;
});
</script>

<template>
  <div
    class="cell"
    :class="{
      [`cell-${column.type}`]: true,
      sortable: column.sortable,
      'is-sorting': isSorting,
    }"
    @click="sort"
  >
    <span>{{ column.title }}</span>
    <i
      v-if="column.sortable && !isSortingDesc && !isSortingAsc"
      class="fas fa-sort"
    ></i>
    <i v-if="column.sortable && isSortingDesc" class="fas fa-sort-down"></i>
    <i v-if="column.sortable && isSortingAsc" class="fas fa-sort-up"></i>
  </div>
</template>
