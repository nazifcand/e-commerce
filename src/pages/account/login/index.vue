<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter } from 'vue-router';
const router = useRouter();

// services
import request from '@/services/base.service';
import { login } from '@/services/common.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const { parseValidErrors, add, removeAllAlerts } = useAlertStore();

const title = useTitle(pageTitle('Giriş Yap'));
const isLoading = ref(false);
const user = ref({
  email: '',
  password: '',
});

const submitHandler = async () => {
  removeAllAlerts();

  isLoading.value = true;
  const [loginError, loginData] = await login(user.value);
  isLoading.value = false;

  if (loginError) {
    parseValidErrors(loginError.data);
    return;
  }

  localStorage.setItem('token', loginData.access);
  request.defaults.headers.Authorization = `Bearer ${localStorage.token}`;
  mainStore.isLoggedIn = true;
  mainStore.user = loginData;

  setTimeout(() => {
    router.push('/');
  }, 1000);

  add({
    text: 'Giriş işlemi başarılı, yönlendiriliyorsunuz',
    class: 'success',
  });
};
</script>

<template>
  <!-- #account-box start -->
  <div id="account-box">
    <Alerts />

    <form @submit.prevent="submitHandler" class="base">
      <!-- .box-title start -->
      <div class="box-title">
        <h2>Giriş Yap</h2>
        <p>E-posta adresinizi kullanarak giriş yapabilirsiniz.</p>
      </div>
      <!-- .box-title end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>E-posta</span>
        </span>
        <Input
          v-model="user.email"
          type="email"
          required
          placeholder="E-posta adresini giriniz"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Şifre</span>
        </span>
        <Input
          v-model="user.password"
          type="password"
          minlength="8"
          required
          placeholder="Şifrenizi giriniz"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-submit">
        <LoadingButton :loading="isLoading" title="Giriş Yap" />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span
          ><router-link to="/account/forgot-password"
            >Şifreni mi unuttun?</router-link
          ></span
        >
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span
          >Bir hesabın yok mu ?
          <router-link to="/account/register">Hemen kayıt ol</router-link></span
        >
      </div>
      <!-- .group end -->
    </form>
  </div>
  <!-- #account-box end -->
</template>

<route lang="yaml">
meta:
  layout: notLoggedIn
</route>
