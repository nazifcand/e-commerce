<script setup>
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  options: { type: Array, default: [] },
  modelValue: {},
  disabled: { type: Boolean, default: false },
  creatable: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const refOptions = ref(null);
const search = ref('');

const selectOption = (option) => {
  emit('update:modelValue', option.value);
  search.value = '';
  isOpen.value = false;
};

const createNew = () => {
  emit('update:modelValue', search.value);
  props.options.push({
    value: search.value,
    label: search.value,
  });
  search.value = '';
  isOpen.value = false;
};

const getValue = computed(() => {
  return props.options.filter((item) => item.value == props.modelValue)[0]
    ?.label;
});

const filteredOptions = computed(() => {
  const regex = new RegExp(search.value, 'ig');
  return props.options.filter((i) => i.label.match(regex));
});

onClickOutside(refOptions, () => (isOpen.value = false));
</script>

<template>
  <div
    class="select"
    :class="{ open: isOpen && options.length && !disabled }"
    v-bind="$attrs"
  >
    <div class="input-container" @click="isOpen = !isOpen">
      <i class="fad fa-chevron-down arrow-icon"></i>
      <Input
        v-model="getValue"
        v-bind="$attrs"
        type="text"
        @keydown.prevent
        @keypress.prevent
        :disabled="disabled"
      />
    </div>
    <div class="options" ref="refOptions">
      <!-- search start -->
      <div class="option search">
        <Input v-model="search" placeholder="ara.." />
      </div>
      <!-- search end -->

      <!-- .option start -->
      <div
        v-for="(option, index) in filteredOptions"
        :key="index"
        :class="{ selected: modelValue == option.value }"
        class="option"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
      <!-- .option end -->

      <!-- create new start -->
      <div
        v-if="!filteredOptions.length && creatable"
        class="option"
        @click="createNew"
      >
        {{ search }}
        <span class="label info">Yeni oluşturulacak</span>
      </div>
      <!-- create new end -->
    </div>
  </div>
</template>
