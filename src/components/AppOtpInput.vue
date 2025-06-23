<script setup>
import Message from 'primevue/message';
import InputOtp from "primevue/inputotp";

const props = defineProps({
  errorMessage: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div>
    <InputOtp
        class="app-otp-input"
        integerOnly
        size="large"
        v-bind="$attrs"
    />
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