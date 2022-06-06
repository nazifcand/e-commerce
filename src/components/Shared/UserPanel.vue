<script setup>
import { ref, computed } from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter();

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const favouritesCount = computed(() => {
  return mainStore.user.favourites.length;
});

const newOrderCount = computed(() => {
  return mainStore.passiveNotifications.new_order;
});

const logOut = () => {
  router.push('/account/login');
  localStorage.removeItem('token');
  localStorage.removeItem('recentlyVisitedProducts');
  mainStore.isLoggedIn = false;
  mainStore.user = {
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    phone: '',
    is_active: '',
    cart: [],
    favourites: [],
  };
};
</script>

<template>
  <!-- .action start -->
  <div class="action">
    <!-- .icon start -->
    <div class="icon">
      <i class="fal fa-user"></i>
      <span v-if="newOrderCount != 0" class="badge"> {{ newOrderCount }} </span>
    </div>
    <!-- .icon end -->
    <!-- .detail start -->
    <div class="detail user">
      <!-- .content start -->
      <div class="content">
        <!-- .user-link start -->
        <router-link to="/profile/evaluations" class="user-link">
          <span>Puan ve Yorumlarım</span>
        </router-link>
        <!-- .user-link end -->

        <!-- .user-link start -->
        <router-link to="/profile/listings" class="user-link">
          <span>İlanlarım</span>
        </router-link>
        <!-- .user-link end -->

        <!-- .user-link start -->
        <router-link to="/profile/orders/sellings" class="user-link">
          <span>Sattıklarım</span>
          <div v-if="newOrderCount != 0" class="badge warning">
            {{ newOrderCount }}
          </div>
        </router-link>
        <!-- .user-link end -->

        <!-- .user-link start -->
        <router-link to="/profile/orders/buyings" class="user-link">
          <span>Satın Aldıklarım</span>
        </router-link>
        <!-- .user-link end -->

        <!-- .user-link start -->
        <router-link to="/profile/favourites" class="user-link">
          <span>Favorilerim</span>
          <div v-if="favouritesCount" class="badge warning">
            {{ favouritesCount }}
          </div>
        </router-link>
        <!-- .user-link end -->

        <!-- .user-link start -->
        <router-link to="/profile/settings" class="user-link">
          <span>Ayarlarım</span>
        </router-link>
        <!-- .user-link end -->

        <!-- .user-link start -->
        <router-link @click.prevent="logOut" to="#" class="user-link">
          <span>Çıkış Yap</span>
        </router-link>
        <!-- .user-link end -->
      </div>
      <!-- .content end -->
    </div>
    <!-- .detail end -->
  </div>

  <!-- .action end -->
</template>
