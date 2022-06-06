<script setup>
import { ref } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
});
</script>

<template>
  <div class="question">
    <i class="far fa-info-circle"></i>
    <p class="question-text">{{ text }}</p>
  </div>
</template>

<style lang="scss">
@import '@@/variables';

.question {
  position: relative;
  display: inline-block;
  margin-left: 5px;
  cursor: help;

  &:hover {
    .question-text {
      display: block;
    }
  }

  .question-text {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    z-index: 50;
    width: max-content;
    padding: 0.75rem 1rem;
    line-height: 1.5;
    border-radius: 0.3rem;
    box-sizing: border-box;
    transform: translateX(-50%);
    background-color: $dark;
    color: #fff;
    filter: drop-shadow(0 0 10px rgba(#777, 0.25));
    font-size: 0.65rem;
    font-weight: 400;
    text-align: center;
    max-width: 250px;
    display: none;
    z-index: 2;

    &:before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 8px 0 8px;
      border-color: $dark transparent transparent transparent;
    }
  }
}
</style>
