<script setup>
import { ref } from 'vue';

const props = defineProps({
  seller: { type: Object, required: true },
});
</script>

<template>
  <Widget class="seller-widget">
    <!-- .seller-info start -->
    <div class="seller-info">
      <i class="fad fa-store icon"></i>
      <router-link :to="`/seller/${seller.id}`">{{
        seller.name || seller.short_name
      }}</router-link>
    </div>
    <!-- .seller-info end -->

    <!-- .info start -->
    <div class="info">
      <strong>Satıcı Notu</strong>
      <p :class="{ 'not-found-text': !seller.seller_note }">
        {{ seller.seller_note || 'Satıcı notu girilmemiş' }}
      </p>
    </div>
    <!-- .info end -->
  </Widget>
</template>
