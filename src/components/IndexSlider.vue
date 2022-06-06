<script setup>
import { onMounted, ref, computed } from 'vue';
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const sliders = ref({
  results: [
    {
      url: '#',
      image:
        'https://images.unsplash.com/photo-1654515681623-65c0dc3d0b8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=400&q=75',
    },
    {
      url: '#',
      image:
        'https://images.unsplash.com/photo-1631882383610-879456475533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=75&w=1920&h=400',
    },
    {
      url: '#',
      image:
        'https://images.unsplash.com/photo-1653730002578-82e4e31414aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=75&w=1920&h=400',
    },
  ],
});
const counter = ref(0);
const duration = ref(3500);
let repeater = null;

const back = () => {
  if (counter.value > 0) {
    --counter.value;
    return;
  }
};

const next = () => {
  if (counter.value < sliders.value.results.length - 1) {
    counter.value++;
    return;
  }
  counter.value = 0;
};

const mouseOverHandler = () => {
  clearInterval(repeater);
};

const mouseLeaveHandler = () => {
  repeater = setInterval(next, duration.value);
};

onMounted(() => {
  repeater = setInterval(next, duration.value);
});
</script>

<template>
  <!-- #index-slider start -->
  <div
    id="index-slider"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <!-- #back start -->
    <div id="back" @click="back"><i class="fal fa-chevron-left"></i></div>
    <!-- #back end -->

    <!-- #next start -->
    <div id="next" @click="next"><i class="fal fa-chevron-right"></i></div>
    <!-- #next end -->

    <!-- #slider start -->
    <div
      id="slider"
      :style="`left:-${mainStore.mobile.containerWidth * counter}px`"
    >
      <!-- .slider-item start -->
      <a
        class="slider-item"
        v-for="(slider, index) in sliders.results"
        :key="index"
        :style="`background-image:url(${slider.image});width:${mainStore.mobile.containerWidth}px`"
        :href="slider.url"
        target="_blank"
      ></a>
      <!-- .slider-item end -->
    </div>
    <!-- #slider end -->
  </div>
  <!-- #index-slider end -->
</template>
