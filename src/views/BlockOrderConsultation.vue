<script setup>
import { useToast } from "primevue/usetoast";
import AppTextField from "@/components/form-inputs/AppTextField.vue";
import AppButton from "@/components/AppButton.vue";
import { Form } from '@primevue/forms';
import {requiredValidator} from "@/utils/form/validators.js";
import {AppResolver} from "@/utils/form/resolver.js";
import {phoneMask} from "@/utils/index.js";
import {toastSuccess} from "@/utils/toast/index.js";

const toast  = useToast();

const initialValue = ref({
  contactNumber: null
});
const form = ref();
const formValidRules = ref({
  contactNumber: [requiredValidator]
});

const onClickButton = async () => {
  const { valid } = await form.value.validate()

  if(valid){
    initialValue.value.contactNumber = null

    toastSuccess(toast, 'Вы оставили заявку. Мы свяжемся с вами в ближайшее время')
    form.value.reset()
  }
}
</script>

<template>
  <div class="text-center">
    <div class="app-h3 font-medium md:font-semibold mb-2 md:mb-4">
      Заказать консультацию
    </div>
    <div class="app-body-1 font-normal mb-4">
      Оставьте свой телефон<br class="block md:hidden"> и мы перезвоним
    </div>

    <div class="flex justify-content-center mb-3 md:mb-4">
      <div class="col-12 sm:col-6 md:col-6 px-0">
        <Form
            ref="form"
            v-slot="$form"
            v-model:initial-values="initialValue"
            :resolver="(validation) => AppResolver(formValidRules, validation)"
        >
          <AppTextField
              class="flex-1"
              name="contactNumber"
              v-mask="phoneMask"
              :error-message="$form?.contactNumber?.error?.message"
              label="Контактный телефон"
          />
        </Form>

      </div>
    </div>

    <div class="mb-4 text-left sm:text-center md:text-center">
      <span class="app-body-2 font-medium">
        Ввод номера подтверждает ваше согласие <br class="block md:hidden"> <a href="#" class="app-color-bank no-underline"> с условиями передачи информации </a>
      </span>
    </div>

    <div class="flex justify-content-center mb-6">
      <div class="col-12 sm:col-6 md:col-6 flex px-0">
        <AppButton
            class="flex-1"
            label="Отправить"
            @click="onClickButton"
        />
      </div>
    </div>

  </div>
</template>