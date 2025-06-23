<script setup>
import Message from 'primevue/message';
import InputOtp from "primevue/inputotp";

const props = defineProps({
  errorMessage: {
    type: String,
    required: false,
  },
  stepActive: {
    type: Boolean,
    default: false
  }
});
watch(() => props.stepActive, (newVal) => {
  if (newVal) {
    nextTick(() => {
      focusInput();
    });
  }
});

function focusInput() {
  const input = document.querySelector('.app-otp-input input');
  if (input) {
    input.focus();
  }
}
</script>

<template>
  <div>
    <InputOtp
        class="app-otp-input"
        integerOnly
        size="large"
        v-bind="$attrs"
        autofocus
    >

    </InputOtp>
    <Message
        class="app-form-message-error mt-2"
        v-if="errorMessage"
        severity="error"
        size="small"
        variant="simple"
    >
      {{ errorMessage }}
    </Message>
  </div>
</template>

<style></style>