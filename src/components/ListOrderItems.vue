<script setup>
import { ref } from 'vue';
import { formatPrice, formatDate } from '@/utils/utils';

const props = defineProps({
  items: { type: Array, default: [] },
  type: { type: String, default: 'buyer' },
});
</script>

<template>
  <!-- #order-items start -->
  <div id="order-items" class="base">
    <!-- .order-item start -->
    <div v-for="(item, index) in items" :key="index" class="order-item">
      <!-- .image start -->
      <div class="image">
        <img :src="`data:image/jpg;base64,${item.product_image}`" alt="" />
      </div>
      <!-- .image end -->

      <!-- .name start -->
      <div class="name">
        <router-link :to="`/listings/${item.listing}`" target="_blank"
          ><strong>{{ item.product_name }}</strong></router-link
        >
        <span class="seller">
          <span>Satıcı : </span>
          <router-link :to="`/seller/${item.company_id}`">{{
            item.company_name
          }}</router-link>
        </span>
      </div>
      <!-- .name end -->

      <!-- .quantity start -->
      <div class="quantity">
        <span>{{ item.quantity }} Adet</span>
      </div>
      <!-- .quantity end -->

      <!-- .price start -->
      <div class="price">
        <span>{{ formatPrice(item.price) }} TL</span>
      </div>
      <!-- .price end -->

      <!-- .status start -->
      <SetOrderStatus :item="item" :type="type" />
      <!-- .status end -->
    </div>
    <!-- .order-item end -->
  </div>
  <!-- #order-items end -->
</template>
