<script setup>
import { computed, ref } from 'vue';
import { formatPrice, formatDate } from '@/utils/utils';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';
import { fetchOrder } from '@/services/order.service';
import { useMainStore } from '@/stores/main.store';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const mainStore = useMainStore();

const title = useTitle(pageTitle('Sipariş Detayı'));
const order = ref(null);

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
</script>

<template>
  <Breadcrumb v-if="order">
    <span>Profil</span>
    <span>Siparişlerim</span>
    <router-link to="/profile/orders/sellings">Sattıklarım</router-link>
    <strong>{{ order.order_no }} numaralı sipariş</strong>
  </Breadcrumb>

  <div v-bind="$attrs" id="order-view-page" class="container">
    <!-- #page start -->
    <div v-if="order" id="page">
      <!-- #content start -->
      <div id="content">
        <!-- #order-detail start -->
        <div id="order-detail" class="base">
          <!-- .detail start -->
          <div class="detail">
            <div class="title">Sipariş Detayları</div>
            <div>
              <span>Ürün Sayısı : </span>
              <strong>{{ order.order_items.length }} ürün </strong>
            </div>
            <div>
              <span>Toplam : </span>
              <strong>{{ formatPrice(order.total) }} TL</strong>
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
        <ListOrderItems :items="order.order_items" type="seller" />
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>

<style lang="scss" scoped>
@import '@@/variables';
</style>
