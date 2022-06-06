<script setup>
import { ref } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const title = useTitle(pageTitle('Hakkımızda'));
</script>

<template>
  <div class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #page-content start -->
      <div id="page-content" class="blog base">
        <!-- .blog-content start -->
        <div class="blog-content">
          <!-- .blog-title start -->
          <div class="blog-title">
            <h2>Hakkımızda</h2>
          </div>
          <!-- .blog-title end -->
          <div class="html">
            <p>
              Kurucu firma BCT Yazılım sektörün öncü yazılım firmalarından olup;
              B2B, muhasebe ve entegrasyon çözümleri üreten bir firmadır.
              Medikaport BCT yazılım çatısı altında Türkiye'de medikal
              işletmeler için tasarlanan ilk kapalı sistem pazaryeri olarak
              medikal sektörüne özel toptan ve perakende çözümler üretmek
              amacıyla kurulmuştur. Medikal işletmelerin tedarikçi ve alıcı
              olarak yer alabildikleri profesyonel bir platform olarak
              tasarlanmıştır.
            </p>
            <p>
              Dijital teknolojinin son imkanlarını kullanarak kendi yazılım
              ekibi tarafından oluşturulmuş medikal sektöre özel çözümler
              üretmektedir.
            </p>
            <h3>Misyon</h3>
            <p>
              öncelikli olarak en önemli misyonumuz; medikal firmaların
              malzemelere erişimlerini kolaylaştırmaktır. Pazaryeri platformu
              ile fiyatların regülasyonu ve ürünlerin ulaşılabilirliğini
              arttırarak medikal pazarın sağlıklı büyümesine vesile olmayı
              hedeflemekteyiz.
            </p>
            <h3>Vizyon</h3>
            <p>
              Dijitalleşmenin tüm hızıyla yaşandığı günümüzde medikal sektör
              dinamiklerini ve yaşanan değişimi bir ekosistem olarak düşünüp bu
              alanda pazaryeri ve diğer medikal yapıları birbirine bağlayıp
              medikal sektör paydaşlarının aradıkları ürün ve çözümleri
              bulabildikleri bir yapı kurgulamaktayız. Bu yapı sektörün
              dijitalleşmesinde önde gelen markalarından biri olup, ticari bir
              yapıdan çok medikal bir kütüphane olarakta kullanılabilen bir
              sistemin vizyonunu içermektedir.
            </p>
          </div>
        </div>
        <!-- .blog-content end -->
      </div>
      <!-- #page-content end -->
    </div>
    <!-- #page end -->
  </div>
</template>
