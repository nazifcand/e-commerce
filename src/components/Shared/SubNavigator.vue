<script setup>
import { ref } from 'vue';

const props = defineProps({
  categories: { type: Array, default: [] },
});
</script>

<template>
  <!-- .sub-nav start -->
  <div class="sub-nav">
    <!-- .nav-item start -->
    <div v-for="(category, index) in categories" class="nav-item">
      <router-link :to="`/categories/${category.id}`">
        <span>{{ category.name }}</span>
      </router-link>

      <SubNavigator
        v-if="category.children.length"
        :categories="category.children"
      />
    </div>
    <!-- .nav-item end -->
  </div>
  <!-- .sub-nav end -->
</template>
