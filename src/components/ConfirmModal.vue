<script setup>
import { ref, computed, watch } from 'vue';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const isShow = computed(() => mainStore.confirmModal.show);
const title = computed(() => mainStore.confirmModal.title);
const text = computed(() => mainStore.confirmModal.text);
const icon = computed(() => mainStore.confirmModal.icon);
const confirm = computed(() => mainStore.confirmModal.confirm);
const confirmButtonText = computed(
  () => mainStore.confirmModal.confirmButtonText
);
const cancelButtonText = computed(
  () => mainStore.confirmModal.cancelButtonText
);

const closeModal = () => {
  mainStore.confirmModal = {
    isShow: false,
    title: 'Silmek istediğinize emin misiniz?',
    text: '',
    icon: 'fa-times-circle',
    confirm: null,
    confirmButtonText: 'Evet, sil!',
    cancelButtonText: 'Vazgeç',
  };
};

const confirmHandler = () => {
  const { confirm } = mainStore.confirmModal;
  confirm();
  closeModal();
};

watch(
  () => mainStore.confirmModal.show,
  (val) => {
    const body = document.querySelector('body');
    if (val) {
      body.classList.add('hide-scroll');
      return;
    }
    body.classList.remove('hide-scroll');
  }
);
</script>

<template>
  <teleport to="body">
    <div v-if="isShow" class="overlay" @click.self="closeModal"></div>
    <transition name="fade">
      <!-- #delete-modal start -->
      <div v-if="isShow" id="delete-modal">
        <!-- #modal-box start -->
        <div id="modal-box">
          <i class="fal icon" :class="icon"></i>
          <h3>{{ title }}</h3>
          <p v-html="text"></p>
          <div class="actions">
            <button
              v-if="mainStore.confirmModal.confirm"
              class="btn primary dark"
              @click.prevent="confirmHandler"
            >
              {{ confirmButtonText }}
            </button>

            <button class="btn" @click.prevent="closeModal">
              {{ cancelButtonText }}
            </button>
          </div>
        </div>
        <!-- #modal-box end -->
      </div>
      <!-- #delete-modal end -->
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
@import '@@/variables';

#modal-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 500px;
  background-color: #fff;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 0.3rem;
  border: 1px solid $grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media #{$xs} {
    width: calc(100vw - 30px) !important;
  }

  .icon {
    font-size: 10rem;
    margin-bottom: 2rem;
    color: $main-color;
  }

  h3 {
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.5;
    margin-bottom: 1rem;
    color: $text-light;
    font-size: 0.85rem;
  }

  .actions {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
}
</style>
