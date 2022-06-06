<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {},
});

const value = ref(props.modelValue);
const error = ref(null);

const inputInvalidHandler = (event) => {
  error.value = event.target.validationMessage;
};

const inputFocusHandler = () => {
  error.value = null;
};

watch(value, (val) => emit('update:modelValue', val));

watch(
  () => props.modelValue,
  (val) => (value.value = val)
);
</script>

<template>
  <div class="textarea">
    <textarea
      v-bind="$attrs"
      v-model="value"
      @invalid.prevent="inputInvalidHandler"
      @focus="inputFocusHandler"
      :class="{ error }"
    ></textarea>

    <!-- .error-icon start -->
    <transition name="error">
      <div v-if="error" class="error-icon">
        <i class="fal fa-exclamation-circle"></i>
        <p>{{ error }}</p>
      </div>
    </transition>
    <!-- .error-icon end -->
  </div>
</template>

<style lang="scss" scoped>
@import '@@/variables';

.textarea {
  width: 100%;
  position: relative;

  .error-icon {
    position: absolute;
    right: 10px;
    top: 12px;

    &:hover {
      p {
        display: inline;
      }
    }

    .fa-exclamation-circle {
      color: $danger;
    }

    p {
      max-width: 250px;
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      padding: 10px;
      width: max-content;
      font-size: 0.75rem;
      z-index: 2;
      background-color: $danger;
      color: #fff;
      border-radius: 0.35rem;
      box-sizing: border-box;
      display: none;

      &::before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent $danger transparent;
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .error {
    border-color: rgba($danger, 0.4);
    box-shadow: 0 0 0 4px rgba($danger, 0.2);
  }
}
</style>
