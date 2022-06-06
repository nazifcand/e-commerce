<script setup>
import { ref, computed } from 'vue';
import { useTitle } from '@vueuse/core';
import { pageTitle } from '@/utils/utils';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

// services
import { fetchCategories } from '@/services/category.service';
import { fetchBrands } from '@/services/brand.service';
import { createListing } from '@/services/listing.service';
import { recommendProduct } from '@/services/product.service';
import { uploadImages } from '@/services/upload.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

const title = useTitle(pageTitle('Ürün Öner ve İlan Oluştur'));
const isLoading = ref(false);
const showOtherFields = ref(false);
const conditionTypes = ref([
  { value: 'very_worn', label: 'Çok yıpranmış' },
  { value: 'middle', label: 'Orta' },
  { value: 'good', label: 'İyi' },
]);
const shipmentStatuses = ref([
  { label: 'Alıcı Ödemeli', value: 'reverse_charge' },
  { label: 'Satıcı Ödemeli', value: 'without_charge' },
]);
const brands = ref({
  results: [],
});
const categories = ref({
  results: [],
});
const product = ref({
  name: null,
  description: '',
  barcode: null,
  gmdn: null,
  brand: null,
  image: null,
  category: null,
  hic_code: null,
  parent_name: null,
  model: null,
  pts_code: null,
});
const listing = ref({
  expiry: null,
  price: null,
  quantity: null,
  description: '',
  max_quantity: null,
  min_quantity: null,
  buying_price: null,
  product_code: null,
  images: [],
  condition: 'middle',
  is_secondhand: false,
  shipment_kind: 'reverse_charge',
  usage_time: null,
});
const selectedImages = ref([]);
const selectedImage = ref({ preview: null, file: null });

const getCategories = computed(() => {
  return categories.value.results.reduce((arr, item) => {
    // if (!item.parent) return arr;
    arr.push({
      label: item.name,
      value: item.name,
    });
    return arr;
  }, []);
});

const getBrands = computed(() => {
  return brands.value.results.reduce((arr, item) => {
    arr.push({
      label: item.name,
      value: item.name,
    });
    return arr;
  }, []);
});

(async () => {
  mainStore.isLoading = true;
  alertStore.add({
    text: '<p>Sistemde <strong>olmayan bir ürün</strong> ekliyorsunuz. Lütfen <strong>ürün önerisinde bulunmadan önce</strong>, ürünün sistemde olmadığından emin olun. Ürünün onaylanması <strong>1-2 iş günü</strong> içerisinde gerçekleşebilir. </p>',
    class: 'warning',
    deletable: false,
  });

  const [categoriesError, categoriesData] = await fetchCategories({
    page_size: 1000,
  });
  categories.value = categoriesData;

  const [brandsError, brandsData] = await fetchBrands();
  brands.value = brandsData;
  mainStore.isLoading = false;
})();

const clearForm = () => {
  showOtherFields.value = false;
  selectedImages.value.splice(0);
  selectedImage.value = { ...{ preview: null, file: null } };
  product.value = {
    ...{
      name: null,
      description: '',
      barcode: null,
      gmdn: null,
      brand: null,
      image: null,
      category: null,
      hic_code: null,
      parent_name: null,
      model: null,
      pts_code: null,
    },
  };
  listing.value = {
    ...{
      expiry: null,
      price: null,
      quantity: null,
      description: '',
      max_quantity: null,
      min_quantity: null,
      buying_price: null,
      product_code: null,
      images: [],
      condition: 'middle',
      is_secondhand: false,
      shipment_kind: 'reverse_charge',
      usage_time: null,
    },
  };
};

const imagesHandler = (event) => {
  selectedImages.value = [...event.target.files]
    .splice(0, 3)
    .reduce((arr, file) => {
      arr.push({
        preview: URL.createObjectURL(file),
        file,
      });
      return arr;
    }, []);
};

const imageHandler = (event) => {
  const file = event.target.files[0];
  selectedImage.value = {
    preview: URL.createObjectURL(file),
    file,
  };
};

const submitHandler = async () => {
  isLoading.value = true;
  alertStore.removeAlerts();

  const listingData = { ...listing.value };
  const productData = { ...product.value };

  // check expiry
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

  // set product_code
  if (!listingData.product_code) {
    listingData.product_code = productData.barcode;
  }

  // set pts_code
  if (!productData.pts_code) {
    productData.pts_code = productData.barcode;
  }

  // upload product image
  if (selectedImage.value.file) {
    const formData = new FormData();
    formData.append('kind', 'product');
    formData.append('image', selectedImage.value.file);

    // upload image
    const [uploadError, uploadedImages] = await uploadImages(formData);

    // is error
    if (uploadError) {
      alertStore.add({
        text: 'Ürün görseli yüklenemediği için ürün önerilemedi ve ilan oluşturulamadı!',
        class: 'danger',
      });
      isLoading.value = false;
      return;
    }
    product.value.image = uploadedImages.results[0].id;
  }

  // recomment product
  const [recommendedProductError, createdProduct] = await recommendProduct(
    product.value
  );

  // is error
  if (recommendedProductError) {
    alertStore.add({
      text: 'Ürün önerilemediği için ve ilan oluşturulamadı!',
      class: 'danger',
    });
    alertStore.parseValidErrors(recommendedProductError.data);
    isLoading.value = false;
    return;
  }

  // upload secondhand images
  if (listingData.is_secondhand && selectedImages.value.length) {
    const formData = new FormData();

    formData.append('kind', 'secondhand');
    selectedImages.value.forEach((file) => {
      formData.append('image', file.file);
    });

    // upload images
    const [uploadError, uploadedImages] = await uploadImages(formData);

    // is error
    if (uploadError) {
      alertStore.add({
        text: 'İlan resimleri yüklenemediği için ürün önerildi fakat ilan oluşturulamadı!',
        class: 'danger',
      });
      isLoading.value = false;
      return;
    }
    listingData.images = uploadedImages.results.map((i) => ({ id: i.id }));
  }

  // createListing
  const [createdListingError, createdListing] = await createListing(
    createdProduct.id,
    listingData
  );
  isLoading.value = false;

  if (createdListingError) {
    alertStore.add({
      text: 'İlan oluşturulurken bir hata meydana geldi. Ürün önerildi fakat ilan oluşturulamadı',
      class: 'danger',
    });
    alertStore.parseValidErrors(createdListingError.data);

    return;
  }

  // success
  alertStore.add({
    text: 'Başarıyla sisteme yeni ürün eklediniz ve ilan oluşturdunuz, yönlendiriliyorsunuz',
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
    <strong>Ürün Öner ve İlan Oluştur</strong>
  </Breadcrumb>

  <div class="container">
    <!-- #page start -->
    <div id="page">
      <!-- #content start -->
      <div id="content">
        <!-- alerts start -->
        <Alerts />
        <!-- alerts end -->

        <!-- add listing start -->
        <div class="base">
          <form @submit.prevent="submitHandler">
            <!-- .group start -->
            <div class="group group-4">
              <span class="required">
                <span>Ürün Görseli</span>
                <Question text="Ürünün genel görseli" />
              </span>
              <Input
                type="file"
                required
                accept="image/*"
                @change="imageHandler"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-4">
              <span class="required">
                <span>Ürün Adı</span>
                <Question text="Ürünün sitede görüleceği adını yazınız" />
              </span>
              <Input
                v-model="product.name"
                placeholder="Ürün adı girin."
                required
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-4">
              <span class="required">
                <span>Kategori</span>
              </span>
              <SingleSelect
                v-model="product.category"
                :options="getCategories"
                placeholder="Kategori seçin"
                required
                creatable
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-3">
              <span class="required">
                <span>Barkod veya ÜTS Kod</span>
                <Question text="Ürünün üzerinde yer alan barkod yazılacaktır" />
              </span>
              <Input
                v-model="product.barcode"
                placeholder="Barkod girin"
                required
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-3">
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
            <div class="group group-3">
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
            <div class="group group-3">
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
            <div class="group">
              <a
                href="#"
                class="show-other"
                :class="{ active: showOtherFields }"
                @click.prevent="showOtherFields = !showOtherFields"
              >
                <span>Diğer alanları da eklemek istiyorum</span>
                <i
                  class="fal"
                  :class="{
                    'fa-chevron-up': showOtherFields,
                    'fa-chevron-down': !showOtherFields,
                  }"
                ></i>
              </a>
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="showOtherFields" class="group group-4">
              <span class="">
                <span>Marka</span>
                <Question text="" />
              </span>
              <SingleSelect
                v-model="product.brand"
                :options="getBrands"
                placeholder="Marka seçin"
                creatable
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="showOtherFields" class="group group-4">
              <span>
                <span>Model</span>
              </span>
              <Input v-model="product.model" placeholder="Model girin" />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="showOtherFields" class="group group-4">
              <span class="">
                <span>Üst Ürün Adı</span>
              </span>
              <Input
                v-model="product.parent_name"
                placeholder="Üst ürün adı girin."
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="showOtherFields" class="group group-3">
              <span>
                <span>Global Ürün Kodu(GMDN)</span>
                <Question
                  text="Üts kaydında yer alan GMDN numarası olup 5 hanelidir"
                />
              </span>
              <Input
                v-model="product.gmdn"
                maxlength="5"
                placeholder="Global ürün kodu girin"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="showOtherFields" class="group group-3">
              <span>
                <span>Barkod</span>
                <Question
                  text="Firma içerisinde kullandığınız ürün takip numarası"
                />
              </span>
              <Input
                v-model="listing.product_code"
                placeholder="Firma takip kodu girin"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="showOtherFields" class="group group-3">
              <span>
                <span>SUT Kodu</span>
              </span>
              <Input v-model="product.hic_code" placeholder="SUT kodu girin" />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="showOtherFields" class="group group-3">
              <span>
                <span>ÜTS Kodu</span>
              </span>
              <Input v-model="product.pts_code" placeholder="ÜTS kodu girin" />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="showOtherFields" class="group group-3">
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
            <div v-if="showOtherFields" class="group group-3">
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
            <div v-if="showOtherFields" class="group group-3">
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
            <div v-if="showOtherFields" class="group group-3">
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
            <div v-if="showOtherFields" class="group">
              <span class="">
                <span>Ürün Genel Açıklaması</span>
                <Question
                  text="Ürünün diğer kullanıcılar tarafından görülecek açıklama metnidir. Özel bir not girmemelisiniz!"
                />
              </span>
              <Textarea
                v-model="product.description"
                placeholder="Ürün için bir açıklama girin"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div v-if="showOtherFields" class="group">
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
              v-if="showOtherFields"
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
            <div
              v-if="showOtherFields && listing.is_secondhand"
              class="group group-3"
            >
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
            <div
              v-if="showOtherFields && listing.is_secondhand"
              class="group group-3"
            >
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
            <div
              v-if="showOtherFields && listing.is_secondhand"
              class="group group-3"
            >
              <span class="required">
                <span>Görseller</span>
                <Question text="" />
              </span>
              <Input
                type="file"
                required
                multiple
                accept="image/*"
                @change="imagesHandler"
              />
            </div>
            <!-- .group end -->

            <!-- .group start -->
            <div class="group group-submit">
              <LoadingButton
                :loading="isLoading"
                title="Ürün Öner ve İlan Oluştur"
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
