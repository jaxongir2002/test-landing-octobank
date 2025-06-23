<script setup>
import InputMask from 'primevue/inputmask';
import Message from 'primevue/message';

const props = defineProps({
  errorMessage: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <InputMask
        v-bind="$attrs"
    />
    <Message
        v-if="errorMessage"
        class="app-form-message-error mt-2"
        severity="error"
        size="small"
        variant="simple"
    >
      {{ errorMessage }}
    </Message>
  </div>
</template>