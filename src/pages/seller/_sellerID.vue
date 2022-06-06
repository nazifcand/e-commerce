<script setup>
import { ref, watch } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchListings } from '@/services/listing.service';
import { fetchCompany } from '@/services/account.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const title = useTitle();
const selectedCategories = ref([]);
const seller = ref({
  categories: [],
});
const listings = ref({
  total: 1,
  page: 1,
  page_size: 1000,
  results: [],
});

const fetchData = async () => {
  mainStore.isLoading = true;
  const data = await Promise.all([
    fetchCompany(route.params.sellerID),
    fetchListings({
      page: 1,
      page_size: 27,
      ordering: '-created_at',
      company: route.params.sellerID,
      ...route.query,
    }),
  ]);

  const [sellerError, sellerData] = data[0];
  const [listingsError, listingData] = data[1];

  title.value = pageTitle(`${sellerData.short_name}`);
  seller.value = sellerData;
  listings.value = listingData;
  mainStore.isLoading = false;
};
fetchData();

watch(route, (to) => {
  if (to.name == 'seller-sellerID') fetchData();
});
</script>

<template>
  <div v-bind="$attrs" class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #sidebar start -->
      <div id="sidebar">
        <!-- .widget start -->
        <SellerWidget :seller="seller" />
        <!-- .widget end -->

        <!-- .widget start -->
        <Widget title="Kategoriler">
          <!-- .widget-item start -->
          <div
            class="widget-item"
            v-for="(category, index) in seller.categories"
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
            <SingleListing
              v-for="(listing, index) in listings.results"
              :key="index"
              :listing="listing"
            />
          </div>
        </div>
        <!-- .list end -->

        <!-- pagination start -->
        <Pagination :total="listings.total" :size="listings.page_size" />
        <!-- pagination end -->
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>
