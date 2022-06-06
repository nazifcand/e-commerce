<script setup>
import { ref } from 'vue';

const props = defineProps({
  steps: { type: Array, default: [] },
});

const currentStep = ref(0);

const back = () => {
  if (currentStep.value == 0) return;
  --currentStep.value;
};
const next = () => {
  if (currentStep.value == props.steps.length - 1) return;
  ++currentStep.value;
};
</script>

<template>
  <!-- .stepper start -->
  <div class="stepper">
    <!-- .stepper-header start -->
    <div class="stepper-header">
      <!-- .line start -->
      <div class="line"></div>
      <!-- .line end -->

      <!-- .step start -->
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step"
        :class="{ done: index < currentStep, here: index == currentStep }"
      >
        <i v-if="index < currentStep" class="far fa-check"></i>
        <span v-else>{{ index + 1 }}</span>
        <div class="text">{{ step.label }}</div>
      </div>
      <!-- .step end -->
    </div>
    <!-- .stepper-header end -->

    <!-- .stepper-content start -->
    <div class="stepper-content">
      <slot
        name="content"
        :step="steps[currentStep].value"
        :next="next"
        :back="back"
      />
    </div>
    <!-- .stepper-content end -->

    <!-- .stepper-footer start -->
    <!-- <div class="stepper-footer">
      <button class="btn" @click="back">Geri</button>
      <button class="btn primary dark" @click="next">İleri</button>
    </div> -->
    <!-- .stepper-footer end -->
  </div>
  <!-- .stepper end -->
</template>

<style lang="scss" scoped>
@import '@@/variables';

.stepper {
  width: 100%;
  box-sizing: border-box;

  .stepper-header {
    width: 100%;
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .line {
      width: 100%;
      height: 1px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background-color: $grey;
      z-index: 1;
      border-radius: 0.35rem;

      .l {
        height: 3px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background-color: $main-color;
        z-index: 2;
      }
    }

    .step {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $grey;
      color: $text-light;
      font-size: 0.85rem;
      z-index: 3;
      border: 3px solid #fff;
      box-sizing: border-box;
      position: relative;
      transition: 0.35s all ease;

      &.here {
        transform: scale(1.25);
        background-color: $main-color;
        color: #fff;
      }

      &.done {
        background-color: $success;
        color: #fff;
      }

      .text {
        width: max-content;
        max-width: 250px;
        position: absolute;
        top: calc(100% + 15px);
        font-size: 0.85rem;
        left: 50%;
        transform: translateX(-50%);
        color: $text;
      }
    }
  }

  .stepper-content {
    margin: 4rem 0 2rem;
  }

  .stepper-footer {
    .btn {
      &.primary {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
