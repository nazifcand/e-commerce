<script setup>
import { ref, watch } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchCategory } from '@/services/category.service';
import { fetchProducts } from '@/services/product.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const title = useTitle();
const selectedCategories = ref([]);
const selectedBrands = ref([]);
const category = ref({
  name: '',
  children: [],
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
  const { categoryID } = route.params;

  const data = await Promise.all([
    fetchCategory(categoryID),
    fetchProducts({ ...route.query, category_id: categoryID }),
  ]);

  const [categoryError, categoryData] = data[0];
  const [productError, productData] = data[1];

  title.value = pageTitle(categoryData.name);
  category.value = categoryData;
  products.value = productData;
  defineFilters.value = productData.filters;
  mainStore.isLoading = false;
};
fetchData();

const fetchFilterProducts = async (filters) => {
  const [productError, productData] = await fetchProducts({
    ...route.query,
    ...filters,
  });
  products.value = productData;
};

watch([selectedCategories, selectedBrands], (val) => {
  const { categoryID } = route.params;
  fetchFilterProducts({
    category_id: val[0].join(',') || categoryID,
    brand_id: val[1].join(',') || undefined,
  });
});

watch(route, (to) => {
  if (to.name == 'categories-categoryID') fetchData();
});
</script>

<template>
  <Breadcrumb>
    <span>Tüm Kategoriler</span>
    <!-- <ParentCategory v-if="category.parent" :category="category.parent" /> -->
    <strong>{{ category.name }}</strong>
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
        <div v-if="products.results.length" class="list">
          <div class="list three">
            <SingleProduct
              v-for="(product, index) in products.results"
              :key="index"
              :product="product"
            />
          </div>
        </div>
        <!-- .list end -->

        <p v-if="!products.results.length" class="not-found-text base">
          Bu kategoriye ürün eklenmemiş!
        </p>

        <!-- pagination start -->
        <Pagination :total="products.total" :size="products.page_size" />
        <!-- pagination end -->
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>
