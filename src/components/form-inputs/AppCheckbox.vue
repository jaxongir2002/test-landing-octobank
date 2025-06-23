<script setup>
import Checkbox from "primevue/checkbox";
import Message from "primevue/message";

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label

  return _elementIdToken ? `app-checkbox-${ _elementIdToken }-${ Math.random().toString(36).slice(2, 7) }` : undefined
})

const props = defineProps({
  errorMessage: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <Checkbox
          :inputId="elementId"
          v-bind="$attrs"
      />

      <label
          v-if="$attrs.label"
          :for="elementId"
          class="app-form-message-error cursor-pointer select-auto font-medium"
      >
        {{ $attrs.label }}
      </label>
    </div>
    <div>
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
  </div>

</template>