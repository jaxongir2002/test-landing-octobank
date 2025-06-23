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

const countEmployees = ref([
  {
    pinfl: "",
    phone: "",
  }
]);

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
  primary: 'no',
  acquiring: [],
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
          <div class="app-h2 text-center sm:text-5xl font-semibold" style="color: #33373e">Заполните анкету</div>
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
            <div class="app-color-1B1B1C font-medium mb-4 flex items-center flex-wrap">
              <span class="mr-3 text-xl">Открыть счет в национальной валюте на тарифе ОПТИМАЛ</span>
              <i
                  v-tooltip.bottom="'Тариф'"
                  @click="openFile('document.docx')"
                  class="pi pi-info-circle app-icon-span"
              ></i>
            </div>

            <div class="flex flex-column gap-2">
              <AppRadioButton
                  v-model="application.primary"
                  label="Первичный"
                  name="primary"
                  value="yes"
              />
              <AppRadioButton
                  v-model="application.primary"
                  label="Вторичный"
                  name="primary"
                  value="no"
              />
            </div>
          </li>

          <!-- 2. Продукт РКО -->
          <li class="mb-5">
            <div class="app-color-1B1B1C font-medium mb-4 text-xl">Продукт РКО</div>
            <div class="flex flex-column gap-2">
              <AppCheckbox
                  v-model="application.acquiring"
                  label="Эквайринг"
                  name="acquiring"
                  value="yes"
              />
              <AppCheckbox
                  v-model="application.acquiring"
                  label="Интернет Эквайринг"
                  name="acquiring"
                  value="no"
              />
            </div>
          </li>

          <!-- 3. Дополнительные услуги -->
          <li class="mb-5">
            <div class="app-color-1B1B1C font-medium mb-4 text-xl">
              Дополнительные услуги
            </div>
            <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem;">
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="Платежные (торговые) терминалы"
                    name="services"
                    value="terminal"
                />
              </div>
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="Операции в иностранной валюте"
                    name="services"
                    value="kkm"
                />
              </div>
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="Пластиковые карты"
                    name="services"
                    value="copr-card"
                />
              </div>
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="Зарплатный проект"
                    name="services"
                    value="salary-project"
                />
              </div>
            </div>


            <Divider class="mb-4"/>

            <div class="flex flex-column gap-2">
              <AppCheckbox
                  v-model="application.oferta"
                  label="Оферта на открытие счета и ДКБО"
                  value="oferta"
                  name="oferta"
                  :error-message="$form?.oferta?.error?.message"
              />
              <AppCheckbox
                  v-model="application.oferta"
                  label="Оферта на эквайринг"
                  value="offerta_acquiring"
                  name="oferta"
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
