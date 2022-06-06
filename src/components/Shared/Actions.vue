<script setup>
import { ref } from 'vue';
</script>

<template>
  <!-- #actions start -->
  <div id="actions">
    <UserPanel />

    <!-- .action start -->
    <div class="action">
      <!-- .icon start -->
      <router-link to="/profile/listings" class="icon">
        <i class="fal fa-plus-square"></i>
      </router-link>
      <!-- .icon end -->
    </div>
    <!-- .action end -->

    <!-- <Messages />

    <Notifications /> -->

    <MiniCart />
  </div>
  <!-- #actions end -->
</template>
