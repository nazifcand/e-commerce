<script setup>
import { ref, computed } from 'vue';
import { getCondition, getShipment } from '@/utils/kinds';
import { formatNumber, formatPrice } from '@/utils/utils';

const props = defineProps({
  listing: { type: Object, reqired: true },
});

// services
import { addCartItem, removeCartItem } from '@/services/cart.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const singleImage = ref(
  !props.listing.image
    ? props.listing.product_display.image_url.image
    : props.listing.image_url.image
);

const isShow = computed(() => {
  if (props.listing.company == mainStore.user.company.id) return false;
  return true;
});

const isAdded = computed(() => {
  return mainStore.user.cart
    .map((item) => item.listing.id)
    .includes(props.listing.id);
});

// add cart item
const addItem = async () => {
  let quantity = 1;
  const { min_quantity, max_quantity } = props.listing;

  // check min
  if (min_quantity != 0 && quantity < min_quantity) {
    quantity = min_quantity;
  }

  // check max
  if (max_quantity != 0 && quantity >= max_quantity) {
    quantity = max_quantity;
  }

  // update
  const [cartError, cartData] = await addCartItem([
    { item: props.listing.id, quantity },
  ]);
  mainStore.user.cart = cartData.results;
};

// remove cart item
const removeItem = async () => {
  mainStore.showModal({
    text: `<strong>${props.listing.product_display.name}</strong> ürününü sepetinizden silmek istiyor musunuz?`,
    confirm: async () => {
      const item = mainStore.user.cart.find(
        (item) => item.listing.id == props.listing.id
      );
      const [cartError, cartData] = await removeCartItem([item.id]);
      mainStore.user.cart = cartData.results;
    },
  });
};
</script>

<template>
  <Widget class="listing-widget base">
    <!-- .listing-images start -->
    <div class="listing-images">
      <!-- .single-image start -->
      <div class="single-image">
        <img
          loading="lazy"
          :src="singleImage"
          :alt="listing.product_display.name"
        />
      </div>
      <!-- .single-image end -->

      <!-- .image-list start -->
      <div v-if="listing.is_secondhand" class="image-list">
        <!-- .image start -->
        <div
          v-for="(image, index) in listing.images_url"
          :key="index"
          class="image"
          @click="singleImage = image.image"
        >
          <img
            loading="lazy"
            :src="image.image"
            :alt="listing.product_display.name"
          />
        </div>
        <!-- .image end -->
        <!-- .image start -->
        <div class="image">
          <img
            loading="lazy"
            :src="listing.product_display.image_url.image"
            :alt="listing.product_display.name"
            @click="singleImage = listing.product_display.image_url.image"
          />
        </div>
        <!-- .image end -->
      </div>
      <!-- .image-list end -->
    </div>
    <!-- .listing-images end -->

    <!-- .listing-detail start -->
    <div class="listing-detail">
      <!-- .listing-name start -->
      <div class="listing-name">
        {{ listing.product_display.name }}
      </div>
      <!-- .listing-name end -->

      <!-- .report-listing start -->
      <a href="#" class="report-listing"> İlanı bildir </a>
      <!-- .report-listing end -->

      <!-- .listing-price start -->
      <div class="listing-price">{{ formatPrice(listing.price) }} TL</div>
      <!-- .listing-price end -->

      <!-- .listing-actions start -->
      <div class="listing-actions">
        <!-- .add-cart start -->
        <button v-if="isShow && !isAdded" class="add-cart" @click="addItem">
          Sepete Ekle
        </button>
        <!-- .add-cart end -->

        <!-- .remove-cart start -->
        <button
          v-if="isShow && isAdded"
          class="remove-cart"
          @click="removeItem"
        >
          Sepetten Kaldır
        </button>
        <!-- .remove-cart end -->

        <AddFav v-if="isShow" :listing="listing" />
      </div>
      <!-- .listing-actions end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>İkinci El</span>
        <strong>{{ listing.is_secondhand ? 'Evet' : 'Hayır' }}</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div v-if="listing.is_secondhand" class="listing-info">
        <span>Kullanım Süresi</span>
        <strong>{{ listing.usage_time ?? '-' }}</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div v-if="listing.is_secondhand" class="listing-info">
        <span>Durum</span>
        <strong>{{ getCondition(listing.condition).label }}</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>Kargo</span>
        <strong>{{ getShipment(listing.shipment_kind).label }}</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>Miat</span>
        <strong>{{ listing.expiry ?? '-' }} </strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>Stok</span>
        <strong>{{ formatNumber(listing.quantity) }} Adet</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>En Az Alış Miktarı</span>
        <strong v-if="listing.min_quantity"
          >{{ listing.min_quantity }} Adet</strong
        >
        <strong v-else>Sınır yok</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>En Fazla Alış Miktarı</span>
        <strong v-if="listing.max_quantity"
          >{{ listing.max_quantity }} Adet</strong
        >
        <strong v-else>Sınır yok</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>Marka</span>
        <router-link
          v-if="listing.product_display.brand"
          :to="`/brands/${listing.product_display.brand}`"
          >{{ listing.product_display.brand_display.name }}</router-link
        >
        <strong v-else>-</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>Model</span>
        <strong>{{ listing.product_display.model || '-' }}</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>Barkod</span>
        <strong>{{ listing.product_display.barcode || '-' }}</strong>
      </div>
      <!-- .listing-info end -->

      <!-- .listing-info start -->
      <div class="listing-info">
        <span>UTS Kod</span>
        <strong>{{ listing.product_display.pts_code || '-' }}</strong>
      </div>
      <!-- .listing-info end -->
    </div>
    <!-- .listing-detail end -->
  </Widget>
</template>
