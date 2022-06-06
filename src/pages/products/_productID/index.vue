<script setup>
import { watch, ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchProduct } from '@/services/product.service';
import { fetchListings } from '@/services/listing.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const title = useTitle();
const product = ref({});
const listings = ref({
  total: 1,
  page: 1,
  page_size: 1000,
  results: [],
});

const fetchData = async () => {
  mainStore.isLoading = true;
  const { productID } = route.params;

  const data = await Promise.all([
    fetchProduct(productID),
    fetchListings({ ordering: 'price', product: productID, ...route.query }),
  ]);

  const [productError, productData] = data[0];
  const [listingsError, listingsData] = data[1];

  title.value = pageTitle(productData.name);
  product.value = productData;
  listings.value = listingsData;
  mainStore.isLoading = false;
};
fetchData();

watch(route, (to) => {
  if (to.name == 'products-productID') fetchData();
});
</script>

<template>
  <Breadcrumb>
    <ParentCategory
      v-if="product.category_display"
      :category="product.category_display"
    />
    <strong>{{ product.name }}</strong>
  </Breadcrumb>

  <!-- #page start -->
  <div class="container" id="product-page">
    <div v-bind="$attrs" id="page">
      <!-- #sidebar start -->
      <div id="sidebar">
        <!-- .widget start -->
        <ProductWidget :product="product" />
        <!-- .widget end -->
      </div>
      <!-- #sidebar end -->

      <!-- #content start -->
      <div id="content">
        <!-- .details start -->
        <div class="details base">
          <TabPanel
            :tabs="[
              {
                value: 'listings',
                label: `Tüm İlanlar (${listings.results.length} Satıcı)`,
              },
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

              <!-- #product-description start -->
              <template v-if="active == 'desc'">
                <div
                  id="product-description"
                  class="html"
                  v-html="
                    product.description ||
                    '<p>Herhangi bir ürün açıklaması girilmemiş</p>'
                  "
                ></div>
              </template>
              <!-- #product-description end -->
            </template>
          </TabPanel>
        </div>
        <!-- .details end -->
      </div>
      <!-- #content end -->
    </div>
  </div>
  <!-- #page end -->
</template>
