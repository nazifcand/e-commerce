<script setup>
import { computed, ref } from 'vue';
import { formatPrice, formatDate } from '@/utils/utils';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';
import { fetchOrder } from '@/services/order.service';
import { useMainStore } from '@/stores/main.store';
import { fetchDocument } from '@/services/common.service';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const mainStore = useMainStore();

const title = useTitle(pageTitle('Sipariş Detayı'));
const order = ref(null);
const contractModal = ref({
  isOpen: false,
  title: '',
  data: [],
  index: null,
});

const status = computed(() => {
  let status = { class: 'success', label: 'Tamamlandı' };

  // order items statusess
  const statusess = [...new Set(order.value.order_items.map((i) => i.status))];

  // awaiting
  if (statusess.length == 1 && statusess[0] == 'awaiting') {
    status = { class: 'info', label: 'Onay Bekleniyor' };
  }

  // cancelled
  if (statusess.length == 1 && statusess[0] == 'canceled') {
    status = { class: 'danger', label: 'Alıcı tarafından iptal Edildi' };
  }

  // rejected
  if (statusess.length == 1 && statusess[0] == 'rejected') {
    status = { class: 'danger', label: 'Satıcı tarafından iptal Edildi' };
  }

  // rejected
  if (statusess.includes('awaiting')) {
    status = { class: 'info', label: 'Bekliyor' };
  }

  return status;
});

(async () => {
  mainStore.isLoading = true;
  const [error, orderData] = await fetchOrder(route.params.orderID);
  order.value = orderData;
  mainStore.isLoading = false;
})();

const showTab = (index) => {
  if (index == contractModal.value.index) {
    contractModal.value.index = null;
    return;
  }
  contractModal.value.index = index;
};

const showContractModal = async (display) => {
  const [err, document] = await fetchDocument(order.value.document);

  if (err) {
    alert('document hatasi');
    return;
  }

  const contracts = fetch(document.document).then((res) => res.json());

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
</script>

<template>
  <Breadcrumb v-if="order">
    <span>Profil</span>
    <span>Siparişlerim</span>
    <router-link to="/profile/orders/buyings">Satın Aldıklarım</router-link>
    <strong>{{ order.order_no }} numaralı sipariş</strong>
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

  <div v-bind="$attrs" id="order-view-page" class="container">
    <!-- #page start -->
    <div v-if="order" id="page">
      <!-- #content start -->
      <div id="content">
        <!-- new order message start -->
        <div v-if="route.query.new" class="base">
          <div class="alert success">
            <p>
              Siparişiniz başarıyla oluşturuldu, en kısa sürede hazırlanıp
              kargoya verilecektir.
            </p>
          </div>
        </div>
        <!-- new order message end -->

        <!-- #order-detail start -->
        <div id="order-detail" class="base">
          <!-- .detail start -->
          <div class="detail">
            <div class="title">Sipariş Detayları</div>
            <div>
              <span>Ürün Sayısı : </span>
            </div>
            <div>
              <span>Toplam : </span>
              <strong>{{ formatPrice(order.total) }} TL</strong>
            </div>
            <div>
              <span>Mesafeli Satış Sözleşmesi : </span>
              <strong>
                <a href="#" @click.prevent="showContractModal('contract')">
                  Gör
                  <i class="fal fa-eye"></i>
                </a>
              </strong>
            </div>
            <div>
              <span>Ön Bilgilendirme Formu : </span>
              <strong>
                <a href="#" @click.prevent="showContractModal('pre')">
                  Gör
                  <i class="fal fa-eye"></i>
                </a>
              </strong>
            </div>
          </div>
          <!-- .detail end -->

          <!-- .detail start -->
          <div class="detail">
            <div class="title">Teslimat Bilgileri</div>
            <div>
              <span>Teslim Alacak : </span>
              <strong>{{ order.delivery_name }}</strong>
            </div>
            <div>
              <span>Telefon : </span>
              <strong>{{ order.delivery_phone }}</strong>
            </div>
            <div>
              <span>E-posta : </span>
              <strong>{{ order.delivery_email }}</strong>
            </div>
            <div>
              <span>İl / İlçe : </span>
              <strong>
                {{ order.delivery_city }} /
                {{ order.delivery_district }}
              </strong>
            </div>
            <div>
              <span>Adres : </span>
              <strong>{{ order.delivery_address }}</strong>
            </div>
          </div>
          <!-- .detail end -->

          <!-- .detail start -->
          <div class="detail">
            <div class="title">Alıcı Fatura Bilgileri</div>
            <div>
              <span>İsim Soyisim : </span>
              <strong>{{ order.billing_name }}</strong>
            </div>
            <div>
              <span>Vergi Numarası : </span>
              <strong>{{ order.tax_number }}</strong>
            </div>
            <div>
              <span>Vergi Dairesi : </span>
              <strong>{{ order.tax_office }}</strong>
            </div>
            <div>
              <span>İl / İlçe : </span>
              <strong
                >{{ order.billing_city }} / {{ order.billing_district }}</strong
              >
            </div>
            <div>
              <span>Adres : </span>
              <strong>{{ order.billing_address }}</strong>
            </div>
          </div>
          <!-- .detail end -->
        </div>

        <!-- #order-detail end -->
        <ListOrderItems :items="order.order_items" />
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>

<style lang="scss" scoped>
@import '@@/variables';
</style>
