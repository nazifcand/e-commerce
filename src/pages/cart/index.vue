<script setup>
import { computed, ref, watch } from 'vue';
import { formatPrice } from '@/utils/utils';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';
import { fetchCart, removeCartItem } from '@/services/cart.service';
import { useMainStore } from '@/stores/main.store';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

const title = useTitle(pageTitle('Sepetim'));
const cart = ref({
  results: [],
  errors: [],
});

(async () => {
  mainStore.isLoading = true;
  const [cartError, cartData] = await fetchCart();
  cart.value = cartData;
  mainStore.selectedCartItems = cart.value.results.map((i) => i.id);
  mainStore.isLoading = false;
})();

const getSellers = computed(() => {
  return cart.value.results.reduce((sellers, cartItem, cartItemIndex, data) => {
    if (!sellers.map((i) => i.id).includes(cartItem.listing.company_display.id))
      sellers.push({
        ...cartItem.listing.company_display,
        cartItems: data.filter(
          (filterCartItem) =>
            filterCartItem.listing.company == cartItem.listing.company
        ),
      });
    return sellers;
  }, []);
});

const subTotal = computed(() => {
  return cart.value.results.reduce((total, item) => {
    total += item.quantity * item.listing.price;
    return total;
  }, 0);
});

const total = computed(() => {
  return subTotal.value;
});

const removeItem = async (id) => {
  const [cartError, cartData] = await removeCartItem([id]);
  mainStore.user.cart = cartData.results;
  cart.value.results = cartData.results;
};

watch(
  () => mainStore.user.cart,
  (val) => (cart.value.results = val)
);
</script>

<template>
  <Breadcrumb>
    <span>Profil</span>
    <strong>Sepetim</strong>
  </Breadcrumb>

  <div id="cart-page" class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #content start -->
      <div id="content">
        <div v-if="cart.errors.length" class="base">
          <div class="alert warning">
            <p>
              Sepetinizde <strong>stok kaynaklı</strong> kaldırılan ürünler var.
            </p>
          </div>
        </div>

        <div v-if="getSellers.length" class="items base">
          <!-- .item-seller start -->
          <div v-for="(seller, index) in getSellers" class="item-seller">
            <!-- .item-seller-title start -->
            <div class="item-seller-title">
              <div class="seller">
                <span>Satıcı : </span>
                <router-link :to="`/seller/${seller.id}`"
                  ><strong>{{ seller.name }}</strong></router-link
                >
              </div>
            </div>
            <!-- .item-seller-title end -->

            <!-- .item-seller-item start -->
            <div
              v-for="(item, itemIndex) in seller.cartItems"
              class="item-seller-item"
            >
              <!-- .select start -->
              <div class="select">
                <Checkbox
                  v-model="mainStore.selectedCartItems"
                  :value="item.id"
                />
              </div>
              <!-- .select end -->

              <!-- .image start -->
              <div class="image">
                <img
                  loading="lazy"
                  :src="item.listing.product_display.image_url.image"
                  alt=""
                />
              </div>
              <!-- .image end -->

              <!-- .name start -->
              <router-link class="name" :to="`/listings/${item.listing.id}`">
                <strong>{{
                  item.listing.product_display.name
                }}</strong></router-link
              >
              <!-- .name end -->

              <!-- .add start -->
              <div class="add">
                <AddCart :listing="item.listing" :quantity="item.quantity" />
              </div>
              <!-- .add end -->

              <!-- .price start -->
              <div class="price">
                {{ formatPrice(item.quantity * item.listing.price) }}
                TL
              </div>
              <!-- .price end -->

              <!-- .remove start -->
              <div class="remove" @click="removeItem(item.id)">
                <i class="far fa-trash-alt remove"></i>
              </div>
              <!-- .remove end -->
            </div>
            <!-- .item-seller-item end -->
          </div>
          <!-- .item-seller end -->
        </div>

        <p v-if="!getSellers.length" class="not-found-text base">
          Sepetinde ürün bulunmuyor!
        </p>
      </div>
      <!-- #content end -->

      <!-- #sidebar start -->
      <div v-if="getSellers.length" id="sidebar">
        <Widget>
          <!-- .summary start -->
          <div class="summary">
            <div>
              <span>Ara Toplam </span>
              <strong>{{ formatPrice(subTotal) }} TL</strong>
            </div>

            <div>
              <span>Ödenecek Tutar </span>
              <strong>{{ formatPrice(total) }} TL</strong>
            </div>

            <router-link
              to="/cart/checkout"
              class="btn primary dark checkout-btn"
            >
              Ödemeye Geç
            </router-link>
          </div>
          <!-- .summary end -->
        </Widget>
      </div>
      <!-- #sidebar end -->
    </div>
    <!-- #page end -->
  </div>
</template>
