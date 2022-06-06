<script setup>
import { computed, ref } from 'vue';
import { formatPrice } from '@/utils/utils';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchFavourites, removeFavourite } from '@/services/favourite.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const title = useTitle(pageTitle('Favorilerim'));
const favourites = ref({
  results: [],
});

(async () => {
  mainStore.isLoading = true;
  const [favouritesError, favouritesData] = await fetchFavourites();
  favourites.value = favouritesData;
  mainStore.isLoading = false;
})();

const favouritesCount = computed(() => {
  return mainStore.user.favourites.length;
});

const removeItem = async (id) => {
  const [favouritesError, favouritesData] = await removeFavourite([id]);
  favourites.value = favouritesData;
  mainStore.user.favourites = favouritesData.results;
};
</script>

<template>
  <Breadcrumb v-bind="$attrs">
    <span>Profil</span>
    <strong>Favorilerim ({{ favouritesCount }})</strong>
  </Breadcrumb>

  <div class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #content start -->
      <div id="content">
        <div id="favorites" class="base">
          <!-- .fav-item start -->
          <div
            v-if="favourites.results.length"
            v-for="(item, index) in favourites.results"
            :key="index"
            class="fav-item"
          >
            <!-- .image start -->
            <div class="image">
              <img
                loading="lazy"
                :src="item.listing.product_display.image_url.image"
                :alt="item.listing.product_display.name"
              />
            </div>
            <!-- .image end -->

            <!-- .name start -->
            <div class="name">
              <router-link :to="`/listings/${item.listing.id}`">{{
                item.listing.product_display.name
              }}</router-link>

              <!-- .seller start -->
              <div class="seller">
                <span>Satıcı : </span>
                <router-link
                  :to="`/seller/${item.listing.company_display.id}`"
                  >{{ item.listing.company_display.name }}</router-link
                >
              </div>
              <!-- .seller end -->
            </div>
            <!-- .name end -->

            <!-- .price start -->
            <div class="price">{{ formatPrice(item.listing.price) }} TL</div>
            <!-- .price end -->

            <!-- .add start -->
            <div class="add">
              <AddCart :listing="item.listing" />
            </div>
            <!-- .add end -->

            <!-- .remove-item start -->
            <div @click="removeItem(item.id)" class="remove-item">
              <i class="far fa-trash-alt remove"></i>
            </div>
            <!-- .remove-item end -->
          </div>
          <!-- .fav-item end -->

          <!-- not found start -->
          <p v-if="!favourites.results.length" class="not-found-text">
            Favorileriniz de herhangi bir ilan bulunmuyor!
          </p>
          <!-- not found end -->
        </div>
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>
