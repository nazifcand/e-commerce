<script setup>
import { computed, ref } from 'vue';
import { useMainStore } from '@/stores/main.store';

const mainStore = useMainStore();

const isMobile = computed(() => mainStore.mobile.isMobile);
const categories = computed(() => mainStore.categories);
</script>

<template>
  <!-- .mobile-categories start -->
  <div v-if="isMobile" class="mobile-categories">
    <!-- .list-categories start -->
    <div class="list-categories">
      <!-- .category-item start -->
      <router-link
        class="category-item"
        v-for="(category, index) in categories"
        :key="index"
        :to="`/categories/${category.id}`"
        :style="`background-image:url('${category.image_url.image}')`"
      >
        <span> {{ category.name }}</span>
      </router-link>
      <!-- .category-item end -->
    </div>
    <!-- .list-categories end -->
  </div>
  <!-- .mobile-categories end -->
</template>

<style lang="scss" scoped>
@import '@@/variables';

.mobile-categories {
  width: calc(100% - 30px);
  margin: 0 auto;
  height: 100px;
  margin-bottom: 1.5rem;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .list-categories {
    display: flex;
    width: max-content;
    column-gap: 0.5rem;

    .category-item {
      width: 100px;
      height: 100px;
      border-radius: 0.35rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 0.7rem;
      color: #fff;
      background-position: center center;
      background-size: cover;
      position: relative;
      padding: 10px;
      box-sizing: border-box;

      &:before {
        content: '';
        width: 100%;
        height: 100%;
        background-color: rgba(#333, 0.35);
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 0.35rem;
        z-index: 1;
      }

      span {
        z-index: 2;
      }
    }
  }
}
</style>
