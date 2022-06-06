<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  listing: { type: Object, required: true },
});

// services
import { addFavourite, removeFavourite } from '@/services/favourite.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const isAdded = computed(() => {
  return mainStore.user.favourites
    .map((i) => i.listing.id)
    .includes(props.listing.id);
});

const toggleFavourite = async () => {
  isAdded.value ? remove() : add();
};

const add = async () => {
  const [favouritesError, favouritesData] = await addFavourite([
    { listing: props.listing.id },
  ]);
  mainStore.user.favourites = favouritesData.results;
};

const remove = async () => {
  const item = mainStore.user.favourites.find(
    (item) => item.listing.id == props.listing.id
  );
  const [favouritesError, favouritesData] = await removeFavourite([item.id]);
  mainStore.user.favourites = favouritesData.results;
};
</script>

<template>
  <div
    @click="toggleFavourite"
    class="add-to-favorite"
    :class="{ added: isAdded }"
  >
    <i class="fa-heart" :class="{ fal: !isAdded, fas: isAdded }"></i>
  </div>
</template>
