<script setup>
import { ref, watch } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchBrand } from '@/services/brand.service';
import { fetchProducts } from '@/services/product.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const title = useTitle();
const selectedCategories = ref([]);
const brand = ref({
  name: '',
});
const products = ref({
  total: 0,
  page: 1,
  page_size: 25,
  results: [],
});
const defineFilters = ref({
  brands: [],
  categories: [],
});

const fetchData = async () => {
  mainStore.isLoading = true;
  const { brandID } = route.params;

  const data = await Promise.all([
    fetchBrand(brandID),
    fetchProducts({ ...route.query, brand_id: brandID }),
  ]);

  const [brandError, brandData] = data[0];
  const [productError, productData] = data[1];

  title.value = pageTitle(brandData.name);
  brand.value = brandData;
  products.value = productData;
  defineFilters.value = productData.filters;
  mainStore.isLoading = false;
};
fetchData();

const fetchFilterProducts = async (filters) => {
  const { brandID } = route.params;
  const [productError, productData] = await fetchProducts({
    ...route.query,
    brand_id: brandID,
    category_id: selectedCategories.value.join(',') || undefined,
    ...filters,
  });
  products.value = productData;
};

watch(selectedCategories, (val) => {
  fetchFilterProducts({});
});

watch(route, (to) => {
  if (to.name == 'brands-brandID') fetchData();
});
</script>

<template>
  <Breadcrumb>
    <span>Tüm Markalar</span>
    <strong>{{ brand.name }}</strong>
  </Breadcrumb>

  <div v-bind="$attrs" class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #sidebar start -->
      <div id="sidebar">
        <!-- .widget start -->
        <Widget
          v-if="defineFilters.categories.length"
          title="Kategoriye göre filtrele"
        >
          <!-- .widget-item start -->
          <div
            class="widget-item"
            v-for="(category, index) in defineFilters.categories"
            :key="index"
          >
            <Checkbox v-model="selectedCategories" :value="category.id">{{
              category.name
            }}</Checkbox>
          </div>
          <!-- .widget-item end -->
        </Widget>
        <!-- .widget end -->
      </div>
      <!-- #sidebar end -->

      <!-- #content start -->
      <div id="content">
        <!-- .list start -->
        <div class="list">
          <div class="list three">
            <SingleProduct
              v-for="(product, index) in products.results"
              :key="index"
              :product="product"
            />
          </div>
        </div>
        <!-- .list end -->

        <!-- pagination start -->
        <Pagination :total="products.total" :size="products.page_size" />
        <!-- pagination end -->
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>
