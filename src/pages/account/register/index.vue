<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter } from 'vue-router';
const router = useRouter();

// services
import { register } from '@/services/common.service';

// stores
import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const title = useTitle(pageTitle('Kayıt Ol'));
const isLoading = ref(false);
const user = ref({
  short_name: '',
  company: '',
  company_no: '',
  company_phone: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  repeat_password: '',
  mms_approval: false,
});

const submitHandler = async () => {
  // check pass
  if (user.value.password != user.value.repeat_password) {
    alertStore.add({ text: 'Şifreler uyuşmuyor!', class: 'warning' });
    return;
  }

  isLoading.value = true;
  const [registerError, registerData] = await register(user.value);
  isLoading.value = false;

  // is error
  if (registerError) {
    alertStore.parseValidErrors(registerError.data);
    return;
  }

  router.push('/account/success');
};
</script>

<template>
  <!-- #account-box start -->
  <div id="account-box">
    <Alerts />

    <form @submit.prevent="submitHandler" class="base">
      <!-- .box-title start -->
      <div class="box-title">
        <h2>Hesabın yok mu? Kayıt Ol</h2>
        <p>
          Kayıt bir dakikadan az sürer ancak siparişleriniz üzerinde tam kontrol
          sahibi olmanızı sağlar.
        </p>
      </div>
      <!-- .box-title end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Mağaza Kısa Ad</span>
          <Question text="Uygulama mağaza ismi" />
        </span>
        <Input
          v-model="user.short_name"
          minlength="5"
          maxlength="8"
          required
          @keypress.space.prevent=""
          placeholder="Uygulama mağaza ismi girin.En az 5 en fazla 8 karakter ile sınırlandırılmıştır."
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Firma ünvanınız</span>
          <Question text="Firma ünvanınız" />
        </span>
        <Input
          v-model="user.company"
          required
          placeholder="Firma ünvanı girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>E-posta</span>
        </span>
        <Input
          v-model="user.email"
          type="email"
          required
          placeholder="E-postanızı girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Firma UTS Numarası</span>
          <Question text="Medikal Firma Tanımlayıcı Numara" />
        </span>
        <Input
          v-model="user.company_no"
          minlength="11"
          maxlength="15"
          required
          placeholder="Firma uts numarasını girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Yetkili Adı</span>
          <Question text="Firma sahibinin adı" />
        </span>
        <Input
          v-model="user.first_name"
          required
          placeholder="Yetkili adı girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Yetkili Soyadı</span>
          <Question text="Firma sahibinin soyadı" />
        </span>
        <Input
          v-model="user.last_name"
          required
          placeholder="Yetkili soyadı girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Yetkili Cep Telefonu</span>
          <Question
            text="Onay ve diğer bilgilendirmeler için kullanılan cep telefonu"
          />
        </span>
        <Input
          v-model="user.phone"
          minlength="11"
          required
          placeholder="Cep telefonu girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Şirket Telefonu</span>
          <Question text="Şirket Sabit telefonu" />
        </span>
        <Input
          v-model="user.company_phone"
          minlength="11"
          required
          placeholder="Şirket telefonu girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Şifre</span>
        </span>
        <Input
          v-model="user.password"
          type="password"
          minlength="8"
          required
          placeholder="Şifrenizi girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-6">
        <span class="required">
          <span>Şifre(tekrar)</span>
        </span>
        <Input
          v-model="user.repeat_password"
          type="password"
          minlength="8"
          required
          placeholder="Şifrenizin tekrarını girin"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <div class="checkbox">
          <Checkbox required>
            Kişisel verileriniz,
            <strong
              ><a href="/pages/aydinlatma-metni" target="_blank"
                >Aydınlatma Metni</a
              ></strong
            >
            kapsamında işlenmektedir.
            <strong
              ><a href="/pages/uyelik-sozlesmesi" target="_blank"
                >Üyelik Sözleşmesi</a
              ></strong
            >’ni ve
            <strong
              ><a href="/pages/cerez-politikasi" target="_blank"
                >Çerez Politikası</a
              ></strong
            >’nı kabul ediyorum.</Checkbox
          >
        </div>
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <div class="checkbox">
          <Checkbox v-model="user.mms_approval" value="mms" required>
            Kampanyalardan haberdar olabilmem için kişisel verilerimin
            işlenmesini ve tarafıma elektronik ileti gönderilmesini kabul
            ediyorum.
          </Checkbox>
        </div>
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-submit">
        <LoadingButton :loading="isLoading" title="Kayıt Ol" />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span
          >Zaten hesabın var mı?
          <router-link to="/account/login">Giriş Yap</router-link></span
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

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  line-height: 1.35;

  span {
    font-size: 0.75rem;
    font-weight: normal;
  }

  input {
    margin-right: 1rem;
  }
}
</style>
