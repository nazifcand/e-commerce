<script setup>
import { ref } from 'vue';

const props = defineProps({
  category: { type: Object, required: true },
});
</script>

<template>
  <ParentCategory v-if="category.parent" :category="category.parent" />
  <router-link :to="`/categories/${category.id}`">{{
    category.name
  }}</router-link>
</template>
