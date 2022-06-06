<script setup>
import { ref, watch } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';
import { fetchProducts } from '@/services/product.service';
import { useMainStore } from '@/stores/main.store';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const mainStore = useMainStore();

const title = useTitle();
const selectedCategories = ref([]);
const selectedBrands = ref([]);
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
  const [productError, productData] = await fetchProducts({
    ...route.query,
    search: route.query.s,
  });
  title.value = pageTitle(`${route.query.s}`);
  products.value = productData;
  defineFilters.value = productData.filters;
  mainStore.isLoading = false;
};
fetchData();

const fetchFilterProducts = async (filters) => {
  const [productError, productData] = await fetchProducts({
    ...route.query,
    search: route.query.s,
    ...filters,
  });
  products.value = productData;
};

watch([selectedCategories, selectedBrands], (val) => {
  fetchFilterProducts({
    category_id: val[0].join(',') || undefined,
    brand_id: val[1].join(',') || undefined,
  });
});

watch(route, (to) => {
  if (to.name == 'search') fetchData();
});
</script>

<template>
  <Breadcrumb>
    <span>Arama</span>
    <strong>'{{ route.query.s }}' arama sonuçları</strong>
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

        <!-- .widget start -->
        <Widget
          v-if="defineFilters.brands.length"
          title="Markaya göre filtrele"
        >
          <!-- .widget-item start -->
          <div
            class="widget-item"
            v-for="(brand, index) in defineFilters.brands"
            :key="index"
          >
            <Checkbox v-model="selectedBrands" :value="brand.id">{{
              brand.name
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
