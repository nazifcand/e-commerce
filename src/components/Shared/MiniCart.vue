<script setup>
import { computed, ref } from 'vue';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const getCart = computed(() => mainStore.user.cart);

const getCartQuantity = computed(() => mainStore.user.cart.length);
</script>

<template>
  <!-- .action start -->
  <div class="action">
    <!-- .icon start -->
    <router-link to="/cart" class="icon">
      <i class="fal fa-shopping-cart"></i>
      <span v-if="getCartQuantity > 0" class="badge">{{
        getCartQuantity
      }}</span>
    </router-link>
    <!-- .icon end -->

    <!-- .detail start -->
    <div v-if="getCart.length > 0" class="detail mini-cart">
      <!-- .title start -->
      <div class="title">
        <strong>Sepet - {{ getCartQuantity }} Ürün</strong>
      </div>
      <!-- .title end -->

      <!-- .content start -->
      <div class="content">
        <!-- .mini-product start -->
        <div v-for="(item, index) in getCart" :key="index" class="mini-product">
          <!-- .product-image start -->
          <router-link
            :to="`/listings/${item.listing.id}`"
            class="product-image"
          >
            <img
              loading="lazy"
              :src="item.listing.product_display.image_url.image"
              alt=""
            />
          </router-link>
          <!-- .product-image end -->

          <!-- .product-info start -->
          <div class="product-info">
            <!-- .product-name start -->
            <router-link
              :to="`/listings/${item.listing.id}`"
              class="product-name"
              ><p>
                <strong>{{ item.listing.product_display.name }}</strong>
              </p></router-link
            >
            <!-- .product-name end -->

            <!-- .product-seller start -->
            <div class="product-seller">
              <span>Satıcı: </span>
              <router-link :to="`/seller/${item.listing.company}`"
                ><strong>{{
                  item.listing.company_display.name
                }}</strong></router-link
              >
            </div>
            <!-- .product-seller end -->

            <!-- .product-price-quantity start -->
            <div class="product-price-quantity">
              <!-- .product-price start -->
              <div class="product-price">
                <span>Fiyat: </span>
                <strong>{{ item.listing.price }} TL</strong>
              </div>
              <!-- .product-price end -->

              <!-- .product-quantity start -->
              <div class="product-quantity">
                <span>Miktar: </span>
                <strong>{{ item.quantity }} Adet</strong>
              </div>
              <!-- .product-quantity end -->
            </div>
            <!-- .product-price-quantity end -->
          </div>
          <!-- .product-info end -->
        </div>
        <!-- .mini-product end -->
      </div>
      <!-- .content end -->

      <!-- .footer start -->
      <div class="footer">
        <router-link to="/cart">Tüm Sepeti Gör</router-link>
      </div>
      <!-- .footer end -->
    </div>
    <!-- .detail end -->
  </div>
  <!-- .action end -->
</template>
