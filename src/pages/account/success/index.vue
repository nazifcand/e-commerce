<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

const title = useTitle(pageTitle('Kayıt Başarılı'));
</script>

<template>
  <!-- #account-box start -->
  <div id="account-box" class="success-box base">
    <i class="fad fa-check-circle"></i>
    <h1>Başvuru Başarılı</h1>
    <p>
      Bizi tercih ettiğiniz için teşekkür ederiz. Gerekli kontrollerden sonra
      firmanız onaylanacaktır.
    </p>
    <p>Onaylandığında <strong>e-posta</strong> ile bildirim alacaksınız.</p>
  </div>
  <!-- #account-box end -->
</template>

<route lang="yaml">
meta:
  layout: notLoggedIn
</route>

<style lang="scss" scoped>
@import '@@/variables';

.base {
  padding: 50px;
}

.success-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  i {
    font-size: 10rem;
    margin-bottom: 2rem;
    color: rgba($main-color, 0.75);
  }

  h1 {
  }

  p {
    font-size: 0.85rem;
    text-align: center;
    line-height: 1.5;
    color: $text-light;
    margin-top: 1rem;
  }
}
</style>
