<script setup>
import { ref } from 'vue';
</script>

<template>
  <!-- .action start -->
  <div class="action">
    <!-- .icon start -->
    <router-link to="/profile/notifications" class="icon">
      <i class="fal fa-bell"></i>
      <span class="badge">6</span>
    </router-link>
    <!-- .icon end -->

    <!-- .detail start -->
    <div class="detail notifications">
      <!-- .title start -->
      <div class="title">
        <strong>Bildirimler</strong>
      </div>
      <!-- .title end -->

      <!-- .content start -->
      <div class="content">
        <!-- .notification start -->
        <router-link to="/listings/11" class="notification unread">
          <p>Yeni siparişiniz var!</p>
          <time>09 Mar - 10.39</time>
        </router-link>
        <!-- .notification end -->

        <!-- .notification start -->
        <router-link to="/listings/22" class="notification unread">
          <p>
            Banka hesabınıza para transferi yapılmıştır. Ödeme detayını görmek
            için tıklayın.
          </p>
          <time>Bugün - 10.39</time>
        </router-link>
        <!-- .notification end -->

        <!-- .notification start -->
        <router-link to="/listings/33" class="notification">
          <p>
            <strong>eadev</strong> sipariş için para aktarımını onayladı.
            Sipariş oluşturulma tarihinden sonraki 7. günde paranız hesabınıza
            aktarılacaktır.
          </p>
          <time>Bugün - 10.39</time>
        </router-link>
        <!-- .notification end -->

        <!-- .notification start -->
        <router-link to="/listings/44" class="notification">
          <p>Yeni siparişiniz var!</p>
          <time>09 Mar - 10.39</time>
        </router-link>
        <!-- .notification end -->

        <!-- .notification start -->
        <router-link to="/listings/55" class="notification unread">
          <p>
            Banka hesabınıza para transferi yapılmıştır. Ödeme detayını görmek
            için tıklayın.
          </p>
          <time>Bugün - 10.39</time>
        </router-link>
        <!-- .notification end -->

        <!-- .notification start -->
        <router-link to="/listings/66" class="notification unread">
          <p>
            <strong>eadev</strong> sipariş için para aktarımını onayladı.
            Sipariş oluşturulma tarihinden sonraki 7. günde paranız hesabınıza
            aktarılacaktır.
          </p>
          <time>Bugün - 10.39</time>
        </router-link>
        <!-- .notification end -->
      </div>
      <!-- .content end -->

      <!-- .footer start -->
      <div class="footer">
        <router-link to="/profile/notifications"
          >Tüm Bildirimleri Gör</router-link
        >
      </div>
      <!-- .footer end -->
    </div>
    <!-- .detail end -->
  </div>
  <!-- .action end -->
</template>
