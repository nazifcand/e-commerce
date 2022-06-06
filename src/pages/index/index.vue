<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

// services
import {
  fetchProducts,
  fetchExploreProducts,
  fetchTopSellingProducts,
  fetchLastWeekTopSellingProducts,
} from '@/services/product.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const title = useTitle(pageTitle(mainStore.settings.motto));
const isLoading = ref(false);
const page = ref(0);
const exploreProducts = ref([]);
const topSellingProducts = ref([]);
const lastWeekTopSellingProducts = ref([]);
const products = ref({
  total: 0,
  page_size: 20,
  page: 1,
  results: [],
});

(async () => {
  mainStore.isLoading = true;

  const data = await Promise.all([
    fetchProducts({
      page: ++page.value,
    }),
    fetchExploreProducts(),
    fetchTopSellingProducts(),
    fetchLastWeekTopSellingProducts(),
  ]);

  const [productError, productData] = data[0];
  products.value = productData;

  const [exploreError, exploreData] = data[1];
  exploreProducts.value = exploreData.results;

  const [topSellingError, topSellingData] = data[2];
  topSellingProducts.value = topSellingData.results;

  const [lastWeekTopSellingError, lastWeekData] = data[3];
  lastWeekTopSellingProducts.value = lastWeekData.results;

  mainStore.isLoading = false;
})();

const moreProducts = async () => {
  page.value++;
  const [productError, productData] = await fetchProducts({
    page_size: 20,
    page: page.value,
  });

  products.value.results = [...products.value.results, ...productData.results];
};

const fetchData = async () => {
  isLoading.value = true;
  await moreProducts();
  isLoading.value = false;
};
</script>

<template>
  <MobileCategories />

  <div class="container">
    <IndexSlider />
  </div>

  <!-- .section start -->
  <div class="section">
    <!-- .section-title start -->
    <div class="section-title">
      <div class="container">
        <h2>Öne Çıkanlar</h2>
      </div>
    </div>
    <!-- .section-title end -->

    <!-- .list start -->
    <div class="container">
      <div class="list three">
        <SingleProduct
          v-for="(product, index) in exploreProducts"
          :key="index"
          :product="product"
        />
      </div>
    </div>
    <!-- .list end -->
  </div>
  <!-- .section end -->

  <!-- .section start -->
  <div class="section">
    <!-- .section-title start -->
    <div class="section-title">
      <div class="container">
        <h2>Son 7 Günde Çok Satan İlanlar</h2>
      </div>
    </div>
    <!-- .section-title end -->

    <!-- .list start -->
    <div class="container">
      <div class="list">
        <SingleProduct
          v-for="(product, index) in topSellingProducts"
          :key="index"
          :product="product"
        />
      </div>
    </div>
    <!-- .list end -->
  </div>
  <!-- .section end -->

  <!-- .section start -->
  <div class="section">
    <!-- .section-title start -->
    <div class="section-title">
      <div class="container">
        <h2>Sponsorlu İkinci El Ürünler</h2>
      </div>
    </div>
    <!-- .section-title end -->

    <!-- .list start -->
    <div class="container">
      <div class="list five">
        <SingleProduct
          v-for="(product, index) in lastWeekTopSellingProducts"
          :key="index"
          :product="product"
        />
      </div>
    </div>
    <!-- .list end -->
  </div>
  <!-- .section end -->

  <!-- .section start -->
  <div class="section">
    <!-- .section-title start -->
    <div class="section-title">
      <div class="container">
        <h2>Sponsorlu Ürünler</h2>
      </div>
    </div>
    <!-- .section-title end -->

    <!-- .list start -->
    <div class="container">
      <div class="list three">
        <SingleProduct
          v-for="(product, index) in topSellingProducts.slice(0, 3)"
          :key="index"
          :product="product"
        />
      </div>
    </div>
    <!-- .list end -->
  </div>
  <!-- .section end -->

  <!-- .section start -->
  <div class="section">
    <!-- .section-title start -->
    <div class="section-title">
      <div class="container">
        <h2>Keşfet</h2>
      </div>
    </div>
    <!-- .section-title end -->

    <!-- .list start -->
    <div class="container">
      <div class="list five">
        <SingleProduct
          v-for="(product, index) in products.results"
          :key="index"
          :product="product"
        />
      </div>
    </div>
    <!-- .list end -->

    <!-- .more start -->
    <div v-if="products.results.length != products.total" class="container">
      <div class="more">
        <button @click="fetchData">
          <span>Daha Fazla Yükle</span>
          <i v-if="isLoading" class="fad fa-spinner-third spin"></i>
        </button>
      </div>
    </div>
    <!-- .more end -->
  </div>
  <!-- .section end -->
</template>
