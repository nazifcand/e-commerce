<script setup>
import { ref, watch } from 'vue';
import { formatDate, formatPrice } from '@/utils/utils';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchBuyingOrders, completePayment } from '@/services/order.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const title = useTitle(pageTitle('Satın Aldıklarım'));
const columns = ref([
  {
    title: 'No',
    type: 'order-no',
    sortable: 'order_no',
  },
  {
    title: 'Tarih',
    type: 'date',
    sortable: 'order_date',
  },
  {
    title: 'Ürün Sayısı',
    type: 'item-count',
  },
  {
    title: 'Toplam',
    type: 'price',
    sortable: 'price',
  },
  {
    title: 'Durum',
    type: 'order-status',
  },
  {
    title: 'Ödeme Durumu',
    type: 'payment-status',
  },
  {
    title: '',
    type: 'action',
  },
  {
    title: '',
    type: 'action',
  },
]);
const iframeModal = ref({
  isOpen: false,
  src: '',
});
const orders = ref({
  total: 0,
  page_size: 25,
  results: [],
});

const fetchData = async () => {
  mainStore.isLoading = true;
  const [error, ordersData] = await fetchBuyingOrders({
    ordering: '-order_date',
    ...route.query,
  });
  orders.value = ordersData;
  mainStore.isLoading = false;
};
fetchData();

const completePaymentHandler = async (order) => {
  const [completePaymentError, completePaymentData] = await completePayment(
    order.id
  );
  iframeModal.value.src = `https://www.paytr.com/odeme/guvenli/${completePaymentData.token}`;
  iframeModal.value.isOpen = true;
};

watch(route, (to) => {
  if (to.name != 'profile-orders-buyings') return;
  fetchData();
});
</script>

<template>
  <Breadcrumb>
    <span>Profil</span>
    <span>Siparişlerim</span>
    <strong>Satın Aldıklarım</strong>
  </Breadcrumb>

  <!-- iframe modal start -->
  <Modal v-model:open="iframeModal.isOpen" title="Ödemeyi Tamamla">
    <template #content>
      <iframe :src="iframeModal.src" frameborder="0" id="paytriframe"></iframe>
    </template>
  </Modal>
  <!-- iframe modal end -->

  <div class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #content start -->
      <div id="content">
        <!-- alert start -->
        <Alerts />
        <!-- alert end -->

        <!-- orders start -->
        <div class="base">
          <DataGrid :columns="columns">
            <!-- .row start -->
            <div
              v-for="(order, index) in orders.results"
              :key="index"
              class="row"
            >
              <!-- .cell start -->
              <div class="cell cell-order-no">
                {{ order.order_no }}
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-date">
                {{ formatDate(order.order_date) }}
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-item-count">
                {{ order.order_items.length }} ürün
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-price">
                {{ formatPrice(order.total) }} TL
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-order-status">
                {{
                  [
                    ...new Set(order.order_items.map((i) => i.status_display)),
                  ].join(', ')
                }}
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-payment-status">
                {{
                  [
                    ...new Set(order.order_items.map((i) => i.payment_status)),
                  ][0]
                }}
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-action">
                <template
                  v-if="
                    ['Ödeme Bekleniyor', 'Ödeme Başarısız'].includes(
                      [
                        ...new Set(
                          order.order_items.map((i) => i.payment_status)
                        ),
                      ][0]
                    )
                  "
                >
                  <div class="action" @click="completePaymentHandler(order)">
                    <i class="fal fa-redo-alt"></i>
                  </div>
                </template>
              </div>
              <!-- .cell end -->

              <!-- .cell start -->
              <div class="cell cell-action">
                <router-link
                  :to="`/profile/orders/buyings/view/${order.id}`"
                  class="action"
                >
                  <i class="fal fa-eye"></i>
                </router-link>
              </div>
              <!-- .cell end -->
            </div>
            <!-- .row end -->
          </DataGrid>
        </div>
        <!-- orders end -->

        <!-- pagination start -->
        <Pagination :total="orders.total" :size="orders.page_size" />
        <!-- pagination end -->
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>

<style lang="scss" scoped>
@import '@@/variables';

.order {
  width: 100%;
  height: 60px;
  border: 1px solid $grey;
  border-radius: 0.35rem;
  display: flex;
  align-items: center;
  padding: 0 25px;
  box-sizing: border-box;
  font-size: 0.85rem;

  & + .order {
    margin-top: 1rem;
  }
}
</style>
