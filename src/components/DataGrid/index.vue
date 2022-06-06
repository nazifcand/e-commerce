<script setup>
import { ref } from 'vue';

const props = defineProps({
  columns: { type: Array, required: true },
});
</script>

<template>
  <!-- .data-grid start -->
  <div class="data-grid">
    <!-- .row.title start -->
    <div class="row title">
      <!-- .cell start -->
      <template v-for="(column, index) in columns" :key="index">
        <DataGrid-Title :column="column" />
      </template>

      <!-- .cell end -->
    </div>
    <!-- .row.title end -->

    <!-- rows start -->
    <slot />
    <!-- rows end -->
  </div>
  <!-- .data-grid end -->
</template>
