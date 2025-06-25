<script setup>
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";
import {Form} from "@primevue/forms";
import {AppResolver} from "@/utils/form/resolver.js";
import {requiredValidator} from "@/utils/form/validators.js";
import ToggleSwitch from 'primevue/toggleswitch';

const emit = defineEmits(['prev', 'next']);

const hasAccounted = ref(false);

const accountantDocs = [
  {
    header: 'Данные бухгалтера',
    items: [
        {
        title: 'Документ, удостоверяющий личность бухгалтера',
        file: null
      },
      {
        title: 'Приказ о назначении бухгалтера',
        file: null
      }]
  }
];
const documents = reactive([
  {
    header: 'Корпоративные документы',
    items: [{
      title: 'Карточка с образцами подписей и оттисками печати (без нотариального заверения)',
      file: null
    },
      {
        title: 'Устав',
        file: null
      },]
  },
  {
    header: 'Данные руководителя',
    items: [
      {
        title: 'Документ, удостоверяющий личность руководителя',
        file: null
      },
      {
        title: 'Приказ о назначении директора',
        file: null
      }
    ]
  },

]);
const application = reactive({
  directorIsPublicPerson: 'true',
  relationWithBank: 'long',
  accountInAnotherBank: 'false',
  requiredPayUsa: 'false',
  accountInAnotherBankName: null,
  sourceMoneyOther: null,
  requiredPayUsaTaxId: null,
  sourceMoney: [],
  bankProducts: [],
});
const formValidRules = reactive({
  directorIsPublicPerson: [requiredValidator],
  bankProducts: [requiredValidator],
  sourceMoney: [requiredValidator],
  sourceMoneyOther: [
    (value) => {
      if (application.value.sourceMoney.includes('other')) {
        return requiredValidator(value)
      }
    },
  ],
  accountInAnotherBankName: [
    (value) => {
      if (application.value.accountInAnotherBank === 'false') {
        return true
      }

      return requiredValidator(value)
    },
  ],
});

const form = ref();

const onClickBack = () => {
  emit('prev')
}

const handleFileUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    documents[index].file = file
  }
}

watchEffect(() => {
  if (hasAccounted.value === false) {
    documents.push(...accountantDocs);
  } else {
    documents.splice(-1);
  }
})
</script>

<template>
  <AccountOpenCard>
    <template #title>
      <div class="flex mb-3">
        <div class="col-2 z-0">
          <AppButton
              severity="secondary"
              icon="pi pi-chevron-left"
              rounded
              @click="onClickBack"
          />
        </div>
        <div class="app-header-font-size col-8 text-center" style="color: #33373E;">
          Документы
        </div>
      </div>
    </template>

    <template #content>
      <Form
          ref="form"
          v-slot="$form"
          :resolver="(validation) => AppResolver(formValidRules, validation)"
          :validateOnBlur="true"
      >
        <div class="pl-4 mb-3" style="display: flex; font-size: 20px; color: #374867; align-items: center; gap: .5rem">
          <ToggleSwitch v-model="hasAccounted"/>
          Руководитель является бухгалтером
        </div>


        <ol class="pl-4" v-for="(item, index) in documents"
            :key="index">
          <div style="font-size: 18px;color: #374867; margin-bottom: 15px; font-weight: bold">
            {{ item.header }}
          </div>
          <li
              v-for="(infos, index) in item.items"
              :key="index"
              class="mb-3"
          >
            <div style="font-size: 18px" class="app-color-1B1B1C font-medium mb-3">
              {{ infos.title }}
            </div>

            <label class="custom-upload">
              {{ infos.file?.name || 'Загрузить файл' }}
              <input type="file" hidden @change="handleFileUpload($event, index)"/>
            </label>
          </li>
        </ol>
      </Form>
    </template>

    <template #footer>
      <div class="flex gap-4">
        <AppButton
            @click="onClickBack"
            class="flex-1"
            severity="secondary"
            label="Отменить"
        />

        <AppButton
            class="flex-1"
            label="Продолжить"
            @click="emit('next')"
        />
      </div>
    </template>
  </AccountOpenCard>
</template>

<style scoped lang="scss">
.custom-upload {
  display: inline-block;
  padding: 10px 16px;
  color: #374867;
  border: 2px solid #374867;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s, color 0.3s;
}

.custom-upload:hover {
  background-color: #374867;
  color: white;
}
</style>