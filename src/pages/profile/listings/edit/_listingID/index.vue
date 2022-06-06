<script setup>
import { ref, computed } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchListing, updateListing } from '@/services/listing.service';
import { uploadImages } from '@/services/upload.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const title = useTitle(pageTitle('İlan Düzenle'));
const isLoading = ref(false);
const conditionTypes = ref([
  { value: 'very_worn', label: 'Çok yıpranmış' },
  { value: 'middle', label: 'Orta' },
  { value: 'good', label: 'İyi' },
]);
const shipmentStatuses = ref([
  { label: 'Alıcı Ödemeli', value: 'reverse_charge' },
  { label: 'Satıcı Ödemeli', value: 'without_charge' },
]);
const selectedImages = ref([]);
const listing = ref(null);

const showcaseImage = computed(() => {
  return listing.value?.image_url.image == '/images/default-image.jpg'
    ? listing.value?.product_display.image_url
    : listing.value?.image_url;
});

const disabledFileInput = computed(() => {
  if (listing.value.images.length < 3) return false;
  return true;
});

(async () => {
  mainStore.isLoading = true;
  const [listingError, listingData] = await fetchListing(
    route.params.listingID
  );

  // is error
  if (listingError) {
    alertStore.add({
      text: `Böyle bir ilan bulunamadı, daha önce silinmiş olabilir!`,
      class: 'danger',
    });
    return;
  }

  // success
  const { min_quantity, max_quantity } = listingData;
  listing.value = listingData;
  listing.value.min_quantity = min_quantity == 0 ? '' : min_quantity;
  listing.value.max_quantity = max_quantity == 0 ? '' : max_quantity;
  mainStore.isLoading = false;
})();

const clearForm = () => {
  selectedImages.value.splice(0);
};

const imagesHandler = (event) => {
  // check max size
  if (listing.value.images.length == 3) {
    alertStore.add({
      text: 'Resim yükleme sınırına ulaştınız!',
      class: 'warning',
    });
    return;
  }

  selectedImages.value = [...event.target.files]
    .splice(0, 3 - listing.value.images.length)
    .reduce((arr, file) => {
      arr.push({
        preview: URL.createObjectURL(file),
        file,
      });
      return arr;
    }, []);
};

const removeImage = (image) => {
  mainStore.showModal({
    text: 'Seçilen görseli silmek istediğinize emin misiniz?',
    confirm: () => {
      // not delete last image
      if (listing.value.images.length == 1) {
        return;
      }

      const index = listing.value.images.findIndex(
        (item) => item.id == image.id
      );
      listing.value.images.splice(index, 1);
      listing.value.images_url.splice(index, 1);

      // set showcase
      if (listing.value.image == image.id) {
        listing.value.image = listing.value.images_url[0].id;
        listing.value.image_url = listing.value.images_url[0];
      }
    },
  });
};

const setShowcase = (image) => {
  listing.value.image = image.id;
  listing.value.image_url = image;
};

const submitHandler = async () => {
  isLoading.value = true;
  alertStore.removeAllAlerts();

  const listingData = { ...listing.value };

  // is expiry
  if (!listingData.expiry) {
    listingData.expiry = null;
  }

  // delete min_quantity
  if (!listingData.min_quantity) {
    listingData.min_quantity = 0;
  }

  // delete max_quantity
  if (!listingData.max_quantity) {
    listingData.max_quantity = 0;
  }

  // is secondhand
  if (listingData.is_secondhand && selectedImages.value.length) {
    const formData = new FormData();

    formData.append('kind', 'secondhand');
    selectedImages.value.forEach((file) => {
      formData.append('image', file.file);
    });

    // upload secondhand images
    const [uploadError, uploadedImages] = await uploadImages(formData);

    // is error
    if (uploadError) {
      alertStore.add({
        text: 'İlan görselleri yüklenirken bir sorunla karşılaşıldı, ilan oluşturulamadı!',
        class: 'danger',
      });
      isLoading.value = false;
      return;
    }

    // set image ids
    listingData.images = [
      ...listingData.images,
      ...uploadedImages.results.map((i) => ({
        id: i.id,
      })),
    ];
  }

  // update listing
  const [listingError, updatedListing] = await updateListing(
    listingData.id,
    listingData
  );
  isLoading.value = false;

  // is error
  if (listingError) {
    alertStore.parseValidErrors(updateListingError.data);
    return;
  }

  // success
  alertStore.add({
    text: 'İlanınız başarıyla güncellendi, yönlendirliyorsunuz.',
    class: 'success',
  });
  setTimeout(() => {
    router.push('/profile/listings');
  }, 1000);
};
</script>

<template>
  <Breadcrumb v-bind="$attrs">
    <span>Profil</span>
    <router-link to="/profile/listings">İlanlarım</router-link>
    <strong>İlan Düzenle</strong>
  </Breadcrumb>

  <div class="container" id="edit-listing">
    <!-- #page start -->
    <div id="page">
      <!-- #content start -->
      <div id="content">
        <!-- alerts start -->
        <Alerts />
        <!-- alerts end -->

        <!-- add listing start -->
        <div v-if="listing" class="base">
          <form @submit.prevent="submitHandler">
            <!-- .group start -->
            <div class="group group-4">
              <span class="required">
                <span>Ürün Adı</span>
                <Question
                  text="Eklemek istediğiniz ilan sitede varsa seçip ilanı yükleyebilir yoksa ilan öner seçeneği ile açılan pencereden ilanınızı yükleyip onaya gönderebiirsiniz"
                />
              </span>
              <Input
                placeholder="Ürün adı, uts kodu veya barkod yazınız..."
                v-model="listing.product_display.name"
                disabled
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-2">
              <span class="required">
                <span>Barkod</span>
                <Question
                  text="Firma içerisinde kullandığınız ürün takip numarası"
                />
              </span>
              <Input
                v-model="listing.product_code"
                placeholder="Barkod girin"
                required
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-2">
              <span class="">
                <span>Miat</span>
                <Question
                  text="Ürününüz miatlı ürünse mutlaka miatını giriniz, alıcının kararsız kalmasının önüne geçersiniz"
                />
              </span>
              <Input
                v-model="listing.expiry"
                type="date"
                placeholder="Miat girin"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-2">
              <span class="required">
                <span>Stok</span>
              </span>
              <Input
                v-model="listing.quantity"
                placeholder="Stok girin"
                required
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-2">
              <span class="required">
                <span>Fiyat</span>
                <Question text="Ürünün alıcı tarafından görüleceği fiyattır" />
              </span>
              <Input
                v-model="listing.price"
                placeholder="Fiyat girin"
                required
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-3">
              <span class="">
                <span>Alış Fiyatı</span>
                <Question
                  text="Ürün karlılığınızı hesaplamak adına girebilir, kazanç planınızı oluşturabilirsiniz . Sizin dışınızda kimse göremez"
                />
              </span>
              <Input
                v-model="listing.buying_price"
                placeholder="Alış fiyat girin"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-3">
              <span class="">
                <span>En Az Satış Miktarı</span>
                <Question
                  text="Bir siparişte sepete eklenecek en düşük miktardır"
                />
              </span>
              <Input
                v-model="listing.min_quantity"
                placeholder="En az satış miktarı girin"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-3">
              <span class="">
                <span>En Fazla Satış Miktarı</span>
                <Question
                  text="Bir siparişte sepete eklenecek en fazla miktardır"
                />
              </span>
              <Input
                v-model="listing.max_quantity"
                placeholder="En fazla satış miktarı girin"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-3">
              <span class="">
                <span>Kargo</span>
                <Question text="Kargo" />
              </span>
              <SingleSelect
                v-model="listing.shipment_kind"
                :options="shipmentStatuses"
                placeholder="Kargo seçiniz"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group">
              <span class="">
                <span>İlan Açıklaması</span>
                <Question
                  text="Ürünün siparişini veren medikal firma tarafından görülecek metindir. Ürün hakkında bilgileri ve ürünle ilgili özel bir notunuz varsa onu ekleyebilirsiniz"
                />
              </span>
              <Textarea
                v-model="listing.description"
                placeholder="İlan için bir açıklama girin"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div
              class="group"
              :class="{
                'group-12': !listing.is_secondhand,
                'group-3': listing.is_secondhand,
              }"
            >
              <span class="">
                <span>İkinci El Ürün</span>
                <Question
                  text="İkinci el bir ürün satıyorsanız bu alanı işaretlemelisiniz"
                />
              </span>
              <Switch v-model="listing.is_secondhand" />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="listing.is_secondhand" class="group group-3">
              <span class="required">
                <span>Durum</span>
                <Question text="" />
              </span>
              <SingleSelect
                v-model="listing.condition"
                :options="conditionTypes"
                required
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="listing.is_secondhand" class="group group-3">
              <span class="required">
                <span>Kullanım Süresi</span>
                <Question text="" />
              </span>
              <Input
                v-model="listing.usage_time"
                placeholder="Kullanım süresi girin"
                required
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="listing.is_secondhand" class="group group-3">
              <span :class="{ required: !listing.images.length }">
                <span>Görseller</span>
                <Question
                  text="Satmak istediğiniz ürüne ait görseller (en fazla 3 adet)"
                />
              </span>
              <Input
                @change="imagesHandler"
                type="file"
                accept="image/*"
                multiple
                :required="!listing.images.length"
                :disabled="disabledFileInput"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="listing.is_secondhand" class="group group-3">
              <span>
                <span>Büyük Görsel</span>
              </span>

              <!-- .secondhand-images start -->
              <div class="secondhand-images">
                <!-- .showcase start -->
                <div class="image showcase">
                  <img loading="lazy" :src="showcaseImage.image" alt="" />
                </div>
                <!-- .showcase end -->
              </div>
              <!-- .secondhand-images end -->
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="listing.is_secondhand" class="group group-9">
              <span>
                <span>Diğer Görseller</span>
              </span>

              <!-- .secondhand-images start -->
              <div class="secondhand-images">
                <!-- .image start -->
                <div
                  v-if="listing.images.length"
                  v-for="(image, index) in listing.images_url"
                  class="image"
                >
                  <span
                    class="label success set-showcase"
                    @click="setShowcase(image)"
                    >Büyük Görsel</span
                  >
                  <span
                    v-if="listing.images.length > 1"
                    class="label danger remove-image"
                    @click="removeImage(image)"
                    >Sil</span
                  >
                  <img loading="lazy" :src="image.image" alt="" />
                </div>
                <!-- .image end -->

                <!-- .image start -->
                <div class="image">
                  <span
                    class="label success set-showcase"
                    @click="setShowcase(listing.product_display.image_url)"
                    >Büyük Görsel</span
                  >
                  <img
                    loading="lazy"
                    :src="listing.product_display.image_url.image"
                    alt=""
                  />
                </div>
                <!-- .image end -->
              </div>
              <!-- .secondhand-images end -->
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-submit">
              <LoadingButton
                :loading="isLoading"
                title="Değişiklikleri Kaydet"
              />
            </div>
            <!-- .group end -->
          </form>
        </div>
        <!-- add listing end -->
      </div>
      <!-- #content end -->
    </div>
    <!-- #page end -->
  </div>
</template>

<style lang="scss" scoped>
@import '@@/variables';

.secondhand-images {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .image {
    width: calc((1050px / 5) - 16px);
    min-width: calc((1050px / 5) - 16px);
    height: calc((1050px / 5) - 16px);
    border: 1px solid $grey;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 0.35rem;
    margin: 8px 0;
    position: relative;

    .set-showcase,
    .remove-image {
      font-size: 0.65rem;
      position: absolute;
      top: 15px;
      cursor: pointer;
    }

    .set-showcase {
      left: 15px;
    }

    .remove-image {
      right: 15px;
    }

    & + .image {
      margin-left: 8px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      line-height: 1;
      border-radius: 0.35rem;
    }
  }
}
</style>
