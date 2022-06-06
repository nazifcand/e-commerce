<script setup>
import { ref, watch } from 'vue';
import { formatPrice } from '@/utils/utils';
import { getShipment } from '@/utils/kinds';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import {
  fetchListings,
  updateListing,
  removeListing,
} from '@/services/listing.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const title = useTitle(pageTitle('İlanlarım'));
const listings = ref({
  total: 1,
  page: 1,
  page_size: 1000,
  results: [],
});
const columns = ref([
  {
    title: 'Ürün',
    type: 'product',
    sortable: 'product__name',
  },
  {
    title: 'Kargo',
    type: 'listing-shipment',
  },
  {
    title: 'Stok',
    type: 'quantity',
    sortable: 'quantity',
  },
  {
    title: 'Satış Fiyatı',
    type: 'price',
    sortable: 'price',
  },
  {
    title: 'Kazanç',
    type: 'price',
  },
  {
    title: 'Durum',
    type: 'listing-status',
  },
  {
    title: '',
    type: 'action',
  },
  {
    title: '',
    type: 'action',
  },
]);

const fetchData = async () => {
  mainStore.isLoading = true;
  const [listingsError, listingsData] = await fetchListings({
    ordering: '-created_at',
    company: mainStore.user.company.id,
    status: undefined,
    ...route.query,
  });
  listings.value = listingsData;
  mainStore.isLoading = false;
};
fetchData();

const updateListingHandler = async (listing) => {
  const [listingError, listingData] = await updateListing(listing.id, listing);
  console.log({ listingData, listingError });
};

const newListingHandler = (listing) => {
  listings.value.results.unshift(listing);
  listings.value.total++;
};

const removeItem = async (listing, index) => {
  mainStore.showModal({
    text: `<strong>${listing.product_display.name}</strong> ilanını silmek istiyor musunuz?`,
    payload: { listing, index },
    confirm: async () => {
      const [listingError, listingData] = await removeListing(listing.id);

      // is error
      if (listingError) {
        alertStore.add({
          text: `<strong>${listing.product_display.name}</strong> ilanı silinemedi!`,
          class: 'danger',
        });
        return;
      }

      // success
      alertStore.add({
        text: `<strong>${listing.product_display.name}</strong> ilanı başarıyla silindi.`,
        class: 'success',
      });

      listings.value.results.splice(index, 1);
      --listings.value.total;
    },
  });
};

watch(route, (to) => {
  if (to.name == 'profile-listings') {
    fetchData();
  }
});
</script>

<template>
  <Breadcrumb>
    <span>Profil</span>
    <strong>İlanlarım ({{ listings.total }} ilan )</strong>
  </Breadcrumb>

  <div class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #content start -->
      <div id="content">
        <!-- add listing start -->
        <NewListing @new-listing="newListingHandler" />
        <!-- add listing end -->

        <!-- listing start -->
        <div class="base">
          <!-- .data-grid start -->
          <DataGrid :columns="columns">
            <!-- .row start -->
            <div
              v-if="listings.results.length"
              v-for="(listing, index) in listings.results"
              :key="index"
              :class="{ secondhand: listing.is_secondhand }"
              class="row"
            >
              <!-- .cell start -->
              <router-link
                :to="`/listings/${listing.id}`"
                target="_blank"
                class="cell cell-product"
              >
                <!-- .image start -->
                <div class="image">
                  <img
                    loading="lazy"
                    :src="
                      !listing.image
                        ? listing.product_display.image_url.image
                        : listing.image_url.image
                    "
                    :alt="listing.product_display.name"
                  />
                </div>
                <!-- .image end -->

                <!-- .name start -->
                <div class="name">
                  <span>{{ listing.product_display.name }}</span>
                  <!-- <div class="product-details">
                    <div>
                      <span>Barkod : </span>
                      <strong>{{ listing.product_code }}</strong>
                    </div>
                  </div> -->
                </div>
                <!-- .name end -->
              </router-link>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-listing-shipment">
                <span :class="getShipment(listing.shipment_kind).class">
                  {{ getShipment(listing.shipment_kind).label }}
                </span>
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-quantity">
                <Input
                  v-model="listing.quantity"
                  @keypress.enter="updateListingHandler(listing)"
                  @blur="updateListingHandler(listing)"
                />
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-price">
                <Input
                  v-model="listing.price"
                  @keypress.enter="updateListingHandler(listing)"
                  @blur="updateListingHandler(listing)"
                />
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-price">
                {{
                  formatPrice(
                    listing.price -
                      (listing.price * listing.earning.commission_rate) / 100
                  )
                }}
                TL
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-listing-status">
                <SetListingStatus
                  v-model="listing.status"
                  @changed="updateListingHandler(listing)"
                />
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-action">
                <router-link
                  :to="`/profile/listings/edit/${listing.id}`"
                  class="action"
                >
                  <i class="fal fa-edit"></i>
                </router-link>
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-action">
                <a
                  href="#"
                  class="action"
                  @click.prevent="removeItem(listing, index)"
                >
                  <i class="fal fa-trash-alt"></i>
                </a>
              </div>
              <!-- .cell end -->
            </div>
            <!-- .row end -->

            <!-- not found text start -->
            <div v-if="!listings.results.length" class="row">
              <p class="not-found-text">
                Şuan herhangi bir ürün satmıyorsunuz.
              </p>
            </div>
            <!-- not found text end -->
          </DataGrid>
          <!-- .data-grid end -->
        </div>
        <!-- listing end -->

        <!-- pagination start -->
        <Pagination :total="listings.total" :size="listings.page_size" />
        <!-- pagination end -->
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>
