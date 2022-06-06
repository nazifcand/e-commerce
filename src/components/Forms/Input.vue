<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {},
  mask: {},
});

const value = ref(props.modelValue);
const error = ref(null);

const invalidHandler = (event) => {
  event.target.focus();
  error.value = event.target.validationMessage;
};

const focusHandler = () => {
  error.value = null;
};

watch(value, (val) => emit('update:modelValue', val));

watch(
  () => props.modelValue,
  (val) => (value.value = val)
);
</script>

<template>
  <input
    type="text"
    class="input"
    v-model="value"
    v-bind="$attrs"
    @invalid.prevent="invalidHandler"
    @focus="focusHandler"
    :class="{ error }"
    autocomplete="false"
    v-maska="mask"
  />

  <!-- .error-text start -->
  <div v-if="error" class="error-text">
    <p>{{ error }}</p>
  </div>
  <!-- .error-text end -->
</template>

<style lang="scss" scoped>
@import '@@/variables';

.error-text {
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: $danger;
}

.input {
  width: 100%;
  position: relative;

  &.error {
    border-color: rgba($danger, 0.4);
    box-shadow: 0 0 0 4px rgba($danger, 0.2);
  }
}
</style>
