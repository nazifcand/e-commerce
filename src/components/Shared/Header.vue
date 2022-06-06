<script setup>
import { ref } from 'vue';

import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();
</script>

<template>
  <!-- #header start -->
  <div id="header">
    <!-- #header-top start -->
    <div id="header-top">
      <div class="container">
        <Logo />

        <Searchbar />

        <Actions />
      </div>
    </div>
    <!-- #header-top end -->

    <!-- #header-bottom start -->
    <div id="header-bottom">
      <Navigator />
    </div>
    <!-- #header-bottom end -->
  </div>
  <!-- #header end -->

  <!-- mobile search start -->
  <div v-if="mainStore.mobile.isMobile" class="container">
    <Searchbar class="mobile" />
  </div>
  <!-- mobile search end -->

  <MobileNavigator v-if="mainStore.mobile.isMobile" />
</template>
