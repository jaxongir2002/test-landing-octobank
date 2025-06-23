<script setup>
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";
import {Form} from "@primevue/forms";
import {AppResolver} from "@/utils/form/resolver.js";
import {requiredValidator} from "@/utils/form/validators.js";

const emit = defineEmits(['prev', 'next']);

const documents = reactive([
  {
    title: 'Копии паспортов директора и главного бухгалтера',
    file: null
  },
  {
    title: 'Карточка с образцами подписей и оттисками печати (без нотариального заверения)',
    file: null
  },
  {
    title: 'Копии учредительных документов (устав, учредительный договор, приказ с подписью директора, приказ с подписью директора и бухгалтера)',
    file: null
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

const validateErrorApplicationData = computed(() => {
  let error = false

  if (!application.value.bankProducts?.length) {
    error = true
  }

  if (!application.value.sourceMoney?.length) {
    error = true
  }

  if (application.value.accountInAnotherBank === 'true' && !application.value.accountInAnotherBankName?.trim()) {
    error = true
  }

  if (application.value.requiredPayUsa === 'true' && !application.value.requiredPayUsaTaxId?.trim()) {
    error = true
  }


  if (application.value.sourceMoney.includes('other') && !application.value.sourceMoneyOther?.trim()) {
    error = true
  }

  return error
})

const onClickBack = () => {
  emit('prev')
}

const handleFileUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    documents[index].file = file
  }
}
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
        <div class="app-h2 col-8 text-center" style="color: #33373E">
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
        <ol class="pl-4">
          <li
              v-for="(item, index) in documents"
              :key="index"
              class="mb-5"
          >
            <div style="font-size: 18px" class="app-color-1B1B1C font-medium mb-4">
              {{ item.title }}
            </div>

            <label class="custom-upload">
              {{ item.file?.name || 'Загрузить файл' }}
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