<script setup>
import { ref, computed } from 'vue';
import { formatPrice } from '@/utils/utils';

const props = defineProps({
  listing: { type: Object, required: true },
});

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const getPrice = computed(() => {
  let { minimum_price } = props.listing.product_display;
  minimum_price = formatPrice(minimum_price);
  if (!minimum_price) {
    return '00';
  }
  return String(minimum_price).split(',')[0] ?? '00';
});

const getDecimal = computed(() => {
  let { minimum_price } = props.listing.product_display;
  minimum_price = formatPrice(minimum_price);
  if (!minimum_price) {
    return '00';
  }
  return String(minimum_price).split(',')[1] ?? '00';
});

const showAddButton = computed(() => {
  return props.listing.company != mainStore.user.company.id;
});
</script>

<template>
  <!-- .product start -->
  <div class="product" :class="{ secondhand: listing.is_secondhand }">
    <!-- .product-image start -->
    <div class="product-image">
      <router-link :to="`/listings/${listing.id}`">
        <img
          loading="lazy"
          :src="listing.product_display.image_url.image"
          :alt="listing.product_display.name"
        />
      </router-link>
    </div>
    <!-- .product-image end -->

    <!-- .product-category start -->
    <router-link
      v-if="listing.product_display.category_display"
      :to="`/categories/${listing.product_display.category}`"
      class="product-category"
    >
      {{ listing.product_display.category_display.name }}
    </router-link>
    <!-- .product-category end -->

    <!-- .product-name start -->
    <router-link :to="`/listings/${listing.id}`" class="product-name">
      {{ listing.product_display.name }}
    </router-link>
    <!-- .product-name end -->

    <!-- .product-price start -->
    <div class="product-price">
      <div class="price">
        <strong>{{ getPrice }},</strong>
        <span class="decimal">{{ getDecimal }} TL</span>
      </div>
    </div>
    <!-- .product-price end -->

    <!-- .product-seller start -->
    <router-link
      :to="`/seller/${listing.company_display.id}`"
      class="product-seller"
    >
      {{ listing.company_display.name }}
    </router-link>
    <!-- .product-seller end -->

    <!-- .product-add start -->
    <div v-if="showAddButton" class="product-add">
      <AddCart :listing="listing" />
    </div>
    <!-- .product-add end -->

    <!-- .secondhand start -->
    <div v-if="listing.is_secondhand" class="secondhand">
      <i class="far fa-recycle"></i>
      <p>İkinci el Ürün</p>
    </div>
    <!-- .secondhand end -->
  </div>
  <!-- .product end -->
</template>
