<script setup>
import InputNumber from 'primevue/inputnumber';
import Message from 'primevue/message';

const props = defineProps({
  errorMessage: {
    type: String,
    required: false,
  },
})

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label

  return _elementIdToken ? `app-text-field-${ _elementIdToken }-${ Math.random().toString(36).slice(2, 7) }` : undefined
})
</script>

<template>
  <div class="flex flex-column">
    <InputNumber
        v-bind="$attrs"
        :id="elementId"
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