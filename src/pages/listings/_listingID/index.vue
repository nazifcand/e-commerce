<script setup>
import { watch, ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchListing, fetchListings } from '@/services/listing.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const title = useTitle();
const listing = ref(null);
const listings = ref({
  total: 1,
  page: 1,
  page_size: 1000,
  results: [],
});

const fetchData = async () => {
  mainStore.isLoading = true;
  const { listingID } = route.params;

  const [listingError, listingData] = await fetchListing(listingID);
  title.value = pageTitle(listingData.product_display.name);
  listing.value = listingData;

  const [listingsError, listingsData] = await fetchListings({
    ordering: 'price',
    product: listing.value.product,
    ...route.query,
  });
  listings.value = listingsData;
  mainStore.isLoading = false;
};
fetchData();

watch(route, (to) => {
  if (to.name == 'listings-listingID') fetchData();
});
</script>

<template>
  <div v-bind="$attrs"></div>

  <Breadcrumb v-if="listing">
    <ParentCategory
      v-if="listing.product_display.category_display"
      :category="listing.product_display.category_display"
    />
    <strong>{{ listing.product_display.name }}</strong>
  </Breadcrumb>

  <!-- #page start -->
  <div v-if="listing" class="container" id="listing-page">
    <div id="page">
      <!-- #sidebar start -->
      <div id="sidebar">
        <!-- .widget start -->
        <SellerWidget :seller="listing.company_display" />
        <!-- .widget end -->
      </div>
      <!-- #sidebar end -->

      <!-- #content start -->
      <div id="content">
        <!-- .listing start -->
        <ListingWidget :listing="listing" />
        <!-- .listing end -->

        <!-- details start -->
        <div class="details base">
          <TabPanel
            :tabs="[
              {
                value: 'listings',
                label: `Diğer İlanlar (${listings.results.length} Satıcı)`,
              },
              { value: 'desc_seller', label: 'Satıcı Ürün Açıklaması' },
              { value: 'desc', label: 'Ürün Açıklaması' },
            ]"
            active="listings"
          >
            <template #content="{ active }">
              <!-- #listings start -->
              <template v-if="active == 'listings'">
                <ListListings :listings="listings" />
              </template>
              <!-- #listings end -->

              <!-- #listing-description start -->
              <template v-if="active == 'desc_seller'">
                <div
                  id="listing-description"
                  class="html"
                  v-html="
                    listing.description
                      ? `<p>${listing.description}</p>`
                      : '<p>Satıcı bu ilan için herhangi bir açıklama girmemiş</p>'
                  "
                ></div>
              </template>
              <!-- #listing-description end -->

              <!-- #product-description start -->
              <template v-if="active == 'desc'">
                <div
                  id="product-description"
                  class="html"
                  v-html="
                    listing.product_display.description ||
                    '<p>Herhangi bir ürün açıklaması girilmemiş</p>'
                  "
                ></div>
              </template>
              <!-- #product-description end -->
            </template>
          </TabPanel>
        </div>
        <!-- details end -->
      </div>
      <!-- #content end -->
    </div>
  </div>
  <!-- #page end -->
</template>
