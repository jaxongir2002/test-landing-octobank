<script setup>
import {AppResolver} from "@/utils/form/resolver.js";
import {Form} from "@primevue/forms";
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";
import {requiredValidator} from "@/utils/form/validators.js";
import AppOtpInput from "@/components/AppOtpInput.vue";
import {OtpCreator} from "@/modules/otp/index.js";
import {useTimer} from "@/composables/useTimer.js";

const props = defineProps({
  phone: {
    type: String,
    required: false,
  },
  clientType: String,
  stepActive: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['prev', 'next']);

const timer = useTimer();

const otpInput = ref();
const formValidRules = ref({otp: [requiredValidator]});
const otpMessageError = ref('');

const {
  otpCode,
  loading,
  confirm,
} = OtpCreator(props.phone);

const onUpdateModelValue = async value => {
  if (value.length === 6) {
    otpMessageError.value = null

    const result = await confirm()

    if (!result) {
      otpMessageError.value = 'Неверный SMS-код'

      return
    }

    if (result) {
      timer.end()
      otpCode.value = null
      otpMessageError.value = null
      emit("next", 'success')
    }
  }
}

const onClickBack = () => {
  timer.end()

  emit('prev')
}

const onClickSendRetry = () => {
  if (!timer.isRunning()) {
    timer.reset()
  }
}

defineExpose({
  startTimer: timer.start,
});
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
              @click="onClickBack"
          />
        </div>
        <div class="col-8 text-center">
          <div class="app-color-1B1B1B">
            Введите SMS-код
          </div>
          <div class="text-center app-body-2 app-color-1B1B1F font-medium">
            SMS-код отправлен на номер +998 (XX) XXX-XX-{{ props.phone?.slice(-2) }}
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <Form
          class="mb-4"
          ref="form"
          v-slot="$form"
          :resolver="(validation) => AppResolver(formValidRules, validation)"
          :validateOnBlur="true"
          :validateOnValueUpdate="false"
      >
        <div class="flex justify-content-center">

          <AppOtpInput
              autofocus
              v-model="otpCode"
              ref="otpInput"
              name="otp"
              :length="6"
              :step-active="props.stepActive"
              :disabled="loading"
              :error-message="otpMessageError || $form?.otp?.error?.message"
              @update:model-value="onUpdateModelValue"
          />
        </div>
      </Form>
    </template>

    <template #footer>
      <div class="text-center mb-4">
        <span
            class="app-otp-send-retry-text app-color-1B1B1C font-medium cursor-pointer"
            :class="{ 'opacity-38': timer.isRunning() }"
            @click="onClickSendRetry"
        >
          <span>
            Отправить код снова
          </span>

          <span v-if="timer.isRunning()">
            {{ timer.formatTimer }}
          </span>
        </span>
      </div>
    </template>
  </AccountOpenCard>
</template>