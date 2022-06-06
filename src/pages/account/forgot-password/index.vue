<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

// stores
import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const title = useTitle(pageTitle('Şifremi Unuttum'));
const user = ref({
  email: '',
});

const submitHandler = () => {};
</script>

<template>
  <!-- #account-box start -->
  <div id="account-box">
    <Alerts />

    <form @submit.prevent="submitHandler" class="base">
      <!-- .box-title start -->
      <div class="box-title">
        <h2>Şifremi Unuttum</h2>
        <p>E-posta adresinizi kullanarak şifrenizi kurtarabilirsiniz.</p>
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
      <div class="group group-submit">
        <LoadingButton :loading="true" title="Şifremi Sıfırla" />
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
