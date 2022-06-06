<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: { type: String, default: null },
});
</script>

<template>
  <!-- .widget start -->
  <div class="widget">
    <!-- .widget-title start -->
    <div v-if="title" class="widget-title">
      <h5>{{ title }}</h5>
    </div>
    <!-- .widget-title end -->

    <!-- .widget-content start -->
    <div class="widget-content">
      <slot />
    </div>

    <!-- .widget-content end -->
  </div>
  <!-- .widget end -->
</template>
