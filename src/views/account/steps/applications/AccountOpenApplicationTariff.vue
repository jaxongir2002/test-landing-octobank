<script setup>
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";
import {AppResolver} from "@/utils/form/resolver.js";
import {Form} from "@primevue/forms";
import {requiredValidator} from "@/utils/form/validators.js";
import AppRadioButton from "@/components/form-inputs/AppRadioButton.vue";
import AppCheckbox from "@/components/form-inputs/AppCheckbox.vue";
import {useVariantResolver} from "@/stores/useVariantResolver.js";
import Divider from 'primevue/divider';
import {getOnlyNumbersFromString} from "@/utils/index.js";

const emit = defineEmits(['prev', 'next']);

const countEmployees = reactive([{
  pinfl: "",
  phone: "",
}]);

const updateCountEmployees = (count) => {
  const newEmployees = []

  for (let i = 0; i < count; i++) {
    newEmployees.push({
      pinfl: "",
      phone: "",
    })
  }

  countEmployees.value = newEmployees
}

const generateValidateForEimzoEmployees = computed(() => {
  let validEmployees = {}

  countEmployees.value.forEach((item, i) => {
    let keyPinfl = `employeePinfl-${i}`
    let keyPhone = `employeePhone-${i}`

    validEmployees[keyPinfl] = [(val) => requiredValidator.call(null, val)]
    validEmployees[keyPhone] = [(val) => requiredValidator.call(null, val)]
  })

  return validEmployees
})

const application = ref({
  valute: 'uzs',
  oferta: [],
  services: [],
  primary: 'yes',
  acquiring: [],
  tarif: 'yes',
  employee: {
    phone: null,
    pinfl: null,
  }
})

const formValidRules = computed(() => {
  return {
    oferta: [(val) => requiredValidator.call(null, val, 'Оферта обязательна к прочтению')],
    ...generateValidateForEimzoEmployees.value,
  }
})

const validateErrorApplicationData = computed(() => {
  let error = false

  if (!application.value.oferta?.length) {
    error = true
  }

  return error
})

const onClickBack = () => {
  emit('prev')
}

const onAcceptPetition = () => {
  emit('next', useVariantResolver().variantAcceptPetition)
}

const onUpdateCountEimzo = (value) => {
  let num = parseInt(getOnlyNumbersFromString(value.value))

  if (num > 10) {
    application.value.countEimzo = 10
    num = 10
  } else if (num < 0) {
    application.value.countEimzo = 0
    num = 0
  }

  updateCountEmployees(num)
}
const openFile = (filename) => {
  const url = `/files/${filename}`
  window.open(url, '_blank')
}
</script>

<template>
  <AccountOpenCard>
    <template #title>
      <div class="flex flex-col sm:flex-row sm:mb-3 mb-5">
        <div class="sm:col-2 mb-2 sm:mb-0">
          <AppButton
              severity="secondary"
              icon="pi pi-chevron-left"
              rounded
              @click="onClickBack"
          />
        </div>
        <div class="text-center sm:col-8">
          <div class="app-h2 text-center sm:text-5xl font-semibold" style="color: #33373e">Детали открываемого счета
          </div>
          <div class="text-base sm:text-lg">Ответьте на вопросы</div>
        </div>
      </div>
    </template>

    <template #content>
      <Form
          ref="form"
          v-slot="$form"
          :resolver="(validation) => AppResolver(formValidRules, validation)"
          :validateOnBlur="true"
          :validateOnValueUpdate="false"
      >
        <ol class="pl-0 sm:pl-4">

          <li class="mb-5">
            <div class="app-color-1B1B1C mr-3 text-xl font-medium mb-4 flex items-center flex-wrap">
              Тариф
            </div>

            <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem;">
              <AppRadioButton
                  v-model="application.tarif"
                  label="test"
                  style="grid-column: span 12 / span 12"
                  name="tarif"
                  value="yes"
              />
              <AppRadioButton
                  style="grid-column: span 12 / span 12"
                  v-model="application.tarif"
                  label="test"
                  name="tarif"
                  value="no"
              />
            </div>
          </li>
          <li class="mb-5">
            <div class="app-color-1B1B1C font-medium mb-4 flex items-center flex-wrap">
              <span class="mr-3 text-xl">Тип счета</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem;">
              <AppRadioButton
                  v-model="application.primary"
                  label="Основной"
                  style="grid-column: span 6 / span 6"
                  name="primary"
                  value="yes"
              />
              <AppRadioButton
                  style="grid-column: span 6 / span 6"
                  v-model="application.primary"
                  label="Вторичный"
                  name="primary"
                  value="no"
              />
            </div>
          </li>
          <li class="mb-5">
            <div class="app-color-1B1B1C font-medium mb-4 text-xl">
              Выбор дополнительной валюты
            </div>
            <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem;">
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="В долларах США"
                    name="services"
                    value="usd"
                />
              </div>
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="В евро"
                    name="services"
                    value="euro"
                />
              </div>
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="В российских рублях"
                    name="services"
                    value="rub"
                />
              </div>
            </div>
          </li>

          <!-- 3. Дополнительные услуги -->
          <li class="mb-5">
            <div class="app-color-1B1B1C font-medium mb-4 text-xl">
              Дополнительные услуги
            </div>
            <div class="flex flex-column gap-2">
              <div style="display: flex; align-items: center; gap: .5rem">
                <AppCheckbox
                    v-model="application.acquiring"
                    label="Эквайринг"
                    name="acquiring"
                    value="yes"
                />
                <i
                    v-tooltip.bottom="'Тариф'"
                    @click="openFile('document.docx')"
                    class="pi pi-info-circle app-icon-span"
                ></i>
              </div>

              <div style="display: flex; align-items: center; gap: .5rem">
                <AppCheckbox
                    v-model="application.acquiring"
                    label="Интернет Эквайринг"
                    name="acquiring"
                    value="no"
                />
                <i
                    v-tooltip.bottom="'Тариф'"
                    @click="openFile('document.docx')"
                    class="pi pi-info-circle app-icon-span"
                ></i>
              </div>

            </div>
            <Divider class="mb-4"/>

            <div class="flex flex-column gap-2">
              <AppCheckbox
                  v-model="application.oferta"
                  label="Нажимая на кнопку, я подтверждаю оферту на открытие счета и ДКБО"
                  value="oferta"
                  name="oferta"
                  :error-message="$form?.oferta?.error?.message"
              />


              <AppCheckbox
                  v-model="application.oferta"
                  label="Нажимая на кнопку, я подтверждаю оферту на эквайринг"
                  value="yes"
                  name="acquiring"
                  :error-message="$form?.oferta?.error?.message"
              />
            </div>
          </li>
        </ol>
      </Form>
    </template>

    <template #footer>
      <div class="flex flex-col sm:flex-row gap-4">
        <AppButton
            @click="onClickBack"
            class="flex-1"
            severity="secondary"
            label="Отменить"
        />

        <AppButton
            :disabled="validateErrorApplicationData"
            class="flex-1"
            label="Оставить заявку"
            @click="onAcceptPetition"
        />
      </div>
    </template>
  </AccountOpenCard>
</template>
