<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

const status = ref(props.modelValue);

const toggleStatus = () => {
  if (props.disabled) return;
  status.value = !status.value;
  emit('update:modelValue', status.value);
};

const statusLabel = computed(() => {
  return status.value ? 'Aktif' : 'Pasif';
});

watch(
  () => props.modelValue,
  (val) => (status.value = val)
);
</script>

<template>
  <div class="switch-container">
    <div
      class="switch"
      :class="{
        selected: status,
      }"
      @click="toggleStatus"
    ></div>
  </div>
</template>
