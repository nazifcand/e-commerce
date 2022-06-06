<script setup>
import { ref, computed } from 'vue';
import { orderItemStatuses } from '@/utils/kinds';

// services
import { setStatus, setShipment } from '@/services/order.service';
import { fetchCargoCompanies } from '@/services/common.service';
import { uploadDocument } from '@/services/upload.service';

// stores
import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

const props = defineProps({
  item: { type: Object, required: true },
  type: { type: String, default: 'seller' },
});

const cancellation_reason = ref('');
const modal = ref({
  isOpen: false,
  title: 'Sipariş satırını iptal et',
  form: 'rejectedForm',
  isLoading: false,
});
const shipped = ref({
  tracking_number: '',
  cargo_company: '',
  note: '',
  date: new Date().toISOString().substring(0, 10),
  selectedFile: null,
});

const nextStatuses = computed(() => {
  return orderItemStatuses.find(
    (i) => i.value == props.item.status && i.type == props.type
  ).next;
});

const cargoCompanies = computed(() => {
  return mainStore.cargoCompanies.reduce((arr, item) => {
    arr.push({
      value: item.id,
      label: item.name,
    });
    return arr;
  }, []);
});

const status = computed(() => {
  const status = orderItemStatuses.find((i) => i.value == props.item.status);
  return status;
});

const canceledOrder = () => {
  mainStore.showModal({
    title: 'Emin misiniz?',
    text: 'Bu satırı iptal etmek istediğinize emin misiniz?',
    icon: 'fa-exclamation-triangle',
    confirmButtonText: 'Evet, İptal et!',
    cancelButtonText: 'Vazgeç',
    confirm: () => changeStatus('canceled'),
  });
};

const rejectedOrderHandler = () => {
  modal.value = {
    ...{
      isOpen: true,
      title: 'Sipariş satırını iptal et',
      form: 'rejectedForm',
      isLoading: false,
    },
  };
};

const rejectedOrder = () => {
  modal.value.isOpen = false;
  mainStore.showModal({
    title: 'Emin misiniz?',
    text: 'Bu satırı onaylamamak istediğinize emin misiniz?',
    icon: 'fa-exclamation-triangle',
    confirmButtonText: 'Evet, Onaylama!',
    cancelButtonText: 'Vazgeç',
    confirm: async () => {
      const { id } = props.item;
      const [error, data] = await setStatus([
        {
          id,
          status: 'rejected',
          cancellation_reason: cancellation_reason.value,
        },
      ]);
      if (!error) {
        props.item.status = 'rejected';
      }
      cancellation_reason.value = '';
      modal.value.isOpen = false;
    },
  });
};

const shippedOrderHandler = async () => {
  // fetch cargo companies
  if (!mainStore.cargoCompanies.length) {
    const [err, cargoCompanies] = await fetchCargoCompanies();
    mainStore.cargoCompanies = cargoCompanies.results;
  }

  modal.value = {
    ...{
      isOpen: true,
      title: 'Sipariş satırını kargola',
      form: 'shippedForm',
      isLoading: false,
    },
  };
};

const shippedOrder = () => {
  modal.value.isOpen = false;
  mainStore.showModal({
    title: 'Emin misiniz?',
    text: 'Bu satırı kargolamak istediğinize emin misiniz?',
    icon: 'fa-exclamation-triangle',
    confirmButtonText: 'Evet, Kargola!',
    cancelButtonText: 'Vazgeç',
    confirm: async () => {
      /*  */
      const status = 'shipped';
      const { id } = props.item;
      const { tracking_number, cargo_company, date, note } = shipped.value;

      // check file
      if (!shipped.value.selectedFile) {
        alert('Fatura eklemek zorunlu');
        return;
      }

      const formData = new FormData();
      formData.append('kind', 'invoice');
      formData.append('document', shipped.value.selectedFile);

      const [uploadedDocErr, uploadedDoc] = await uploadDocument(formData);

      // is error
      if (uploadedDocErr) {
        alert('Fatura yuklenemedi!');
        return;
      }

      // set shipment data
      let [shipmentErr, shipmentData] = await setShipment([
        {
          id,
          tracking_number,
          cargo_company,
          date,
          note,
          document: uploadedDoc.id,
        },
      ]);

      // is error
      if (shipmentErr) {
        alert('shipment err!');
        return;
      }

      // set status
      let [error, data] = await setStatus([{ id, status }]);
      props.item.status = status;

      // find selected cargo comp
      const cargo_company_display = mainStore.cargoCompanies.filter(
        (i) => i.id == cargo_company
      )[0];

      // set shipment data
      props.item.shipment = {
        tracking_number,
        cargo_company,
        date,
        cargo_company_display,
        document: uploadedDoc.id,
        document_url: uploadedDoc,
      };

      modal.value.isOpen = false;
    },
  });
};

const confirmedOrder = () => {
  mainStore.showModal({
    title: 'Emin misiniz?',
    text: 'Bu ürünü göndermek için onaylamak istediğinize emin misiniz?',
    icon: 'fa-info-circle',
    confirmButtonText: 'Evet, Onayla!',
    cancelButtonText: 'Vazgeç',
    confirm: () => changeStatus('confirmed'),
  });
};

const receivedOrder = () => {
  mainStore.showModal({
    title: 'Emin misiniz?',
    text: 'Bu ürünü hatasız bir şekilde teslim aldınız mı?',
    icon: 'fa-exclamation-triangle',
    confirmButtonText: 'Evet, Teslim aldım!',
    cancelButtonText: 'Vazgeç',
    confirm: () => changeStatus('received'),
  });
};

const onChange = (event) => {
  const { files } = event.target;
  const file = [...files][0];
  if (!file) return;
  shipped.value.selectedFile = file;
};

const changeStatus = async (status) => {
  const { id } = props.item;
  // confirmed, canceled, received
  const [error, changedStatus] = await setStatus([{ id, status }]);
  if (!error) {
    props.item.status = status;
  }
};
</script>

<template>
  <!-- .status-display start -->
  <div class="status-display">
    <!-- rejected -->
    <template v-if="status.value == 'rejected'">
      <strong class="text-danger">
        <i class="far fa-times"></i> Satıcı tarafından reddedildi
      </strong>
    </template>

    <!-- canceled -->
    <template v-if="status.value == 'canceled'">
      <strong class="text-danger">
        <i class="far fa-times"></i> Alıcı tarafından reddedildi
      </strong>
    </template>

    <!-- shipped -->
    <template v-if="status.value == 'shipped'">
      <strong class="text-info">
        <i class="far fa-truck-moving"></i> Kargoya verildi
      </strong>
    </template>

    <!-- awaiting -->
    <template v-if="status.value == 'awaiting'">
      <strong class="text-primary">
        <i class="far fa-thumbs-up"></i> Sipariş Alındı
      </strong>
    </template>

    <!-- confirmed -->
    <template v-if="status.value == 'confirmed'">
      <strong class="text-warning">
        <i class="far fa-clock"></i> Hazırlanıyor
      </strong>
    </template>

    <!-- received -->
    <template v-if="status.value == 'received'">
      <strong class="text-success">
        <i class="far fa-check"></i> Tamamlandı
      </strong>
    </template>
  </div>
  <!-- .status-display end -->

  <!-- actions start -->
  <div class="actions">
    <!-- confirmed button start -->
    <button
      v-if="nextStatuses.includes('confirmed')"
      class="btn warning"
      @click="confirmedOrder"
    >
      Onayla
    </button>
    <!-- confirmed button end -->

    <!-- received button start -->
    <button
      v-if="nextStatuses.includes('received')"
      class="btn success"
      @click="receivedOrder"
    >
      Teslim Aldım
    </button>
    <!-- received button end -->

    <!-- shipped button start -->
    <button
      v-if="nextStatuses.includes('shipped')"
      class="btn info"
      @click="shippedOrderHandler"
    >
      Kargo/Fatura Bilgisi Ekle
    </button>
    <!-- shipped button end -->

    <!-- rejected button start -->
    <button
      v-if="nextStatuses.includes('rejected')"
      class="btn danger"
      @click="rejectedOrderHandler"
    >
      Reddet
    </button>
    <!-- rejected button end -->

    <!-- cancelled button start -->
    <button
      v-if="nextStatuses.includes('canceled')"
      class="btn danger"
      @click="canceledOrder"
    >
      İptal Et
    </button>
    <!-- cancelled button end -->
  </div>
  <!-- actions end -->

  <!-- modal start -->
  <Modal v-model:open="modal.isOpen" :title="modal.title">
    <template #content>
      <!-- rejected form start -->
      <form v-if="modal.form == 'rejectedForm'" @submit.prevent="rejectedOrder">
        <div class="group">
          <span class="required">
            <span>Ürün</span>
          </span>
          <Input v-model="item.product_name" disabled />
        </div>

        <div class="group">
          <span class="required">
            <span>İptal Sebebiniz</span>
          </span>
          <Textarea
            v-model="cancellation_reason"
            minlength="25"
            placeholder="Örnek: Elimizde yeteri kadar stok olmadığı için gönderim sağlayamıyoruz."
            required
          />
        </div>

        <div class="group group-submit">
          <LoadingButton title="Sipariş Satırını Reddet" />
        </div>
      </form>
      <!-- rejected form end -->

      <!-- shipped form start -->
      <form v-if="modal.form == 'shippedForm'" @submit.prevent="shippedOrder">
        <div class="group">
          <span class="required">
            <span>Ürün</span>
          </span>
          <Input v-model="item.product_name" disabled />
        </div>

        <div class="group group-6">
          <span class="required">
            <span>Kargo Firması</span>
          </span>
          <SingleSelect
            v-model="shipped.cargo_company"
            :options="cargoCompanies"
            placeholder="Kargo firması seçiniz"
            required
          />
        </div>

        <div class="group group-6">
          <span class="">
            <span>Takip Numarası</span>
          </span>
          <Input
            v-model="shipped.tracking_number"
            :readonly="!shipped.cargo_company"
            placeholder="Takip numarası girin"
          />
        </div>

        <div class="group group-6">
          <span class="required">
            <span>Fatura</span>
          </span>
          <Input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            @change="onChange"
            required
          />
        </div>

        <div class="group group-6">
          <span class="required">
            <span>Tarih</span>
          </span>
          <Input type="date" v-model="shipped.date" />
        </div>

        <div class="group">
          <span class="">
            <span>Not</span>
          </span>
          <Textarea v-model="shipped.note" placeholder="Kargo notu giriniz" />
        </div>

        <div class="group group-submit">
          <LoadingButton title="Sipariş Satırını Kargola" />
        </div>
      </form>
      <!-- shipped form end -->
    </template>
  </Modal>
  <!--  modal end -->
</template>

<style lang="scss" scoped></style>
