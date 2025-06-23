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
  pinfl: [requiredValidator],
  phone: [requiredValidator],
  seria: [requiredValidator],
  numberDoc: [requiredValidator],
  dateBirth: [requiredValidator],
  oferta: [(val) => requiredValidator.call(null, val, 'Оферта обязательна к прочтению')],
});

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

const onUpdateRadioButton = () => {
  organization.value.tin = null
}
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
        <div class="col-8 text-center">
          <span class="app-h3" style="color:#33373e">
            Открыть счёт
          </span>
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
          <div class="flex items-center gap-2">
            <RadioButton
                v-model="organization.clientType"
                inputId="for-company"
                name="clientType"
                value="company"
            />
            <label for="for-company" style="font-size: 18px" class="cursor-pointer">Для организации</label>
          </div>
          <div class="flex items-center gap-2">
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
          <div class="col-12">
            <AppTextField
                v-model="organization.tin"
                class="flex-1"
                name="tin"
                :disabled="selectIsPerson()"
                v-mask="'#########'"
                :error-message="$form?.tin?.error?.message"
                label="ИНН"
            />
          </div>
          <div class="col-12">
            <AppTextField
                v-model="organization.pinfl"
                class="flex-1"
                name="pinfl"
                v-mask="'##############'"
                :error-message="$form?.pinfl?.error?.message"
                label="ПИНФЛ"
            />
          </div>
          <div class="col-12">
            <AppTextField
                v-model="organization.seria"
                class="flex-1"
                name="seria"
                :disabled="selectIsPerson()"
                :error-message="$form?.seria?.error?.message"
                label="Серия документа, удостоверяющего личность"
            />
          </div>
          <div class="col-12">
            <AppTextField
                v-model="organization.numberDoc"
                class="flex-1"
                name="numberDoc"
                :disabled="selectIsPerson()"
                :error-message="$form?.numberDoc?.error?.message"
                label="Номер документа, удостоверяющего личность"
            />
          </div>
          <div class="col-12">
            <AppDatePicker v-model="organization.dateBirth"
                           class="flex-1"
                           name="dateBirth"
                           :disabled="selectIsPerson()"
                           :error-message="$form?.dateBirth?.error?.message"
                           label="Дата рождения"/>

          </div>
          <div class="col-12 mb-2">
            <AppTextField
                v-model="organization.phone"
                class="flex-1"
                name="phone"
                label="Номер телефона"
                v-mask="phoneMask"
                :error-message="$form?.phone?.error?.message"
            />
          </div>

          <div class="col-12 pl-4 mb-3 sm:mb-5">
            <div class="flex items-center gap-2">
              <Checkbox v-model="organization.oferta" inputId="oferta" name="oferta" value="oferta"/>
              <label for="oferta" class="cursor-pointer text-checkbox select-auto font-medium"
                     style="width: 90%; font-size: 17px">Нажимая
                на кнопку, я даю согласие на обработку <a target="_blank"
                                                          href="https://octobank.uz/usloviya-ispolzovaniya"><strong>персональных
                  данных</strong></a>в соответствии с<a target="_blank"
                                                        href="https://octobank.uz/politika-konfidentsialnosti"><strong>политикой
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
            :disabled="!organization.oferta.length"
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