<script setup>
import InputNumber from 'primevue/inputnumber';
import Message from 'primevue/message';
import FloatLabel from "primevue/floatlabel"

const props = defineProps({
  errorMessage: {
    type: String,
    required: false,
  },
})


const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label

  return _elementIdToken ? `app-number-field-${ _elementIdToken }-${ Math.random().toString(36).slice(2, 7) }` : undefined
})
</script>

<template>
  <div>
    <FloatLabel
        class="flex flex-col flex-column gap-1"
        id="in_label"
        variant="in"
    >
      <InputNumber
          v-bind="$attrs"
          :id="elementId"
      />
      <label :for="elementId">{{ $attrs?.label }}</label>
    </FloatLabel>
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