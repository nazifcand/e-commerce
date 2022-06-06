<script setup>
import { ref } from 'vue';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();
</script>

<template>
  <!-- #footer start -->
  <div id="footer">
    <!-- #footer-top start -->
    <div id="footer-top">
      <div class="container">
        <!-- .footer-widget start -->
        <div class="footer-widget">
          <h4>İletişim</h4>
          <div class="site-info">
            <a href="#">
              <i class="fal fa-map-marker-alt"></i>
              <span
                >Cumhuriyet Mahallesi 30.Sokak NO:15/14 Erkmen /
                Afyonkarahisar</span
              >
            </a>
            <a :href="`tel:${mainStore.settings.phone}`">
              <i class="fal fa-phone"></i>
              <span>{{ mainStore.settings.phone }}</span>
            </a>
            <a :href="`mailto:${mainStore.settings.email}`">
              <i class="fal fa-envelope"></i>
              <span>{{ mainStore.settings.email }}</span>
            </a>
          </div>
        </div>
        <!-- .footer-widget end -->

        <!-- .footer-widget start -->
        <div class="footer-widget">
          <h4>Kurumsal</h4>
          <ul>
            <li>
              <router-link to="/pages/hakkimizda">Hakkımızda</router-link>
            </li>

            <li>
              <router-link to="/pages/aydinlatma-metni"
                >Aydınlatma Metni</router-link
              >
            </li>

            <li>
              <router-link to="/pages/uyelik-sozlesmesi"
                >Üyelik Sözleşmesi</router-link
              >
            </li>

            <li>
              <router-link to="/pages/cerez-politikasi"
                >Çerez Politikası</router-link
              >
            </li>
          </ul>
        </div>
        <!-- .footer-widget end -->
      </div>
    </div>
    <!-- #footer-top end -->

    <!-- #footer-bottom start -->
    <div id="footer-bottom">
      <div class="container">
        <img loading="lazy" src="/images/logo.png" alt="www.medikaport.com" />
        <p>Copyright © 2022 medikaport.com, Her hakkı saklıdır.</p>
      </div>
    </div>
    <!-- #footer-bottom end -->
  </div>
  <!-- #footer end -->
</template>
