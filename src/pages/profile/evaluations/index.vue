<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const title = useTitle(pageTitle('Puan ve Yorumlarım'));
</script>

<template>
  <Breadcrumb>
    <span>Profil</span>
    <strong>evaluations</strong>
  </Breadcrumb>

  <div class="container">evaluations SAYFASI</div>
</template>
