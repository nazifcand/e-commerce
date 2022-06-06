<script setup>
import { ref } from 'vue';

const props = defineProps({
  product: { type: Object, required: true },
});
</script>

<template>
  <!-- .widget start -->
  <Widget class="product-widget">
    <!-- .name start -->
    <div class="name">
      <h5>{{ product.name }}</h5>
      <span>{{ product.parent_name }}</span>
    </div>
    <!-- .name end -->

    <!-- .image start -->
    <div class="image">
      <img
        loading="lazy"
        v-if="product.image_url"
        :src="product.image_url.image"
        alt=""
      />
    </div>
    <!-- .image end -->

    <!-- .info start -->
    <div class="info">
      <span>Marka</span>
      <router-link v-if="product.brand" :to="`/brands/${product.brand}`">{{
        product.brand_display.name
      }}</router-link>
      <strong v-else>-</strong>
    </div>
    <!-- .info end -->

    <!-- .info start -->
    <div class="info">
      <span>Model</span>
      <strong>{{ product.model ?? '-' }}</strong>
    </div>
    <!-- .info end -->

    <!-- .info start -->
    <div class="info">
      <span>Barkod</span>
      <strong>{{ product.barcode ?? '-' }}</strong>
    </div>
    <!-- .info end -->

    <!-- .info start -->
    <div class="info">
      <span>UTS Kod</span>
      <strong>{{ product.pts_code ?? '-' }}</strong>
    </div>
    <!-- .info end -->

    <!-- .info start -->
    <div class="info">
      <span>Toplam Satıcı</span>
      <strong>{{ product.seller_count }} Satıcı</strong>
    </div>
    <!-- .info end -->
  </Widget>
  <!-- .widget end -->
</template>
