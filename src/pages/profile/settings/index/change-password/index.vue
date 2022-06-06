<script setup>
import { computed, ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

// services
import { changePassword } from '@/services/user.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const isLoading = ref(false);
const title = useTitle(pageTitle('Şifre Değiştir'));
const password = ref({
  old_password: '',
  new_password: '',
  r_new_password: '',
});

const submitHandler = async () => {
  // check pass
  if (password.value.new_password != password.value.r_new_password) {
    alertStore.add({ text: 'Şifreler uyuşmuyor!', class: 'warning' });
    return;
  }

  const [changePasswordError, changePasswordData] = await changePassword(
    password.value
  );

  // is error
  if (changePasswordError) {
    alertStore.parseValidErrors(changePasswordError.data);
    return;
  }

  // success
  alertStore.add({ text: 'Şifreniz başarıyla güncellendi!', class: 'success' });
  console.log({ changePasswordData, changePasswordError });
};
</script>

<template>
  <!-- alert start -->
  <Alerts />
  <!-- alert end -->

  <div class="base">
    <form @submit.prevent="submitHandler">
      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Mevcut Şifreniz</span>
        </span>
        <Input
          minlength="8"
          v-model="password.old_password"
          type="password"
          placeholder="Mevcut şifrenizi girin"
          required
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Yeni Şifreniz</span>
        </span>
        <Input
          minlength="8"
          v-model="password.new_password"
          type="password"
          required
          placeholder="Yeni şifrenizi girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Yeni Şifreniz(tekrar)</span>
        </span>
        <Input
          minlength="8"
          v-model="password.r_new_password"
          type="password"
          required
          placeholder="Yeni şifrenizin tekrarını girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-submit">
        <LoadingButton :loading="isLoading" title="Değişiklikleri Kaydet" />
      </div>
      <!-- .group end -->
    </form>
  </div>
</template>
