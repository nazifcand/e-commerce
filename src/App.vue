<script setup>
import { ref } from 'vue';

// services
import customRequest from '@/services/base.service';
import request from 'axios';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

(async () => {
  mainStore.isLoading = true;

  const { fetchSettingsData, fetchSettingsError } = await request
    .get(`${customRequest.defaults.baseURL}/settings/`)
    .then((result) => ({ fetchSettingsData: result.data }))
    .catch((err) => ({ fetchSettingsError: err.response }));

  mainStore.isLoading = false;
  mainStore.settings = fetchSettingsData;
})();
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@@/main';
</style>
