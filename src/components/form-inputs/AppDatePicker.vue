<script setup>
import DatePicker from 'primevue/datepicker';
import Message from 'primevue/message';
import FloatLabel from "primevue/floatlabel"
import { ref, computed, useAttrs } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  errorMessage: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const attrs = useAttrs();
const dateValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  dateValue.value = newVal;
});

const elementId = computed(() => {
  const _elementIdToken = attrs.id || attrs.label;
  return _elementIdToken ? `app-text-field-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}` : undefined;
});

function getValue(value) {
  dateValue.value = value.target.value;
  emit('update:modelValue', value.target.value);
}
</script>

<template>
  <div>
    <FloatLabel variant="in" class="flex flex-col flex-column gap-1 float-label-always-active">
      <DatePicker
          class="custom-datepicker"
          v-bind="$attrs"
          :showOnFocus="false"
          fluid
          v-model="dateValue"
          v-mask="'##.##.####'"
          :placeholder="$attrs.placeholder || ''"
          :id="elementId"
          @input="getValue"
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

<style>
.float-label-always-active label {
  transform: translateY(0rem) !important;
  pointer-events: none;
  top: 0.5rem !important;
  font-size: 0.75rem !important;
}
</style>
