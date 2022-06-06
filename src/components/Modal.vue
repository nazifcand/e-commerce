<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String },
  size: { type: String, default: 'xsmall' },
});

const emit = defineEmits(['update:open']);

const state = ref(props.open);

const close = () => {
  state.value = false;
};

watch(state, (val) => {
  emit('update:open', val);

  const body = document.querySelector('body');
  if (val) {
    body.classList.add('hide-scroll');
    return;
  }
  body.classList.remove('hide-scroll');
});
watch(
  () => props.open,
  (val) => (state.value = val)
);
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <!-- .overlay start -->
      <div v-if="open" class="overlay" @click.self="close"></div>
      <!-- .overlay end -->
    </transition>

    <!-- #modal start -->
    <div v-if="open" id="modal" :class="size">
      <!-- #modal-header start -->
      <div id="modal-header">
        <strong>{{ title }}</strong>

        <!-- #modal-actions start -->
        <div id="modal-actions">
          <slot name="actions" />

          <!-- #close-modal start -->
          <div id="close-modal" @click="close">
            <i class="fad fa-times"></i>
          </div>
          <!-- #close-modal end -->
        </div>
        <!-- #modal-actions end -->
      </div>
      <!-- #modal-header end -->

      <!-- #modal-content start -->
      <div id="modal-content">
        <slot name="content" />
      </div>
      <!-- #modal-content end -->
    </div>
    <!-- #modal end -->
  </teleport>
</template>

<style lang="scss" scoped>
.hide-scroll {
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
