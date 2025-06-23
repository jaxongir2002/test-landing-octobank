<script setup>
import Button from "primevue/button";

const slots = useSlots();
</script>

<template>
  <Button
      v-bind="$attrs">

    <template
      v-for="(key, index) in slots"
      :key="index"
      #[index]="slotProps"
    >
      <slot :name="index" :props="slotProps"/>
    </template>
  </Button>
</template>