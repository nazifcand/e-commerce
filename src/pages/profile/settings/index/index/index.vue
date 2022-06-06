<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

// services
import { fetchMe } from '@/services/user.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const title = useTitle(pageTitle('Üyelik Bilgileri'));
const account = ref({
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
});

(async () => {
  mainStore.isLoading = true;
  alertStore.add({
    text: '<p>Kullanıcı bilgilerinizi güncellemek için müşteri hizmetleri ile iletişime geçebilirsiniz.</p>',
    class: 'warning',
    deletable: false,
  });

  const [fetchMeError, fetchMeData] = await fetchMe();
  account.value = fetchMeData;
  mainStore.isLoading = false;
})();
</script>

<template>
  <!-- alert start -->
  <Alerts />
  <!-- alert end -->

  <div class="base">
    <form>
      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Yetkili Adı</span>
          <Question text="Firma sahibinin adı" />
        </span>
        <Input v-model="account.first_name" type="text" required readonly />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Yetkili Soyadı</span>
          <Question text="Firma sahibinin soyadı" />
        </span>
        <Input v-model="account.last_name" type="text" required readonly />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>E-posta Adresi</span>
          <Question
            text="Şirket fatura bildirimleri ve diğer önemli bilgiler için kullandığınız e-posta adresiniz"
          />
        </span>
        <Input v-model="account.email" type="email" required readonly />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group">
        <span class="required">
          <span>Telefon</span>
          <Question
            text="Şirket fatura bildirimleri ve diğer önemli bilgiler için kullandığınız e-posta adresiniz"
          />
        </span>
        <Input v-model="account.phone" type="text" required readonly />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-submit">
        <LoadingButton title="Değişiklikleri Kaydet" disabled />
      </div>
      <!-- .group end -->
    </form>
  </div>
</template>
