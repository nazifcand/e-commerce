<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['newAddress']);

// services
import { createAddress } from '@/services/user.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const isLoading = ref(false);
const cities = ref(mainStore.cities);
const address = ref({
  title: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  district: '',
  city: '',
});

const getCities = computed(() => {
  return cities.value.reduce((arr, item) => {
    arr.push({
      label: item.name,
      value: item.id,
    });
    return arr;
  }, []);
});

const getDistricts = computed(() => {
  const findCity = cities.value.find((city) => city.id == address.value.city);

  if (!findCity) return [];

  return findCity.district.reduce((arr, item) => {
    arr.push({
      label: item.name,
      value: item.id,
    });
    return arr;
  }, []);
});

const clearForm = () => {
  address.value = {
    ...{
      title: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      district: '',
      city: '',
    },
  };
};

const submitHandler = async () => {
  isLoading.value = true;

  // create address
  const [createdAddressError, createdAddress] = await createAddress(
    address.value
  );
  isLoading.value = false;

  // is error
  if (createdAddressError) {
    alertStore.parseValidErrors(createdAddressError.data);
    return;
  }

  // success
  clearForm();
  emit('newAddress', createdAddress);
};
</script>

<template>
  <!-- alerts start -->
  <Alerts />
  <!-- alerts end -->

  <div id="new-address" class="base">
    <form autocomplete="off" @submit.prevent="submitHandler">
      <!-- .group start -->
      <div class="group group-12">
        <span class="required">
          <span>Başlık</span>
        </span>
        <Input v-model="address.title" required placeholder="Başlık girin" />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-4">
        <span class="required">
          <span>Ad Soyad</span>
        </span>
        <Input v-model="address.name" required placeholder="Ad soyad girin" />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-4">
        <span class="required">
          <span>Telefon</span>
        </span>
        <Input v-model="address.phone" required placeholder="Telefon girin" />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-4">
        <span class="required">
          <span>E-posta</span>
        </span>
        <Input
          v-model="address.email"
          type="email"
          required
          placeholder="E-posta adresi girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Şehir</span>
        </span>
        <SingleSelect
          v-model="address.city"
          :options="getCities"
          type="text"
          required
          placeholder="Şehir seçiniz"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>İlçe</span>
        </span>
        <SingleSelect
          v-model="address.district"
          :options="getDistricts"
          type="text"
          required
          :disabled="!address.city"
          placeholder="İlçe seçiniz"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Açık Adres</span>
        </span>
        <Textarea
          v-model="address.address"
          required
          placeholder="Açık adres girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-submit">
        <LoadingButton :loading="isLoading" />
      </div>
      <!-- .group end -->
    </form>
  </div>
</template>
