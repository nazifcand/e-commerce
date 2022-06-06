<script setup>
const props = defineProps({
  loading: { type: Boolean, default: false },
  type: { type: String, default: 'primary dark' },
  title: { type: String, default: 'Yeni ekle' },
});
</script>

<template>
  <button v-bind="$attrs" class="btn" :class="type" :disabled="loading">
    {{ title }}
    <i
      v-if="loading"
      class="fad fa-spinner-third spin"
      style="margin-left: 0.5rem"
    ></i>
  </button>
</template>
