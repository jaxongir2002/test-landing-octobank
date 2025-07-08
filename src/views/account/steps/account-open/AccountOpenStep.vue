<script setup>
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";
import RadioButton from 'primevue/radiobutton';
import AppTextField from "@/components/form-inputs/AppTextField.vue";
import {Form} from "@primevue/forms";
import Checkbox from 'primevue/checkbox';
import {AppResolver} from "@/utils/form/resolver.js";
import {requiredValidator} from "@/utils/form/validators.js";
import {phoneMask} from "@/utils/index.js";
import {openAccountCreator} from "@/modules/open-account/index.js";
import Message from "primevue/message";
import AppDatePicker from "@/components/form-inputs/AppDatePicker.vue";

const {organization, checkOrganization} = openAccountCreator();

const emit = defineEmits(['has-petition', 'create-account', 'hasAccount', 'prev']);

const form = ref();
const formValidRules = ref({
  tin: [requiredValidator],
  phone: [requiredValidator],
  seria: [requiredValidator],
  dateBirth: [requiredValidator],
  pnfl: [requiredValidator],
  nameOfOrganization: [requiredValidator],
  typeOfactivity: [requiredValidator],
  oferta: [(val) => requiredValidator.call(null, val, 'Это поле обязательно для заполнения')],
  thirdParties: [(val) => requiredValidator.call(null, val, 'Это поле обязательно для заполнения')],
  advertising: [(val) => requiredValidator.call(null, val, 'Это поле обязательно для заполнения')],
});
const requiredFields = ['clientType', 'nameOfOrganization', 'typeOfactivity', 'pnfl', 'oferta', 'thirdParties', 'advertising', 'tin', 'seria', 'dateBirth', 'phone'];

const selectIsPerson = () => {
  return organization.value.clientType === 'person'
}

const onClickNext = async () => {
  const {valid} = await form.value.validate()

  if (valid) {
    const result = checkOrganization()

    if (result === 'petition') {
      emit('has-petition', {
        number: '65434643456',
        status: 'На рассмотрении',
      })
    } else if (result === 'account') {
      emit('hasAccount')
    } else {
      emit('create-account', organization.value)
    }
  }
}
const isOrganizationValid = computed(() => {
  return requiredFields.every(field => {
    const value = organization.value[field];

    if (field === 'pnfl') {
      if (organization.value.clientType === 'person') {
        return !!value;
      }
      return true;
    }

    if (field === 'tin') {
      if (organization.value.clientType === 'company') {
        return !!value;
      }
      return true;
    }
    if (['oferta', 'advertising', 'thirdParties'].includes(field)) {
      return Array.isArray(value) ? value.length > 0 : !!value;
    }

    return !!value;
  });
});


const onUpdateRadioButton = () => {
  organization.value.tin = null;
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <AccountOpenCard>
    <template #title>
      <div class="flex">
        <div class="col-2 z-0">
          <AppButton
              severity="secondary"
              icon="pi pi-chevron-left"
              rounded
              @click="emit('prev')"
          />
        </div>
        <div style="color:#33373e" class="col-8 app-header-font-size text-center">
          Открыть счёт
        </div>
      </div>
    </template>

    <template #content>
      <Form
          ref="form"
          v-slot="$form"
          v-model:initial-values="organization"
          :resolver="(validation) => AppResolver(formValidRules, validation)"
          :validateOnBlur="true"
      >
        <div class="flex flex-wrap gap-4 pl-4 mb-3">
          <div style="display: flex; gap:0.5rem;align-items: center">
            <RadioButton
                v-model="organization.clientType"
                inputId="for-company"
                name="clientType"
                value="company"
            />
            <label for="for-company" style="font-size: 18px" class="cursor-pointer">Для организации</label>
          </div>
          <div style="display: flex; gap:0.5rem;align-items: center">
            <RadioButton
                v-model="organization.clientType"
                inputId="for-person"
                name="clientType"
                value="person"
                @update:model-value="onUpdateRadioButton"
            />
            <label for="for-person" style="font-size: 18px" class="cursor-pointer">Для ИП</label>
          </div>
        </div>

        <div class="flex flex-column">
          <div v-show="!selectIsPerson()" class="col-12">
            <AppTextField
                v-model="organization.tin"
                class="flex-1"
                active-float
                :placeholder="'_________'"
                name="tin"
                v-mask="'#########'"
                :error-message="$form?.tin?.error?.message"
                label="ИНН"
            />
          </div>
          <div v-show="organization.clientType==='person'" class="col-12">
            <AppTextField
                v-model="organization.pnfl"
                class="flex-1"
                active-float
                :placeholder="'_________'"
                name="pnfl"
                v-mask="'#########'"
                :error-message="$form?.pnfl?.error?.message"
                label="ПИНФЛ"
            />
          </div>

          <div class="col-12">
            <AppTextField
                v-model="organization.seria"
                class="flex-1"
                name="seria"
                active-float
                :placeholder="'__._______'"
                v-mask="'AA#######'"
                :error-message="$form?.seria?.error?.message"
                :label="selectIsPerson()?'Серия и номер удостоверяющего документа': ' Серия и номер удостоверяющего документа руководителя'"
            />
          </div>
          <div class="col-12">
            <AppDatePicker v-model="organization.dateBirth"
                           class="flex-1"
                           name="dateBirth"
                           :placeholder="'__.__.____'"
                           :error-message="$form?.dateBirth?.error?.message"
                           :label="selectIsPerson()?'Дата рождения ':'Дата рождения руководителя'"/>

          </div>
          <div class="col-12 mb-2">
            <AppTextField
                v-model="organization.phone"
                class="flex-1"
                name="phone"
                default-value="+998"
                :label="selectIsPerson()?'Номер телефона ':'Номер телефона руководителя'"
                v-mask="phoneMask"
                :error-message="$form?.phone?.error?.message"
            />
          </div>

          <div class="col-12 pl-4">
            <div class="flex items-center gap-2">
              <Checkbox v-model="organization.oferta" inputId="oferta" name="oferta" value="oferta"/>
              <label for="oferta" class="cursor-pointer text-checkbox select-auto font-medium"
                     style="width: 90%; font-size: 17px">Нажимая
                на кнопку, я даю согласие на обработку <a target="_blank"
                                                          href="https://octobank.uz/usloviya-ispolzovaniya"><strong
                    style="border-bottom:1px solid #374867">персональных
                  данных</strong></a> в соответствии с <a target="_blank"
                                                          href="https://octobank.uz/politika-konfidentsialnosti"><strong
                    style="border-bottom:1px solid #374867">политикой
                  обработки персональных данных</strong></a>
              </label>
            </div>
            <Message
                v-if="$form?.oferta?.error?.message"
                class="app-form-message-error mt-2"
                severity="error"
                size="small"
                variant="simple"
            >
              {{ $form?.oferta?.error?.message }}
            </Message>
          </div>
          <div class="col-12 pl-4 ">
            <div class="flex items-center gap-2">
              <Checkbox v-model="organization.advertising" inputId="advertising" name="advertising"
                        value="advertising"/>
              <label for="advertising" class="cursor-pointer text-checkbox select-auto font-medium"
                     style="width: 90%; font-size: 17px">Нажимая на кнопку, я даю свое согласие на рекламное
                информирование.
              </label>
            </div>
            <Message
                v-if="$form?.advertising?.error?.message"
                class="app-form-message-error mt-2"
                severity="error"
                size="small"
                variant="simple"
            >
              {{ $form?.advertising?.error?.message }}
            </Message>
          </div>
          <div class="col-12 pl-4 ">
            <div class="flex items-center gap-2">
              <Checkbox v-model="organization.thirdParties" inputId="thirdParties" name="thirdParties"
                        value="thirdParties"/>
              <label for="thirdParties" class="cursor-pointer text-checkbox select-auto font-medium"
                     style="width: 90%; font-size: 17px">
                Нажимая на кнопку, я даю свое согласие на передачу персональных данных третьим лицам (партнерам)
              </label>
            </div>
            <Message
                v-if="$form?.thirdParties?.error?.message"
                class="app-form-message-error mt-2"
                severity="error"
                size="small"
                variant="simple"
            >
              {{ $form?.thirdParties?.error?.message }}
            </Message>
          </div>
        </div>
      </Form>
    </template>

    <template #footer>
      <div class="flex flex-column-reverse sm:flex-row gap-2 sm:gap-4">
        <AppButton
            class="flex-1"
            severity="secondary"
            label="Отменить"
            @click="emit('prev')"
        />
        <AppButton
            class="flex-1"
            :disabled="!isOrganizationValid"
            @click="onClickNext"
            label="Продолжить"
        />
      </div>
    </template>
  </AccountOpenCard>
</template>

<style scoped lang="scss">
.text-checkbox {
  color: #33373e;
  font-size: 14px;

  strong {
    color: #33373e;
  }
}
</style>