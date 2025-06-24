<script setup>
import RadioButton from "primevue/radiobutton";

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label

  return _elementIdToken ? `app-radio-button-${ _elementIdToken }-${ Math.random().toString(36).slice(2, 7) }` : undefined
})
</script>

<template>
  <div class="flex gap-2" style="align-items: center">
    <RadioButton
        :inputId="elementId"
        v-bind="$attrs"
    />
    <label
        v-if="$attrs.label"
        :for="elementId"
        style="font-size: 17px"
        class="cursor-pointer font-medium"
    >
      {{ $attrs.label }}
    </label>
  </div>
</template>