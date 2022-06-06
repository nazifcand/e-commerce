<script setup>
import { computed, ref } from 'vue';
import * as XLSX from 'xlsx';
import * as zip from '@zip.js/zip.js';

const isLoading = ref(false);
const rows = ref([{}]);
const images = ref([]);
const selectedSheet = ref(null);
const excellSheets = ref({});
const steps = ref([
  { label: 'Ürünleri seçin', value: 'selectProducts' },
  { label: 'Görselleri seçin', value: 'selectImages' },
  { label: 'Sayfa seçin', value: 'selectPage' },
  { label: 'Sütünları eşleştirin', value: 'matchFields' },
  { label: 'Düzenle', value: 'edit' },
]);
const constantFields = ref([
  { label: 'Görsel', value: 'image', required: true, matched: '' },
  { label: 'Ürün Adı', value: 'name', required: true, matched: '' },
  { label: 'Kategori', value: 'category', required: true, matched: '' },
  { label: 'Marka', value: 'brand', required: true, matched: '' },
  { label: 'Model', value: 'model', required: true, matched: '' },
  {
    label: 'Barkod veya UTS',
    value: 'barcode',
    required: true,
    matched: '',
  },
  { label: 'Miat', value: 'expiry', required: false, matched: '' },
  { label: 'Stok', value: 'stock', required: true, matched: '' },
  { label: 'Fiyat', value: 'price', required: true, matched: '' },
]);

const titles = computed(() => {
  return Object.keys(rows.value[0]).filter((i) => i != 'Firma');
});

const selectedSheetFields = computed(() => {
  return Object.keys(excellSheets.value[selectedSheet.value][0]);
});

const getFieldsForSingleSelect = computed(() => {
  return selectedSheetFields.value.map((item) => {
    return {
      value: item,
      label: item,
    };
  });
});

const productHandler = (e) => {
  if (!e.target.files[0]) return false;
  const file = e.target.files[0];

  // read excel file
  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    const workbook = XLSX.read(event.target.result, {
      type: 'binary',
    });
    workbook.SheetNames.forEach((sheet) => {
      let sheetObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      excellSheets.value[sheet] = sheetObject;
      if (!selectedSheet.value) {
        selectedSheet.value = sheet;
        selectSheet(sheet);
      }
    });
  };
  fileReader.readAsBinaryString(file);
};

const imagesHandler = async (e) => {
  if (!e.target.files[0]) return false;
  const file = e.target.files[0];

  // read zip file
  const blob = new Blob([file]);
  const reader = new zip.ZipReader(new zip.BlobReader(blob));
  const entries = await reader.getEntries();

  if (entries.length) {
    entries.forEach(async (entry) => {
      const item = await entry.getData(new zip.Data64URIWriter());
      images.value.push({
        file: item,
        name: entry.filename,
      });
    });
  }
  await reader.close();
};

const selectSheet = (sheet) => {
  selectedSheet.value = sheet;

  constantFields.value = constantFields.value.map((field) => {
    const regex = new RegExp(field.label.toLocaleLowerCase(), 'ig');

    selectedSheetFields.value.forEach((item) => {
      if (item.toLocaleLowerCase().match(regex)) {
        field.matched = item;
      }
    });

    return field;
  });
};

const getImage = (field) => {
  const regex = new RegExp(field, 'ig');
  return images.value.find((item) => item.name.match(regex)) ?? field;
};
</script>

<template>
  <Breadcrumb v-bind="$attrs">
    <span>Profil</span>
    <router-link to="/profile/listings">İlanlarım</router-link>
    <strong>İçeri Aktar</strong>
  </Breadcrumb>

  <div class="container">
    <Stepper :steps="steps">
      <template #content="{ step, back, next }">
        <!-- upload excell file  -->
        <template v-if="step == 'selectProducts'">
          <div class="base">
            <form @submit.prevent="next">
              <div class="group group-6">
                <span class="required">
                  <span>Ürünler</span>
                </span>
                <Input
                  required
                  type="file"
                  accept=".xlsx"
                  @change="productHandler"
                />
              </div>

              <div class="group group-6 group-submit">
                <LoadingButton title="Devam Et" />
              </div>
            </form>
          </div>
        </template>

        <!-- upload zip file  -->
        <template v-if="step == 'selectImages'">
          <div class="base">
            <form @submit.prevent="next">
              <div class="group group-6">
                <span class="required">
                  <span>Görseller</span>
                </span>
                <Input
                  required
                  type="file"
                  accept=".zip"
                  @change="imagesHandler"
                />
              </div>

              <div class="group group-6 group-submit">
                <button class="btn" @click.self="back">Geri</button>
                <LoadingButton title="Devam Et" />
              </div>
            </form>
          </div>
        </template>

        <!-- select sheet  -->
        <template v-if="step == 'selectPage'">
          <div v-if="Object.keys(excellSheets).length > 1" class="base">
            <div class="alert warning">
              Yüklediğiniz ürün dosyasında birden
              <strong>sayfa çalışma alanı(sayfa)</strong>
              var. Kullanmak istediğiniz sayfayı seçin.
            </div>
          </div>

          <div class="base">
            <!-- #select-sheet start -->
            <div id="select-sheet">
              <!-- #sheets start -->
              <div id="sheets">
                <!-- .sheet start -->
                <div
                  v-for="(sheet, index) in Object.keys(excellSheets)"
                  :key="index"
                  class="sheet"
                  :class="{ selected: sheet == selectedSheet }"
                  @click="selectSheet(sheet)"
                >
                  {{ sheet }}
                </div>
                <!-- .sheet end -->
              </div>
              <!-- #sheets end -->

              <!-- #fields start -->
              <div id="fields">
                <h3>{{ selectedSheet }} içerisinden örnek satırlar</h3>
                <table>
                  <thead>
                    <tr>
                      <th
                        v-for="(field, index) in Object.keys(
                          excellSheets[selectedSheet][0]
                        )"
                      >
                        {{ field }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, rowIndex) in excellSheets[
                        selectedSheet
                      ].slice(0, 3)"
                    >
                      <td
                        v-for="(field, index) in Object.keys(
                          excellSheets[selectedSheet][0]
                        )"
                      >
                        {{ row[field] }}
                      </td>
                    </tr>
                    <tr v-if="excellSheets[selectedSheet].length > 3">
                      <td :colspan="selectedSheetFields.length">
                        {{ excellSheets[selectedSheet].length - 3 }}
                        satır data var
                      </td>
                    </tr>
                  </tbody>
                </table>

                <form>
                  <div class="group group-submit">
                    <button class="btn" @click.self="back">Geri</button>
                    <LoadingButton title="Devam et" @click="next" />
                  </div>
                </form>
              </div>
              <!-- #fields end -->
            </div>
            <!-- #select-sheet end -->
          </div>
        </template>

        <!-- match field -->
        <template v-if="step == 'matchFields'">
          <div class="base">
            <div class="alert warning">
              Zorunlu alanları, yüklediğiniz dosyadaki alanlar ile eşleştirin
            </div>
          </div>
          <div class="base overflow-none">
            <!-- #match-field start -->
            <div id="match-field">
              <form @submit.prevent="next">
                <template v-for="(field, index) in constantFields" :key="index">
                  <div class="group group-7">
                    <div class="field">
                      <span :class="{ required: field.required }"
                        >{{ field.label }}
                      </span>
                      <i class="far fa-long-arrow-right"></i>
                      <SingleSelect
                        :required="field.required"
                        v-model="field.matched"
                        :options="getFieldsForSingleSelect"
                        :placeholder="`${field.label} alanı`"
                      />
                    </div>
                  </div>
                </template>
                <div class="group group-7 group-submit">
                  <button class="btn" @click.self="back">Geri</button>
                  <LoadingButton title="Devam et" />
                </div>
              </form>
            </div>
            <!-- #match-field end -->
          </div>
        </template>

        <template v-if="step == 'edit'">
          <div class="base">
            <form>
              <div
                class="group group-submit"
                style="margin: 0 0 2rem; border: none; padding: none"
              >
                <button class="btn" @click.self="back">Geri</button>
                <LoadingButton :loading="true" title="Ürünleri Yükle" />
              </div>
            </form>
            <table>
              <thead>
                <tr>
                  <template v-for="(field, index) in constantFields">
                    <th v-if="field.matched">
                      {{ field.label }}
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in excellSheets[selectedSheet]">
                  <template v-for="(field, index) in constantFields">
                    <td v-if="field.matched">
                      <template v-if="field.value == 'image'">
                        <div class="image">
                          <img :src="getImage(row[field.matched]).file" />
                        </div>
                      </template>
                      <template v-else>
                        <Input v-model="row[field.matched]" />
                      </template>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </template>
    </Stepper>
  </div>
</template>

<style lang="scss" scoped>
@import '@@/variables';

#select-sheet {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  #sheets {
    width: 100%;
    display: flex;
    border: 1px solid $grey;
    border-radius: 0.35rem;
    overflow: hidden;

    .sheet {
      flex: 1;
      padding: 1rem 2rem;
      box-sizing: border-box;
      cursor: pointer;
      text-align: center;
      font-size: 0.85rem;
      transition: 0.35s all ease;

      &:hover {
        background-color: $grey;
      }

      &.selected {
        background-color: $main-color;
        color: #fff;
        border-color: darken($main-color, 10%);
      }
    }
  }

  #fields {
    flex: 1;
    overflow-x: scroll;
  }
}

#match-field {
  .field {
    width: 100%;
    display: flex;
    align-items: center;

    span {
      flex: 1;
    }

    i {
      margin-right: 10rem;
      color: $text-light;
    }
  }
}

table {
  width: 100%;
  border: 1px solid #ddd;
  font-size: 0.75rem;

  thead {
    tr {
      th {
        font-weight: bold;
      }
    }
  }

  tr {
    td,
    th {
      height: 40px;
      border: 1px solid #ddd;
      vertical-align: middle;
      padding: 10px 15px;
      line-height: 1.35;

      .image {
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
}
</style>
