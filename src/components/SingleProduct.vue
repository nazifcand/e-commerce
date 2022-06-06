<script setup>
import { ref, computed } from 'vue';
import { formatPrice } from '@/utils/utils';

const props = defineProps({
  product: { type: Object, required: true },
});

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const getPrice = computed(() => {
  let { minimum_price } = props.product;
  minimum_price = formatPrice(minimum_price);
  if (!minimum_price) {
    return '00';
  }
  return String(minimum_price).split(',')[0] ?? '00';
});

const getDecimal = computed(() => {
  let { minimum_price } = props.product;
  minimum_price = formatPrice(minimum_price);
  if (!minimum_price) {
    return '00';
  }
  return String(minimum_price).split(',')[1] ?? '00';
});

const selectProduct = () => {
  mainStore.selectedProduct = { ...props.product };
};
</script>

<template>
  <!-- .product start -->
  <div class="product">
    <!-- .product-image start -->
    <div class="product-image">
      <router-link :to="`/products/${product.id}`">
        <img
          loading="lazy"
          v-if="product.image_url"
          :src="product.image_url.image"
          :alt="product.name"
        />
      </router-link>
    </div>
    <!-- .product-image end -->

    <!-- .product-category start -->
    <router-link
      v-if="product.category_display"
      :to="`/categories/${product.category}`"
      class="product-category"
    >
      {{ product.category_display.name }}
    </router-link>
    <!-- .product-category end -->

    <!-- .product-name start -->
    <router-link :to="`/products/${product.id}`" class="product-name">
      {{ product.name }}
    </router-link>
    <!-- .product-name end -->

    <!-- .product-price start -->
    <div v-if="product.minimum_price" class="product-price">
      <div class="price">
        <strong>{{ getPrice }},</strong>
        <span class="decimal">{{ getDecimal }} TL</span>
      </div>
      <p>
        'den başlayan fiyatlarla
        <strong>{{ product.seller_count }} ilan</strong>
      </p>
    </div>
    <!-- .product-price end -->

    <!-- .product-add-listing start -->
    <router-link
      to="/profile/listings/"
      v-if="!product.minimum_price"
      class="product-add-listing"
      @click="selectProduct"
    >
      <button>İlk ilan veren siz olun!</button>
    </router-link>
    <!-- .product-add-listing end -->
  </div>
  <!-- .product end -->
</template>
