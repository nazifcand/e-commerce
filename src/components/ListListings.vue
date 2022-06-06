<script setup>
import { ref } from 'vue';
import { formatNumber, formatPrice } from '@/utils/utils';

const props = defineProps({
  listings: {
    results: { type: Array, default: [] },
  },
});

const columns = ref([
  {
    title: 'Satıcı',
    type: 'company',
  },
  {
    title: 'Miat',
    type: 'expiry',
    sortable: 'expiry',
  },
  {
    title: 'Stok',
    type: 'quantity',
    sortable: 'quantity',
  },
  {
    title: 'Fiyat',
    type: 'price',
    sortable: 'price',
  },
  {
    title: '',
    type: 'add-cart',
  },
]);
</script>

<template>
  <DataGrid :columns="columns">
    <!-- .row start -->
    <div
      v-for="(listing, index) in listings.results"
      :key="index"
      :class="{
        secondhand: listing.is_secondhand,
      }"
      class="row"
    >
      <!-- .cell start -->
      <router-link :to="`/listings/${listing.id}`" class="cell cell-company">
        <!-- .icon start -->
        <i class="fad fa-store icon"></i>
        <!-- .icon end -->

        <!-- .name start -->
        <div class="name">
          <span>{{ listing.company_display.name }}</span>
        </div>
        <!-- .name end -->
      </router-link>
      <!-- .cell end -->

      <!-- .cell start -->
      <div class="cell cell-expiry">
        {{ listing.expiry ?? '-' }}
      </div>
      <!-- .cell end -->

      <!-- .cell start -->
      <div class="cell cell-quantity">
        {{ formatNumber(listing.quantity) }} Adet
      </div>
      <!-- .cell end -->

      <!-- .cell start -->
      <div class="cell cell-price">{{ formatPrice(listing.price) }} TL</div>
      <!-- .cell end -->

      <!-- .cell start -->
      <div class="cell cell-add-cart">
        <AddCart v-if="listing" :listing="listing" />
      </div>
      <!-- .cell end -->
    </div>
    <!-- .row end -->
  </DataGrid>
</template>
