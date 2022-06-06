<script setup>
import { computed, ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

// services
import { fetchMe, updateMe } from '@/services/user.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const isLoading = ref(false);
const title = useTitle(pageTitle('Mağaza Bilgileri'));
const cities = ref(mainStore.cities);
const companyCopy = ref({
  bank_account_name: '',
  billing_address: '',
  billing_city: '',
  billing_district: '',
  commission_rate: '',
  company_no: '',
  company_phone: '',
  iban: '',
  mms_approval: true,
  name: '',
  seller_note: '',
  short_name: '',
  tax_number: '',
  tax_office: '',
});
const company = ref({
  bank_account_name: null,
  billing_address: null,
  billing_city: null,
  billing_district: null,
  commission_rate: null,
  company_no: '',
  company_phone: '',
  iban: null,
  mms_approval: true,
  name: '',
  seller_note: null,
  short_name: '',
  tax_number: null,
  tax_office: null,
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
  const findCity = cities.value.find(
    (city) => city.id == company.value.billing_city
  );

  if (!findCity) return [];

  return findCity.district.reduce((arr, item) => {
    arr.push({
      label: item.name,
      value: item.id,
    });
    return arr;
  }, []);
});

const isDisabled = (field) => {
  return !field || field == '' ? true : false;
};

const nameIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.name);
});

const shortNameIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.short_name);
});

const companyNoIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.company_no);
});

const taxNumberIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.tax_number);
});

const taxOfficeIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.tax_office);
});

const billingCityIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.billing_city);
});

const billingDistrictIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.billing_district);
});

const billingAddressIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.billing_address);
});

const bankAccountNameIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.bank_account_name);
});

const ibanIsDisabled = computed(() => {
  return !isDisabled(companyCopy.value.iban);
});

(async () => {
  mainStore.isLoading = true;
  alertStore.add({
    text: '<p>Güncelleyemediğiniz firma bilgilerini güncellemek için müşteri hizmetleri ile iletişime geçebilirsiniz.</p>',
    class: 'warning',
    deletable: false,
  });
  const [fetchMeError, fetchMeData] = await fetchMe();
  company.value = fetchMeData.company;
  companyCopy.value = { ...fetchMeData.company };

  mainStore.isLoading = false;
})();

const submitHandler = async () => {
  isLoading.value = true;
  const [updateMeError, updateMeData] = await updateMe({
    company: company.value,
  });
  isLoading.value = false;

  // is error
  if (updateMeError) {
    alertStore.parseValidErrors(updateMeError.data);
    return;
  }

  // success
  alertStore.add({
    text: '<p>Firma bilgileriniz başarıyla güncellendi.</p>',
    class: 'success',
  });

  company.value = updateMeData.company;
  companyCopy.value = { ...updateMeData.company };
};
</script>

<template>
  <!-- alert start -->
  <Alerts />
  <!-- alert end -->

  <div class="base">
    <form @submit.prevent="submitHandler">
      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Firma Adı</span>
        </span>
        <Input
          v-model="company.name"
          type="text"
          :disabled="nameIsDisabled"
          placeholder="Firma adı girin"
          required
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Mağaza Kısa Adı</span>
          <Question text="Uygulama mağaza ismi" />
        </span>
        <Input
          v-model="company.short_name"
          :disabled="shortNameIsDisabled"
          type="text"
          minlength="5"
          maxlength="8"
          placeholder="Uygulama ismi girin"
          required
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Firma Numarası</span>
        </span>
        <Input
          v-model="company.company_no"
          :disabled="companyNoIsDisabled"
          type="text"
          minlength="11"
          maxlength="15"
          placeholder="Firma numarası girin"
          required
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Vergi Numarası</span>
        </span>
        <Input
          v-model="company.tax_number"
          :disabled="taxNumberIsDisabled"
          type="text"
          minlength="10"
          maxlength="11"
          placeholder="Vergi numarası girin"
          required
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Vergi Dairesi</span>
        </span>
        <Input
          v-model="company.tax_office"
          :disabled="taxOfficeIsDisabled"
          type="text"
          placeholder="Vergi dairesi girin"
          required
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Şehir</span>
        </span>
        <SingleSelect
          v-model="company.billing_city"
          :disabled="billingCityIsDisabled"
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
          v-model="company.billing_district"
          :options="getDistricts"
          type="text"
          :disabled="billingDistrictIsDisabled || !company.billing_city"
          required
          placeholder="İlçe seçiniz"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Adres</span>
        </span>
        <Textarea
          v-model="company.billing_address"
          :disabled="billingAddressIsDisabled"
          placeholder="Adres girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Ödeme Yapılacak IBAN Ad Soyad</span>
        </span>
        <Input
          v-model="company.bank_account_name"
          :disabled="bankAccountNameIsDisabled"
          type="text"
          required
          placeholder="Banka hesap adı girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Ödeme Yapılacak IBAN</span>
        </span>
        <Input
          v-if="company.iban"
          v-model="company.iban"
          :disabled="ibanIsDisabled"
          type="text"
          required
          placeholder="IBAN girin"
          :mask="'TR## #### #### #### #### #### ##'"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="">
          <span>Satıcı Notu</span>
        </span>
        <Textarea
          v-model="company.seller_note"
          type="text"
          placeholder="Satıcı notu girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-submit">
        <LoadingButton :loading="isLoading" title="Değişiklikleri Kaydet" />
      </div>
      <!-- .group end -->
    </form>
  </div>
</template>
