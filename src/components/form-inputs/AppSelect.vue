<script setup>
import Select from 'primevue/select';
</script>

<template>
  <Select
      v-bind="$attrs"
      emptyMessage="Нет данных"
  />
</template>