<script setup>
import { ref, computed } from 'vue';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const featuredCategories = computed(() => {
  return mainStore.featuredCategories;
});
</script>

<template>
  <div class="container">
    <nav>
      <!-- .nav-item start -->
      <div class="nav-item list-categories">
        <a href="#">
          <i class="fal fa-bars menu-icon"></i>
          <span>Tüm Kategoriler</span>
          <i class="fal fa-chevron-down arrow-icon"></i>
        </a>

        <Categories />
      </div>
      <!-- .nav-item end -->

      <!-- .nav-item start -->
      <div
        class="nav-item"
        v-for="(category, index) in featuredCategories"
        :key="index"
      >
        <router-link :to="`/categories/${category.id}`">
          <span>{{ category.name }}</span>
        </router-link>
      </div>
      <!-- .nav-item end -->
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import '@@/variables';

nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .nav-item {
    flex: 1;
    font-size: 0.85rem;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    transition: 0.35s all ease;
    position: relative;

    &.list-categories {
      min-width: 225px;
      max-width: 225px;
      box-sizing: border-box;

      &:hover {
        #categories {
          display: flex;
        }
      }
    }

    &:hover {
      background-color: rgba(#fff, 0.1);
    }

    a {
      width: 100%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      .menu-icon {
        margin-right: 0.25rem;
      }

      .arrow-icon {
        margin-left: auto;
      }
    }
  }
}
</style>
