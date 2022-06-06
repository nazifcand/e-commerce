<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import data from '../../../../API/page.json';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const title = useTitle(pageTitle('sayfa baslik'));
const blog = ref(data);
</script>

<template>
  <div class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #page-content start -->
      <div id="page-content" class="blog base">
        <!-- .blog-header start -->
        <div class="blog-header">
          <!-- .blog-image start -->
          <div class="blog-image">
            <img loading="lazy" :src="blog.image_url.image" alt="" />
          </div>
          <!-- .blog-image end -->
        </div>
        <!-- .blog-header end -->

        <!-- .blog-content start -->
        <div class="blog-content">
          <!-- .blog-title start -->
          <div class="blog-title">
            <h2>{{ blog.title }}</h2>
          </div>
          <!-- .blog-title end -->
          <div class="html" v-html="blog.content"></div>
        </div>
        <!-- .blog-content end -->
      </div>
      <!-- #page-content end -->
    </div>
    <!-- #page end -->
  </div>
</template>
