<script setup>
import { ref } from 'vue';

const emit = defineEmits(['change']);

const props = defineProps({
  active: { type: String, default: '' },
  tabs: { type: Array, default: [] },
});

const isActive = ref(props.active);

const changeTab = (value) => {
  isActive.value = value;
  emit('change', value);
};
</script>

<template>
  <!-- .tab-panel start -->
  <div class="tab-panel">
    <!-- .tabs start -->
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab"
        :class="{ selected: tab.value == isActive }"
        @click="changeTab(tab.value)"
      >
        {{ tab.label }}
      </div>
    </div>
    <!-- .tabs end -->

    <!-- .tab-content start -->
    <div class="tab-content">
      <slot name="content" :active="isActive"></slot>
    </div>
    <!-- .tab-content end -->
  </div>
  <!-- .tab-panel end -->
</template>
