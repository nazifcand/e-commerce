<script setup>
import { ref, computed } from 'vue';
import { formatPrice, formatNumber } from '@/utils/utils';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';
import { createOrder, fetchContracts } from '@/services/order.service';
import { fetchMe, updateMe, fetchAddresses } from '@/services/user.service';
import { useMainStore } from '@/stores/main.store';
import { useAlertStore } from '@/stores/alert.store';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const mainStore = useMainStore();
const alertStore = useAlertStore();

const title = useTitle(pageTitle('Ödeme'));
const isSaving = ref(false);
const selectedAddress = ref(null);
const cities = ref(mainStore.cities);
const isConfirmed = ref(false);
const iframeModal = ref({
  isOpen: false,
  src: '',
});
const contractModal = ref({
  isOpen: false,
  title: '',
  data: [],
  index: null,
});
const companyCopy = ref({});
const company = ref({
  name: '',
  tax_number: '',
  tax_office: '',
  billing_city: '',
  billing_district: '',
  billing_address: '',
});
const addresses = ref({
  results: [],
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

const showSaveButton = computed(() => {
  if (
    !nameIsDisabled.value ||
    !taxNumberIsDisabled.value ||
    !taxOfficeIsDisabled.value ||
    !billingCityIsDisabled.value ||
    !billingDistrictIsDisabled.value ||
    !billingAddressIsDisabled.value
  )
    return true;
  return false;
});

const cart = computed(() => {
  return mainStore.user.cart.filter((cartItem) =>
    mainStore.selectedCartItems.includes(cartItem.id)
  );
});

const subTotal = computed(() => {
  return cart.value.reduce((total, item) => {
    total += item.quantity * item.listing.price;
    return total;
  }, 0);
});

const total = computed(() => {
  return formatPrice(subTotal.value);
});

(async () => {
  const data = await Promise.all([fetchMe(), fetchAddresses()]);

  const [fetchMeError, fetchMeData] = data[0];
  company.value = fetchMeData.company;
  companyCopy.value = { ...fetchMeData.company };

  const [fetchAddressesError, fetchAddressesData] = data[1];
  addresses.value = fetchAddressesData;
  selectedAddress.value = fetchAddressesData.results[0]?.id ?? null;
})();

const submitHandler = async () => {
  isSaving.value = true;
  const [updateMeError, updateMeData] = await updateMe({
    company: company.value,
  });
  isSaving.value = false;

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

const showContractModal = async (display) => {
  const findAdress = addresses.value.results.find(
    (i) => i.id == selectedAddress.value
  );

  const user = {
    name: findAdress.name,
    address: findAdress.address,
    phone: findAdress.phone,
    email: findAdress.email,
  };

  const sellers = [...new Set(cart.value.map((i) => i.listing.company))];
  const data = sellers.reduce((arr, item) => {
    let dataItem = {
      company_id: item,
      user,
      listings: cart.value
        .map((cartItem) => {
          if (cartItem.listing.company == item) {
            return {
              name: cartItem.listing.product_display.name,
              price: cartItem.listing.price,
              total: (cartItem.listing.price * cartItem.quantity).toFixed(2),
              image: cartItem.listing.product_display.image_url.image,
              quantity: cartItem.quantity,
            };
          }
        })
        .filter((i) => i != null),
    };
    arr.push(dataItem);
    return arr;
  }, []);

  const [err, contracts] = await fetchContracts(data);

  if (display == 'pre') {
    contractModal.value.title = 'Ön Bilgilendirme Formu';
    contractModal.value.data = contracts.pre_information_forms;
  } else {
    contractModal.value.title = 'Mesafeli Satış Sözleşmesi';
    contractModal.value.data = contracts.distance_selling_contracts;
  }

  contractModal.value.isOpen = true;
  contractModal.value.index = null;
};

const showTab = (index) => {
  if (index == contractModal.value.index) {
    contractModal.value.index = null;
    return;
  }
  contractModal.value.index = index;
};

const checkoutHandler = async () => {
  if (!selectedAddress.value) {
    // check address
    alert('adres secimi yok!');
    return;
  }

  // check billing address
  if (showSaveButton.value) {
    alert('fatura bilgilerini girip kaydet tusuna basmalisiniz!');
    return;
  }

  // order data
  const orderData = {
    delivery: selectedAddress.value,
    items: cart.value.reduce((arr, cartItem) => {
      arr.push({
        listing: cartItem.listing.id,
        quantity: cartItem.quantity,
      });
      return arr;
    }, []),
  };

  // create order
  const [createdOrderError, createdOrder] = await createOrder(orderData);

  // is error
  if (createdOrderError) {
    mainStore.showModal({
      title: 'Beklenmedik Hata!',
      text: 'Sipariş oluşturulurken bir hata ile karşılaşıldı!',
      icon: 'fa-times-circle',
      cancelButtonText: 'Kapat!',
    });
    // alertStore.parseValidErrors(createdOrderError.data);
    return;
  }

  iframeModal.value.src = `https://www.paytr.com/odeme/guvenli/${createdOrder.token}`;
  iframeModal.value.isOpen = true;
};
</script>

<template>
  <Breadcrumb>
    <span>Profil</span>
    <router-link to="/cart">Sepetim</router-link>
    <strong>Ödemeyi Tamamla</strong>
  </Breadcrumb>

  <!-- contract modal start -->
  <Modal
    v-model:open="contractModal.isOpen"
    :title="contractModal.title"
    size="medium"
  >
    <template #content>
      <!-- #sellers start -->
      <div id="sellers">
        <!-- .seller start -->
        <div
          v-for="(contract, index) in contractModal.data"
          class="seller"
          :class="{ open: index == contractModal.index }"
        >
          <!-- .seller-title start -->
          <div class="seller-title" @click="showTab(index)">
            <div class="title">
              <span>Mağaza</span>
              <strong>{{ contract.seller }}</strong>
            </div>
          </div>
          <!-- .seller-title end -->
          <!-- .seller-content start -->
          <div class="seller-content" v-html="contract.content"></div>
          <!-- .seller-content end -->
        </div>
        <!-- .seller end -->
      </div>
      <!-- #sellers end -->
    </template>
  </Modal>
  <!-- contract modal end -->

  <!-- iframe modal start -->
  <Modal v-model:open="iframeModal.isOpen" title="Ödemeyi Tamamla">
    <template #content>
      <iframe :src="iframeModal.src" frameborder="0" id="paytriframe"></iframe>
    </template>
  </Modal>
  <!-- iframe modal end -->

  <!-- #page start -->
  <div class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #content start -->
      <div id="content">
        <!-- alert start -->
        <Alerts />
        <!-- alert end -->

        <!-- billing start -->
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
            <div v-if="showSaveButton" class="group group-submit">
              <LoadingButton
                :loading="isSaving"
                title="Değişiklikleri Kaydet"
              />
            </div>
            <!-- .group end -->
          </form>
        </div>
        <!-- billing end -->

        <!-- #addresses start -->
        <div v-if="addresses.results.length" id="addresses" class="base">
          <!-- .address start -->
          <div
            v-for="(address, index) in addresses.results"
            :key="index"
            class="address clickable"
            :class="{ selected: selectedAddress == address.id }"
            @click="selectedAddress = address.id"
          >
            <!-- .address-title start -->
            <div class="address-title">
              <strong>
                {{ address.title }}
              </strong>
              <div v-if="selectedAddress == address.id" class="label primary">
                Seçili
              </div>
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
              <strong
                >{{ address.city_name }} / {{ address.district_name }}</strong
              >
            </div>

            <div class="info">
              <span>Açık Adres : </span>
              <strong>{{ address.address }}</strong>
            </div>
          </div>
          <!-- .address end -->
        </div>
        <!-- #addresses end -->

        <!-- not found address start -->
        <div v-if="!addresses.results.length" class="not-found-text base">
          Herhangi bir teslimat adresi eklemediniz.
          <router-link to="/profile/settings/addresses"
            >Teslimat adresi eklemek için tıklayın.</router-link
          >
        </div>
        <!-- not found address end -->
      </div>
      <!-- #content end -->

      <!-- #sidebar start -->
      <div id="sidebar">
        <Widget>
          <!-- .widget-cart-item start -->
          <div
            v-for="(cartItem, index) in cart"
            :key="index"
            class="widget-cart-item"
          >
            <!-- .name start -->
            <div class="name">
              {{ cartItem.listing.product_display.name }}
              <strong>
                {{ formatNumber(cartItem.listing.quantity) }} Adet</strong
              >
            </div>
            <!-- .name end -->

            <!-- .price start -->
            <div class="price">
              <strong>{{ formatPrice(cartItem.listing.price) }} TL</strong>
            </div>
            <!-- .price end -->
          </div>
          <!-- .widget-cart-item end -->

          <!-- .widget-cart-total start -->
          <div class="widget-cart-total">
            <span>TOPLAM</span>
            <strong>{{ total }} TL</strong>
          </div>
          <!-- .widget-cart-total end -->

          <!-- checkout button start -->
          <a
            to="#"
            class="btn primary dark checkout-btn"
            @click="checkoutHandler"
            v-if="selectedAddress && isConfirmed"
          >
            Ödemeyi Tamamla
          </a>

          <div style="margin-top: 1rem">
            <Checkbox v-model="isConfirmed" required>
              <a href="#" @click.prevent="showContractModal('pre')"
                ><strong>Ön Bilgilendirme Formu`nu</strong></a
              >
              ve
              <a href="#" @click.prevent="showContractModal('contract')"
                ><strong>Mesafeli Satış Sözleşmesi`ni</strong></a
              >
              okudum ve onaylıyorum.
            </Checkbox>
          </div>
          <!-- checkout button end -->
        </Widget>
      </div>
      <!-- #sidebar end -->
    </div>
    <!-- #page end -->
  </div>
  <!-- #page end -->
</template>

<style lang="scss">
@import '@@/variables';

.widget-cart-item {
  display: flex;
  align-items: center;
  font-size: 0.8rem;

  & + .widget-cart-item {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid $grey-light;
  }

  .name {
    color: $text;
    line-height: 1.35;
    display: flex;
    flex-direction: column;

    strong {
      color: $text-light;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
  }

  .price {
    width: 85px;
    min-width: 85px;
    text-align: right;
    margin-left: auto;
    color: $main-color;
  }
}

.widget-cart-total {
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid $grey-light;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: $text-light;
  }

  strong {
    font-size: 1.1rem;
  }
}

.checkout-btn {
  height: 50px;
  margin-top: 2rem;
}
</style>
