<script setup>
import { ref } from 'vue';
</script>

<template>
  <!-- #breadcrumb start -->
  <div class="container">
    <div id="breadcrumb">
      <router-link to="/">Anasayfa</router-link>
      <slot />
    </div>
  </div>
  <!-- #breadcrumb end -->
</template>
