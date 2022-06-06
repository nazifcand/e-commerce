<script setup>
import { onMounted, ref } from 'vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const navs = ref([
  { label: 'Üyelik Bilgileri', value: '' },
  { label: 'Mağaza Bilgileri', value: 'company' },
  { label: 'Şifre Değiştir', value: 'change-password' },
  { label: 'Adreslerim', value: 'addresses' },
]);
</script>

<template>
  <Breadcrumb>
    <span>Profil</span>
    <strong>Ayarlarım</strong>
  </Breadcrumb>

  <div class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #sidebar start -->
      <div id="sidebar">
        <!-- .inner-nav start -->
        <div class="inner-nav base">
          <!-- .inner-nav-item start -->
          <router-link
            v-for="(nav, index) in navs"
            :key="index"
            :to="`/profile/settings/${nav.value}`"
            class="inner-nav-item"
          >
            {{ nav.label }}
          </router-link>
          <!-- .inner-nav-item end -->
        </div>
        <!-- .inner-nav end -->
      </div>
      <!-- #sidebar end -->

      <!-- #content start -->
      <div id="content">
        <router-view />
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>
