<script setup>
import Card from 'primevue/card';

const slots = useSlots()
</script>

<template>
  <Card class="app-account-card">
    <template
        v-if="slots.title"
        #title
    >
      <slot name="title"/>
    </template>

    <template
        v-if="slots.subtitle"
        #subtitle
    >
      <slot name="subtitle"/>
    </template>

    <template
        v-if="slots.content"
        #content
    >
      <slot name="content"/>
    </template>

    <template
        v-if="slots.footer"
        #footer
    >
      <slot name="footer"/>
    </template>
  </Card>
</template>