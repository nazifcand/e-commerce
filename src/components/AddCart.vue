<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  listing: { type: Object, required: true },
  size: { type: String, default: 'normal' }, // normal | large
});

// services
import { addCartItem, removeCartItem } from '@/services/cart.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const quantity = ref(0);

const isAdded = computed(() => {
  return mainStore.user.cart
    .map((item) => item.listing.id)
    .includes(props.listing.id);
});

const isShow = computed(() => {
  if (props.listing.company == mainStore.user.company.id) return false;
  return true;
});

// initialize data
const initialize = () => {
  const item = mainStore.user.cart.find(
    (item) => item.listing.id == props.listing.id
  );
  quantity.value = item?.quantity ?? 0;
};
initialize();

// remove item
const removeItem = () => {
  mainStore.showModal({
    text: `<strong>${props.listing.product_display.name}</strong> ürününü sepetinizden silmek istiyor musunuz?`,
    confirm: async () => {
      const item = mainStore.user.cart.find(
        (item) => item.listing.id == props.listing.id
      );
      const [cartError, cartData] = await removeCartItem([item.id]);
      mainStore.user.cart = cartData.results;
      quantity.value = 0;
    },
  });
};

// add cart
const updateQuantity = async () => {
  const [cartError, cartData] = await addCartItem([
    { item: props.listing.id, quantity: quantity.value },
  ]);
  mainStore.user.cart = cartData.results;
};

// decrease
const decrease = () => {
  const { min_quantity } = props.listing;
  if (quantity.value > 1 && quantity.value > min_quantity) {
    --quantity.value;
  }
};

// increase
const increase = () => {
  const { min_quantity, max_quantity } = props.listing;
  // check min
  if (min_quantity != 0 && quantity.value < min_quantity) {
    quantity.value = min_quantity;
    return;
  }
  // check max
  if (max_quantity != 0 && quantity.value >= max_quantity) {
    quantity.value = max_quantity;
    return;
  }
  if (quantity.value < props.listing.quantity) {
    quantity.value++;
  }
};

watch(
  () => props.listing,
  (val) => initialize()
);
watch(
  () => mainStore.user.cart,
  (val) => initialize()
);
watch(quantity, (val) => {
  if (val != 0) {
    updateQuantity();
  }
});
</script>

<template>
  <!-- .add-to-cart start -->
  <div v-if="isShow" class="add-to-cart" :class="size">
    <!-- .add-cart start -->
    <button v-if="!isAdded" class="add-cart" @click="increase">
      Sepete Ekle
    </button>
    <!-- .add-cart end -->

    <!-- .quantity-input start -->
    <div v-if="isAdded" class="quantity-input">
      <!-- .remove start -->
      <button v-if="quantity == 1" class="remove" @click="removeItem">
        <i class="fal fa-trash-alt"></i>
      </button>
      <!-- .remove end -->

      <!-- .decrease start -->
      <button v-if="quantity != 1" class="decrease" @click="decrease">
        <i class="fal fa-minus"></i>
      </button>
      <!-- .decrease end -->

      <!-- .qty start -->
      <div class="qty">
        <input v-model="quantity" class="input" type="text" readonly />
      </div>
      <!-- .qty end -->

      <!-- .increase start -->
      <button class="increase" @click="increase">
        <i class="fal fa-plus"></i>
      </button>
      <!-- .increase end -->
    </div>
    <!-- .quantity-input end -->
  </div>
  <!-- .add-to-cart end -->
</template>
