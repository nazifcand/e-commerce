<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  total: { type: Number, required: true },
  size: { type: Number, default: 25 },
});

const emit = defineEmits(['changed']);

const router = useRouter();
const route = useRoute();

const currentPage = ref(+(route.query.page ?? 1));
const maxsize = computed(() => Math.ceil(props.total / props.size));

const pageLink = (page) => {
  const query = {
    ...route.query,
    page,
  };
  const queryString = new URLSearchParams(query).toString();
  return `${route.path}?${queryString}`;
};

const changePage = (page) => {
  currentPage.value = page;
};

watch(route, (to, from) => {
  currentPage.value = +(to.query.page ?? 1);
});
</script>

<template>
  <!-- #pagination start -->
  <div v-if="maxsize > 1" id="pagination">
    <router-link v-if="currentPage - 1 > 0" :to="pageLink(1)" class="page">
      <i class="fad fa-chevron-double-left"></i>
    </router-link>

    <!-- back start -->
    <router-link
      v-if="currentPage - 1 > 0"
      :to="pageLink(currentPage - 1)"
      class="page"
    >
      <i class="fad fa-chevron-left"></i>
    </router-link>
    <!-- back end -->

    <!-- .page start -->
    <router-link
      v-for="page in maxsize"
      class="page"
      :key="page"
      :to="pageLink(page)"
      :class="{
        active: page == currentPage,
        hide: !(page > currentPage - 2 && page < currentPage + 3),
      }"
      >{{ page }}</router-link
    >
    <!-- .page end -->

    <!-- next start -->
    <router-link
      v-if="currentPage < maxsize"
      :to="pageLink(currentPage + 1)"
      class="page"
    >
      <i class="fad fa-chevron-right"></i>
    </router-link>
    <!-- next end -->

    <!-- next start -->
    <router-link
      v-if="currentPage < maxsize"
      :to="pageLink(maxsize)"
      class="page"
    >
      <i class="fad fa-chevron-double-right"></i>
    </router-link>
    <!-- next end -->
  </div>

  <!-- #pagination end -->
</template>
