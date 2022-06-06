<script setup>
import { ref } from 'vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
</script>

<template>
  <Breadcrumb>
    <strong>Profil</strong>
  </Breadcrumb>

  <div class="container">Mesaj detay sayfasi</div>
</template>
