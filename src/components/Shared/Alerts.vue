<script setup>
import { ref, computed } from 'vue';

// stores
import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const alerts = computed(() => {
  return alertStore.alerts;
});

const remove = (alert, index) => {
  if (!alert.deletable) return;
  alertStore.removeAlert(index);
};
</script>

<template>
  <!-- .alerts start -->
  <div v-if="alerts.length" class="alerts base">
    <!-- .alert start -->
    <div
      v-for="(alert, index) in alerts"
      :key="index"
      :class="alert.class"
      v-html="alert.text"
      class="alert"
      @click="remove(alert, index)"
    ></div>
    <!-- .alert end -->
  </div>
  <!-- .alerts end -->
</template>
