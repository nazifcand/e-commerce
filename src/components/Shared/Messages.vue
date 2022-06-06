<script setup>
import { ref } from 'vue';
</script>

<template>
  <!-- .action start -->
  <div class="action">
    <!-- .icon start -->
    <router-link to="/profile/messages" class="icon">
      <i class="fal fa-comment"></i>
      <span class="badge">6</span>
    </router-link>
    <!-- .icon end -->

    <!-- .detail start -->
    <div class="detail messages">
      <!-- .title start -->
      <div class="title">
        <strong>Mesajlar</strong>
      </div>
      <!-- .title end -->

      <!-- .content start -->
      <div class="content">
        <!-- .message start -->
        <router-link
          v-for="i in 10"
          :key="i"
          :class="{ unread: i % 3 == 0 || i % 4 == 0 }"
          :to="`/profile/messages/${i}`"
          class="message"
        >
          <!-- .message-title start -->
          <div class="message-title">
            <strong>nazifcnd</strong>
            <time>09 Mar - 10.39</time>
          </div>
          <!-- .message-title end -->
          <!-- .message-content start -->
          <p class="message-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            vel blandit...
          </p>
          <!-- .message-content end -->
        </router-link>
        <!-- .message end -->
      </div>
      <!-- .content end -->

      <!-- .footer start -->
      <div class="footer">
        <router-link to="/profile/messages">Tüm Mesajlari Gör</router-link>
      </div>
      <!-- .footer end -->
    </div>
    <!-- .detail end -->
  </div>
  <!-- .action end -->
</template>
