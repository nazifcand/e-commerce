<script setup>
import { ref, computed } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

// services
import { fetchAddresses, removeAddress } from '@/services/user.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const title = useTitle(pageTitle('Adreslerim'));
const addresses = ref({
  total: 0,
  page_size: 0,
  results: [],
  page: 1,
});

(async () => {
  mainStore.isLoading = true;
  const [fetchAddressesError, fetchAddressesData] = await fetchAddresses();
  addresses.value = fetchAddressesData;
  mainStore.isLoading = false;
})();

const removeItem = (address, index) => {
  mainStore.showModal({
    text: `<strong>${address.title}</strong> adresini silmek istiyor musunuz?`,
    payload: { address, index },
    confirm: async () => {
      const [removeAddressError, removeAddressData] = await removeAddress(
        address.id
      );

      // is error
      if (removeAddressError) return;

      --addresses.value.total;
      addresses.value.results.splice(index, 1);
    },
  });
};

const newAddressHandler = (address) => {
  address['isNew'] = true;
  addresses.value.results.unshift(address);
};
</script>

<template>
  <!-- #new-address start -->
  <NewAddress @newAddress="newAddressHandler" />
  <!-- #new-address end -->

  <!-- #addresses start -->
  <div v-if="addresses.results.length" id="addresses" class="base">
    <!-- .address start -->
    <div
      v-for="(address, index) in addresses.results"
      :key="index"
      class="address"
    >
      <!-- .address-title start -->
      <div class="address-title">
        <strong>
          <div v-if="address.isNew" class="label success">yeni</div>
          {{ address.title }}
        </strong>
        <i
          class="far fa-trash-alt remove"
          @click="removeItem(address, index)"
        ></i>
      </div>
      <!-- .address-title end -->

      <div class="info">
        <span> Teslim Alacak : </span>
        <strong>{{ address.name }}</strong>
      </div>

      <div class="info">
        <span>Telefon : </span>
        <strong>{{ address.phone }}</strong>
      </div>

      <div class="info">
        <span>E-posta : </span>
        <strong>{{ address.email }}</strong>
      </div>

      <div class="info">
        <span>Şehir / İlçe : </span>
        <strong>{{ address.city_name }} / {{ address.district_name }}</strong>
      </div>

      <div class="info">
        <span>Açık Adres : </span>
        <strong>{{ address.address }}</strong>
      </div>
    </div>
    <!-- .address end -->
  </div>
  <!-- #addresses end -->

  <!-- not found text start -->
  <div v-if="!addresses.results.length" class="base">
    <p class="not-found-text">Herhangi bir adres eklemediniz.</p>
  </div>
  <!-- not found text end -->
</template>
