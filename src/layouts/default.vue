<script setup>
import { ref, watch, onMounted } from 'vue';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

const checkMobile = () => {
  mainStore.mobile.containerWidth = window.innerWidth - 30;
  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
  mainStore.mobile.isMobile = isMobileDevice;
};

watch(
  () => mainStore.isLoading,
  (val) => {
    const body = document.querySelector('body');
    if (val) {
      body.classList.add('hide-scroll');
      return;
    }
    body.classList.remove('hide-scroll');
  }
);
</script>

<template>
  <Header />

  <ConfirmModal />

  <!-- #preloader start -->
  <teleport to="body">
    <div v-if="mainStore.isLoading" id="preloader">
      <div class="dot"></div>
    </div>
  </teleport>
  <!-- #preloader end -->

  <!-- #main-content start -->
  <div id="main-content">
    <router-view></router-view>
  </div>
  <!-- #main-content end -->

  <Footer />
</template>

<style lang="scss" scoped>
@import '@@/variables';

#preloader {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .dot {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: rgba($main-color, 0.1);
    position: relative;

    &:before {
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border: 1px solid transparent;
      position: absolute;
      animation: loading 2s infinite linear;
      box-sizing: border-box;
    }
  }
}

@keyframes loading {
  0% {
    transform: scale(0);
    background-color: rgba($main-color, 0.5);
  }

  100% {
    transform: scale(2.5);
    background-color: rgba($main-color, 0);
  }
}
</style>
