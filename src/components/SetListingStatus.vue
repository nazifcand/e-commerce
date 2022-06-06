<script setup>
import { ref, watch, computed } from 'vue';
import { getListingStatus } from '@/utils/kinds';

const props = defineProps({
  modelValue: { type: String, default: 'offline' },
});

const emit = defineEmits(['update:modelValue', 'changed']);

const status = ref(props.modelValue);

const toggleStatus = () => {
  if (status.value == 'waiting' || status.value == 'waiting_image') return;

  status.value = status.value == 'online' ? 'offline' : 'online';
  emit('update:modelValue', status.value);
  emit('changed');
};

const statusLabel = computed(() => {
  return getListingStatus(status.value).label;
});

watch(
  () => props.modelValue,
  (val) => (status.value = val)
);
</script>

<template>
  <div class="toggle-container">
    <div
      class="toggle"
      :class="{
        selected: status == 'online',
        waiting: status == 'waiting' || status == 'waiting_image',
      }"
      @click="toggleStatus"
    ></div>
    <p>{{ statusLabel }}</p>
  </div>
</template>

<style lang="scss" scoped>
@import '@@/variables';

.toggle-container {
  display: flex;
  flex-direction: column;
  max-width: 52px;
  align-items: center;

  .toggle {
    width: 52px;
    height: 32px;
    border-radius: 26px;
    background-color: #ccc;
    position: relative;
    cursor: pointer;
    transition: 0.3s all ease;

    &:before {
      content: '';
      width: 26px;
      height: 26px;
      background-color: #fff;
      position: absolute;
      top: 3px;
      left: 3px;
      border-radius: 100%;
      transition: 0.3s all ease;
    }

    &.selected {
      background: $main-color;

      &:before {
        left: 23px;
      }
    }

    &.waiting {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  p {
    width: 100%;
    font-size: 0.5rem;
    margin: 5px 0 0;
    line-height: 1;
    text-align: center;
  }
}
</style>
