<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const title = useTitle(pageTitle('Bildirimler'));
</script>

<template>
  <Breadcrumb>
    <span>Profil</span>
    <strong>Bildirimler</strong>
  </Breadcrumb>

  <!-- #notification-page start -->
  <div class="container">
    <div id="notification-page">
      <!-- .notification start -->
      <div class="notification unread">
        <p>Yeni siparişiniz var!</p>
        <time>09 Mar - 10.39</time>
      </div>
      <!-- .notification end -->

      <!-- .notification start -->
      <div class="notification unread">
        <p>
          Banka hesabınıza para transferi yapılmıştır. Ödeme detayını görmek
          için tıklayın.
        </p>
        <time>Bugün - 10.39</time>
      </div>
      <!-- .notification end -->

      <!-- .notification start -->
      <div class="notification">
        <p>
          <strong>eadev</strong> sipariş için para aktarımını onayladı. Sipariş
          oluşturulma tarihinden sonraki 7. günde paranız hesabınıza
          aktarılacaktır.
        </p>
        <time>Bugün - 10.39</time>
      </div>
      <!-- .notification end -->

      <!-- .notification start -->
      <div class="notification">
        <p>Yeni siparişiniz var!</p>
        <time>09 Mar - 10.39</time>
      </div>
      <!-- .notification end -->

      <!-- .notification start -->
      <div class="notification unread">
        <p>
          Banka hesabınıza para transferi yapılmıştır. Ödeme detayını görmek
          için tıklayın.
        </p>
        <time>Bugün - 10.39</time>
      </div>
      <!-- .notification end -->

      <!-- .notification start -->
      <div class="notification unread">
        <p>
          <strong>eadev</strong> sipariş için para aktarımını onayladı. Sipariş
          oluşturulma tarihinden sonraki 7. günde paranız hesabınıza
          aktarılacaktır.
        </p>
        <time>Bugün - 10.39</time>
      </div>
      <!-- .notification end -->
    </div>
  </div>
  <!-- #notification-page end -->

  <!-- pagination start -->
  <div class="container">
    <Pagination :total="1210" :size="25" />
  </div>
  <!-- pagination end -->
</template>
