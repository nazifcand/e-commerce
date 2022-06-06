<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['newListing']);

// services
import { createListing } from '@/services/listing.service';
import { uploadImages } from '@/services/upload.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

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
const selectedProduct = ref({
  barcode: '',
});
const selectedImages = ref([]);
const listing = ref({
  expiry: '',
  price: '',
  quantity: '',
  description: '',
  max_quantity: '',
  min_quantity: '',
  buying_price: '',
  product_code: '',
  images: [],
  condition: 'middle',
  is_secondhand: false,
  shipment_kind: 'reverse_charge',
  usage_time: '',
});

const selectedHandler = (product) => {
  selectedProduct.value = { ...product };
  console.log({ product });
  listing.value.product_code = product.barcode;
};

const showForm = computed(() => {
  const {
    billing_address,
    billing_city,
    billing_district,
    iban,
    tax_number,
    tax_office,
    bank_account_name,
  } = mainStore.user.company;
  if (
    !billing_address ||
    !billing_city ||
    !billing_district ||
    !iban ||
    !tax_number ||
    !tax_office ||
    !bank_account_name
  ) {
    return false;
  }
  return true;
});

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

const clearForm = () => {
  selectedProduct.value = null;
  selectedImages.value.splice(0);
  showOtherFields.value = false;
  listing.value = {
    ...{
      expiry: '',
      price: '',
      quantity: '',
      description: '',
      max_quantity: '',
      min_quantity: '',
      buying_price: '',
      product_code: '',
      images: [],
      condition: 'middle',
      is_secondhand: false,
      shipment_kind: 'reverse_charge',
      usage_time: '',
    },
  };
};

const submitHandler = async () => {
  isLoading.value = true;
  alertStore.removeAllAlerts();

  const productID = selectedProduct.value.id;
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
    const [uploadImagesError, uploadedImages] = await uploadImages(formData);

    // is error
    if (uploadImagesError) {
      alertStore.add({
        text: 'İlan görselleri yüklenirken bir sorunla karşılaşıldı, ilan oluşturulamadı!',
        class: 'danger',
      });
      isLoading.value = false;
      return;
    }

    // set image ids
    listingData.images = uploadedImages.results.map((i) => ({
      id: i.id,
    }));
  }

  // create listing
  const [createdListingError, createdListing] = await createListing(
    productID,
    listingData
  );
  isLoading.value = false;

  // is error
  if (createdListingError) {
    alertStore.parseValidErrors(createdListingError.data);
    return;
  }

  // success
  alertStore.add({
    text: 'İlanınız başarıyla oluşturuldu',
    class: 'success',
  });
  emit('newListing', createdListing);
  clearForm();
};
</script>

<template>
  <!-- alerts start -->
  <Alerts />
  <!-- alerts end -->

  <!-- company-info start -->
  <div v-if="!showForm" class="base">
    <div class="alert warning">
      <p>
        Ürün satışı yapabilmek için firma bilgilerinizin tamamlanmış olması
        gerekmektedir.
        <router-link to="/profile/settings/company/"
          ><strong
            >Firma bilgilerinizi tamamlamak için tıklayın.</strong
          ></router-link
        >
      </p>
    </div>
  </div>
  <!-- company-info end -->

  <!-- add listing start -->
  <div v-if="showForm" class="base">
    <form @submit.prevent="submitHandler">
      <!-- .group start -->
      <div class="group group-4">
        <span class="required">
          <span>Ürün Adı</span>
          <Question
            text="İlan oluşturmak istediğiniz ürünü seçiniz. Eğer ürün sistemde yoksa ürünü önererek bize yardımcı olabilirsiniz."
          />
        </span>
        <ProductSelectInput
          placeholder="Ürün adı, uts kodu veya barkod yazınız..."
          required
          :product="selectedProduct"
          @selected="selectedHandler"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-2">
        <span class="required">
          <span>Urun Barkod</span>
          <Question text="Firma içerisinde kullandığınız ürün takip numarası" />
        </span>
        <Input
          v-model="selectedProduct.barcode"
          placeholder="Barkod girin"
          disabled
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
          :disabled="!selectedProduct.id"
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
          :disabled="!selectedProduct.id"
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
          :disabled="!selectedProduct.id"
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
          :disabled="!selectedProduct.id"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div v-if="showOtherFields" class="group group-3">
        <span class="required">
          <span>Firma barkod</span>
          <Question text="Firma içerisinde kullandığınız ürün takip numarası" />
        </span>
        <Input
          v-model="listing.product_code"
          placeholder="Barkod girin"
          :disabled="!selectedProduct.id"
          required
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div v-if="showOtherFields" class="group group-2">
        <span class="">
          <span>En Az Satış Miktarı</span>
          <Question text="Bir siparişte sepete eklenecek en düşük miktardır" />
        </span>
        <Input
          v-model="listing.min_quantity"
          placeholder="En az satış miktarı girin"
          :disabled="!selectedProduct.id"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div v-if="showOtherFields" class="group group-2">
        <span class="">
          <span>En Fazla Satış Miktarı</span>
          <Question text="Bir siparişte sepete eklenecek en fazla miktardır" />
        </span>
        <Input
          v-model="listing.max_quantity"
          placeholder="En fazla satış miktarı girin"
          :disabled="!selectedProduct.id"
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div v-if="showOtherFields" class="group group-2">
        <span class="">
          <span>Kargo</span>
          <Question text="Kargo" />
        </span>
        <SingleSelect
          v-model="listing.shipment_kind"
          :options="shipmentStatuses"
          placeholder="Kargo seçiniz"
          :disabled="!selectedProduct.id"
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
          :disabled="!selectedProduct.id"
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
        <Switch
          v-model="listing.is_secondhand"
          :disabled="!selectedProduct.id"
        />
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
          :disabled="!selectedProduct.id"
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
          :disabled="!selectedProduct.id"
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
          <Question
            text="Satmak istediğiniz ürüne ait görseller (en fazla 3 adet)"
          />
        </span>
        <Input
          required
          :disabled="!selectedProduct.id"
          @change="imagesHandler"
          type="file"
          accept="image/*"
          multiple
        />
      </div>
      <!-- .group end -->

      <!-- .group start -->
      <div class="group group-submit">
        <LoadingButton :loading="isLoading" />

        <div style="margin-left: auto">
          <router-link to="/profile/listings/import">
            <button class="btn warning">İçeri Aktar</button>
          </router-link>
          <!-- <router-link class="btn warning" style="margin-left: 0.5rem">
            Dışarı Aktar
          </router-link> -->
        </div>
      </div>
      <!-- .group end -->
    </form>
  </div>
  <!-- add listing end -->
</template>
