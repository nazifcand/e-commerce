<script setup>
import { ref, watch, computed, onMounted } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {},
  value: {},
});

const checkboxInput = ref(null);
const innerModelValue = ref(props.modelValue);
const innerValue = ref(props.value);
const isChecked = ref(false);
const error = ref(null);

onMounted(() => {
  isChecked.value = checkboxInput.value.checked;
});

const changeHandler = (event) => {
  isChecked.value = event.target.checked;
};

const invalidHandler = (event) => {
  event.target.focus();
  error.value = event.target.validationMessage;
};

watch(innerModelValue, (val) => emit('update:modelValue', val));
watch(
  () => props.modelValue,
  (val) => (innerModelValue.value = val)
);
watch(
  () => props.value,
  (val) => (innerValue.value = val)
);
</script>

<template>
  <input
    ref="checkboxInput"
    type="checkbox"
    class="hide"
    v-model="innerModelValue"
    :value="innerValue"
    :id="`checkbox-${innerValue}`"
    @invalid.prevent="invalidHandler"
    @change="changeHandler"
    v-bind="$attrs"
  />
  <label
    :for="`checkbox-${innerValue}`"
    class="checkbox"
    :class="{ checked: isChecked }"
  >
    <!-- .error-icon start -->
    <div v-if="error" class="error-icon">
      <i class="fal fa-exclamation-circle"></i>
      <p>{{ error }}</p>
    </div>
    <!-- .error-icon end -->

    <div class="box">
      <i class="far fa-check"></i>
    </div>

    <span>
      <slot></slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@import '@@/variables';

.checkbox {
  .error-icon {
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;

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
      background-color: $danger;
      text-align: center;
      line-height: 1.35;
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

  span {
    line-height: 1.4;
  }
}
</style>
