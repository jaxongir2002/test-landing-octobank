<script setup>
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import FloatLabel from "primevue/floatlabel"

const props = defineProps({
  errorMessage: {
    type: String,
    required: false,
  },
  defaultValue: String,
  activeFloat: {
    type: Boolean,
    default: false,
  },
})

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label

  return _elementIdToken ? `app-text-field-${ _elementIdToken }-${ Math.random().toString(36).slice(2, 7) }` : undefined
})
</script>

<template>
  <div class="custom-datepicker">
    <FloatLabel
        :class="props.activeFloat? 'float-label-always-active':''"
        class="flex flex-col flex-column gap-1"
        id="in_label"
        variant="in"
    >
      <InputText
          v-bind="$attrs"
          :id="elementId"
          :placeholder="$attrs.placeholder || ''"
          :default-value="props.defaultValue"
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