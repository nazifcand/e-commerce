<script setup>
import { computed, ref } from 'vue';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const categories = computed(() => {
  return mainStore.categories;
});

const childCategories = ref(categories.value[0].children);
</script>

<template>
  <!-- #categories start -->
  <div id="categories">
    <!-- #parent-categories start -->
    <div id="parent-categories">
      <router-link
        v-for="(category, index) in categories"
        :key="index"
        :to="`/categories/${category.id}`"
        class="category"
        @mouseenter="childCategories = category.children"
      >
        <span> {{ category.name }}</span>
        <i class="fal fa-chevron-right"></i>
      </router-link>
    </div>
    <!-- #parent-categories end -->

    <!-- #sub-categories start -->
    <div id="sub-categories">
      <!-- .category start -->
      <div v-for="(category, index) in childCategories" class="category">
        <!-- .title start -->
        <div class="title">
          <router-link :to="`/categories/${category.id}`">
            <strong>{{ category.name }}</strong>
          </router-link>
        </div>
        <!-- .title end -->

        <!-- .list-categories start -->
        <div class="list-categories">
          <router-link
            v-for="(childCategory, childIndex) in category.children"
            :key="childIndex"
            :to="`/categories/${childCategory.id}`"
          >
            <span
              >{{ childCategory.name }}
              <span class="text-light">
                ({{ childCategory.product_count }})
              </span>
            </span>
          </router-link>
        </div>
        <!-- .list-categories end -->
      </div>
      <!-- .category end -->
    </div>
    <!-- #sub-categories end -->
  </div>
  <!-- #categories end -->
</template>

<style lang="scss" scoped>
@import '@@/variables';

#categories {
  width: 1200px;
  min-height: 200px;
  box-sizing: border-box;
  background-color: #fff;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 5;
  border-bottom-left-radius: 0.35rem;
  border-bottom-right-radius: 0.35rem;
  box-shadow: 0 0 15px rgba($dark, 0.1);
  border: 1px solid $grey;
  display: none;

  #parent-categories {
    min-width: 225px;
    border-right: 1px solid $grey;
    display: flex;
    flex-direction: column;

    .category {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      box-sizing: border-box;
      font-size: 0.8rem;

      &:hover {
        background-color: $grey-light;
      }
    }
  }

  #sub-categories {
    flex: 1;
    background-color: $grey-light;
    padding: 25px;
    box-sizing: border-box;
    max-height: 500px;
    overflow: auto;

    .category {
      width: 100%;

      & + .category {
        margin-top: 2rem;
      }

      .title {
        border-bottom: 1px solid $grey;
        padding-bottom: 0.5rem;
        margin-bottom: 0.75rem;
      }

      .list-categories {
        display: flex;
        flex-wrap: wrap;

        a {
          display: inline-block;
          width: calc(100% / 4);
          margin-top: 0.5rem;
          font-size: 0.7rem;
        }
      }
    }
  }
}
</style>
