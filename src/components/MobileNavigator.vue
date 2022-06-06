<script setup>
import { computed, ref } from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter();

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const cartItemCount = computed(() => {
  return mainStore.user.cart.length;
});

const favouriteItemCount = computed(() => {
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
  <!-- #mobile-nav start -->
  <div id="mobile-nav">
    <!-- .action start -->
    <div class="action">
      <!-- .icon start -->
      <router-link to="/" class="icon">
        <i class="fal fa-home"></i>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- .action start -->
    <div class="action">
      <!-- .icon start -->
      <router-link to="/profile/listings" class="icon">
        <i class="fal fa-plus-square"></i>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- .action start -->
    <div class="action">
      <!-- .icon start -->
      <router-link to="/profile/orders/buyings" class="icon">
        <i class="fal fa-clock"></i>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- .action start -->
    <div class="action">
      <!-- .icon start -->
      <router-link to="/profile/orders/sellings" class="icon">
        <i class="fal fa-store"></i>
        <span v-if="newOrderCount != 0" class="badge">{{ newOrderCount }}</span>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- .action start -->
    <div class="action">
      <!-- .icon start -->
      <router-link to="/cart" class="icon">
        <i class="fal fa-shopping-cart"></i>
        <span v-if="cartItemCount != 0" class="badge">{{ cartItemCount }}</span>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- .action start -->
    <div class="action">
      <!-- .icon start -->
      <router-link to="/profile/favourites" class="icon">
        <i class="fal fa-heart"></i>
        <div v-if="favouriteItemCount != 0" class="badge">
          {{ favouriteItemCount }}
        </div>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- .action start -->
    <div v-if="false" class="action">
      <!-- .icon start -->
      <router-link to="/profile/notifications" class="icon">
        <i class="fal fa-bell"></i>
        <span class="badge">6</span>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- .action start -->
    <div v-if="false" class="action">
      <!-- .icon start -->
      <router-link to="/profile/messages" class="icon">
        <i class="fal fa-comment"></i>
        <span class="badge">6</span>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- .action start -->
    <div class="action">
      <!-- .icon start -->
      <router-link to="/profile/settings" class="icon">
        <i class="fal fa-cog"></i>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- .action start -->
    <div class="action">
      <!-- .icon start -->
      <a href="#" class="icon" @click.prevent="logOut">
        <i class="fal fa-sign-out"></i>
      </a>
      <!-- .icon end -->
    </div>
    <!-- .action end -->
  </div>
  <!-- #mobile-nav end -->
</template>
