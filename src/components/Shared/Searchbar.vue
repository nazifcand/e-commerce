<script setup>
import { ref, watch } from 'vue';
import { useDebounce } from '@vueuse/core';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchSearch } from '@/services/common.service';

const search = ref('');
const debouncedSearch = useDebounce(search, 350);
const results = ref({
  products: {
    items: [],
    count: 0,
  },
  categories: {
    items: [],
    count: 0,
  },
  brands: {
    items: [],
    count: 0,
  },
});

const clearSearch = () => {
  search.value = '';
  results.value = {
    products: {
      items: [],
      count: 0,
    },
    categories: {
      items: [],
      count: 0,
    },
    brands: {
      items: [],
      count: 0,
    },
  };
};

watch(search, (val) => {
  const body = document.querySelector('body');
  if (val.length <= 3) {
    body.classList.remove('hide-scroll');
    return;
  }
  body.classList.add('hide-scroll');
});

watch(route, (to, from) => {
  search.value = '';
});

watch(debouncedSearch, async (val) => {
  if (val.length == 0) {
    clearSearch();
    return;
  }
  const [searchError, searchData] = await fetchSearch(val);
  results.value = searchData;
});
</script>

<template>
  <teleport to="body">
    <div
      v-if="search.length > 3"
      class="overlay"
      @click.self="clearSearch"
    ></div>
  </teleport>

  <!-- #search-bar start -->
  <div v-bind="$attrs" id="search-bar" :class="{ top: search.length > 3 }">
    <i class="fal fa-search search-icon"></i>
    <form action="/search">
      <Input
        name="s"
        v-model="search"
        class="search-input"
        placeholder="Ürün adı, barkod, uts kodu veya marka  arayın..."
      />
    </form>

    <!-- #search-overlay start -->
    <div v-if="search.length > 3" id="search-overlay">
      <!-- #results start -->
      <div id="results">
        <div>
          <h6>Markalar</h6>
          <p v-if="!results.brands.items.length">Marka bulunamadı</p>

          <router-link
            v-if="results.brands.items.length"
            v-for="(brand, index) in results.brands.items"
            :key="index"
            :to="`/brands/${brand.id}`"
            >{{ brand.name }}</router-link
          >
        </div>

        <div>
          <h6>Kategoriler</h6>
          <p v-if="!results.categories.items.length">Kategori bulunamadı</p>
          <router-link
            v-if="results.categories.items.length"
            v-for="(category, index) in results.categories.items"
            :key="index"
            :to="`/categories/${category.id}`"
            >{{ category.name }}</router-link
          >
        </div>
      </div>
      <!-- #results end -->

      <!-- #product-results start -->
      <div id="product-results">
        <!-- .prod start -->
        <div
          v-for="(product, index) in results.products.items"
          :key="index"
          class="prod"
        >
          <!-- .prod-image start -->
          <router-link :to="`/products/${product.id}`" class="prod-image">
            <img loading="lazy" :src="product.image_url.image" alt="" />
          </router-link>
          <!-- .prod-image end -->

          <!-- .prod-info start -->
          <div class="prod-info">
            <!-- .prod-name start -->
            <router-link class="prod-name" :to="`/products/${product.id}`">{{
              product.name
            }}</router-link>
            <!-- .prod-name end -->

            <!-- .prod-price start -->
            <div v-if="product.minimum_price" class="prod-price">
              <strong>{{ product.minimum_price }}</strong> TL'den başlayan
              fiyatlarla
              <strong>{{ product.seller_count }} ilan</strong>
            </div>
            <!-- .prod-price end -->
          </div>
          <!-- .prod-info end -->
        </div>
        <!-- .prod end -->
      </div>
      <!-- #product-results end -->
    </div>
    <!-- #search-overlay end -->
  </div>
  <!-- #search-bar end -->
</template>
