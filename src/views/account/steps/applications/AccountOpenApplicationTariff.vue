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

const emit = defineEmits(['prev', 'next']);

const countEmployees = reactive([{
  pinfl: "",
  phone: "",
}]);

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
  additionalServices: ['internent_bank'],
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
  const hasOferta = application.value.oferta?.length > 0
  const hasAdditionalServices = application.value.additionalServices?.length > 0

  return !(hasOferta && hasAdditionalServices)
})


const onClickBack = () => {
  emit('prev')
}

const onAcceptPetition = () => {
  emit('next', useVariantResolver().variantAcceptPetition)
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
        <div class="text-center app-header-font-size font-semibold"
             style="color: #33373e; text-align: right; ;width: 70%">
          Детали открываемого счета
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
              <span class="mr-3 text-xl">Тип расчетного счета</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem;">
              <AppRadioButton
                  v-model="application.primary"
                  label="Основной счет"
                  style="grid-column: span 6 / span 6"
                  name="primary"
                  value="yes"
              />
              <AppRadioButton
                  style="grid-column: span 6 / span 6"
                  v-model="application.primary"
                  label="Вторичный счет"
                  name="primary"
                  value="no"
              />
            </div>
          </li>
          <li class="mb-5">
            <div class="app-color-1B1B1C mr-3 text-xl font-medium mb-4 flex items-center flex-wrap">
              Тариф
            </div>

            <div style="display: flex;gap: 0.5rem; align-items: center">
              <AppRadioButton
                  v-model="application.tarif"
                  label="Оптимал"
                  style="grid-column: span 12 / span 12"
                  name="tarif"
                  value="yes"
              />
              <a target="_blank" href="https://octobank.uz/biznesu/tarify-dlya-korporativnyh-klientov">
                <i
                    v-tooltip.bottom="'Тариф'"
                    style="scale: 1"
                    class="pi pi-info-circle app-icon-span"
                ></i>
              </a>

            </div>
          </li>
          <li class="mb-5">
            <div class="app-color-1B1B1C font-medium mb-4 text-xl">
              Валютные счета
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
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="В дирхамах"
                    name="services"
                    value="drxam"
                />
              </div>
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="В лирах"
                    name="services"
                    value="lira"
                />
              </div>
              <div style="grid-column: span 6 / span 6;">
                <AppCheckbox
                    v-model="application.services"
                    label="В юанях"
                    name="services"
                    value="yuan"
                />
              </div>
            </div>
          </li>
          <li class="mb-5">
            <div class="app-color-1B1B1C font-medium mb-4 text-xl">
              Выбор услуг
            </div>
            <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem;">
              <div style="grid-column: span 6 / span 6;" class="flex flex-column gap-2">
                <div style="display: flex; align-items: center; gap: .5rem">
                  <AppCheckbox
                      v-model="application.additionalServices"
                      label="Интернет банк"
                      name="additionalServices"
                      value="internent_bank"
                      :error-message="$form?.additionalServices?.error?.message"
                  />
                  <i
                      v-tooltip.bottom="'Интернет-банк подключается автоматически'"
                      style="scale: 1"
                      class="pi pi-info-circle app-icon-span"
                  ></i>
                </div>
                <div style="display: flex; align-items: center; gap: .5rem">
                  <AppCheckbox
                      v-model="application.additionalServices"
                      label="Интернет Эквайринг"
                      name="additionalServices"
                      value="internet_acquiring"
                  />
                </div>
              </div>
              <div style="grid-column: span 6 / span 6;" class="flex flex-column gap-2">
                <div style="display: flex; align-items: center; gap: .5rem">
                  <AppCheckbox
                      v-model="application.additionalServices"
                      label="Эквайринг"
                      name="additionalServices"
                      value="acquiring"
                  />
                </div>

              </div>
            </div>

            <Divider class="mb-4"/>

            <div class="flex flex-column gap-2">
              <AppCheckbox
                  v-model="application.oferta"
                  label="Нажимая на кнопку, я подтверждаю оферту на открытие счета и ДКБО"
                  value="additionalServices"
                  name="dkbo"
                  :error-message="$form?.oferta?.error?.message"
              />

              <AppCheckbox
                  v-if="application.additionalServices.includes('acquiring')"
                  v-model="application.oferta"
                  label="Нажимая на кнопку, я подтверждаю оферту на эквайринг"
                  value="ekvaring"
                  name="ekvaring"
                  :error-message="$form?.oferta?.error?.message"
              />
              <AppCheckbox
                  v-if="application.additionalServices.includes('internet_acquiring')"
                  v-model="application.oferta"
                  label="Нажимая на кнопку, я подтверждаю Интернет эквайринг"
                  value="oferta"
                  name="internet_acquiring"
                  :error-message="$form?.oferta?.error?.message"
              />
              <div style="font-weight: 600" v-if="application.additionalServices.includes('internet_acquiring')">
                Сайт куда нужен Интернет эквайринг
              </div>
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
