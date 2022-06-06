<script setup>
import { useDebounce } from '@vueuse/core';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  product: {},
});

// services
import { fetchProducts } from '@/services/product.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const search = ref('');
const selectedProduct = ref(null);
const debouncedSearch = useDebounce(search, 300);
const products = ref({
  results: [],
});

onMounted(() => {
  if (mainStore.selectedProduct) {
    selectProduct({ ...mainStore.selectedProduct });
    alertStore.add({
      text: `<strong>${mainStore.selectedProduct.name}</strong> ürününe hızlı ilan açıyorsunuz`,
      class: 'info',
      deletable: false,
    });
  }

  mainStore.selectedProduct = null;
});

const emit = defineEmits(['selected']);
const isLoading = ref(true);

const selectProduct = (product) => {
  search.value = '';
  products.value = [];
  selectedProduct.value = product;
  emit('selected', product);
};

const clearSelectedProduct = async () => {
  selectedProduct.value = null;
  console.log('temizlendi');
};

watch(debouncedSearch, async (debouncedVal) => {
  if (!debouncedVal) {
    products.value.results = [];
    return;
  }

  isLoading.value = true;
  const [productError, productData] = await fetchProducts({
    full_search: debouncedVal,
    page_size: 6,
    status: undefined,
  });
  products.value = productData;
  isLoading.value = false;
});

watch(
  () => props.product,
  (val) => {
    console.log({ val });
    if (!val) {
      clearSelectedProduct();
    }
  }
);
</script>

<template>
  <!-- #select-product start -->
  <div id="select-product">
    <!-- #select-input start -->
    <div id="select-input" :class="{ 'with-icon': selectedProduct }">
      <Input
        v-if="!selectedProduct"
        v-model="search"
        type="text"
        placeholder="Ürün adı, barkod yada uts kodu içinde arayın."
        required
      />
      <Input
        v-else
        v-model="selectedProduct.name"
        type="text"
        class="product-input"
        required
        readonly
      />
      <div class="change-icon" @click="clearSelectedProduct">
        <i class="far fa-redo"></i>
      </div>
    </div>
    <!-- #select-input end -->

    <!-- #list-products start -->
    <div v-if="search && !isLoading" id="list-products">
      <div
        v-for="(product, index) in products.results"
        :key="index"
        @click="selectProduct(product)"
      >
        <div class="image">
          <img loading="lazy" :src="`${product.image_url.image}`" />
        </div>
        <span>
          {{ product.name }}
          <span class="status">{{ product.status }}</span>
        </span>
      </div>

      <!-- add new button start -->
      <router-link
        to="/profile/listings/recommendation"
        v-if="products.results.length == 0"
        class="add-new"
      >
        <div class="image">
          <img loading="lazy" :src="`/images/default-image.jpg`" />
        </div>
        <span>
          <strong>{{ search }}</strong>
          ürünü yok, yeni ürün olarak girin
        </span>
        <strong>Yeni</strong>
      </router-link>
      <!-- add new button end -->
    </div>
    <!-- #list-products end -->
  </div>
  <!-- #select-product end -->
</template>

<style lang="scss">
@import '@@/variables';

#select-product {
  width: 100%;
  position: relative;

  #select-input {
    position: relative;

    &.with-icon {
      .input {
        padding-right: 35px;
      }

      .change-icon {
        display: block;
      }
    }

    .change-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      display: none;

      &:hover {
        color: $main-color;
      }
    }
  }

  #list-products {
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 100;
    background: #fff;
    padding: 5px;
    transition: all 0.3s ease 0s;
    border-radius: 0 0 4px 4px;
    box-shadow: 0px 0px 5px rgb(0 0 0 / 14%);
    box-sizing: border-box;
    position: absolute;
    top: 100%;
    left: 0;

    & > div,
    & > a {
      width: 100%;
      min-height: 50px;
      display: flex;
      align-items: center;
      color: $dark;
      cursor: pointer;
      padding: 0 10px;
      box-sizing: border-box;

      span {
        color: $text;
        font-weight: 400;
        line-height: 1.35;
      }

      &:hover {
        background-color: rgba($grey-light, 0.5);
        border-radius: 4px;
      }

      & + div {
        margin-top: 5px;
      }

      &.add-new {
        background-color: rgba($success, 0.05);
        color: $success;

        span {
          color: darken($success, 10%);
        }
      }

      .image {
        width: 50px;
        height: 50px;
        border-radius: 0.35rem;
        overflow: hidden;
        border: 1px solid $grey-light;
        padding: 5px;
        box-sizing: border-box;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      span {
        flex: 1;
        margin: 0 15px;
        font-size: 0.7rem;

        .status {
          margin-left: 5px;
          color: $grey-dark;
          font-size: 0.65rem;
        }
      }

      strong {
        font-size: 0.7rem;
      }
    }
  }
}
</style>
