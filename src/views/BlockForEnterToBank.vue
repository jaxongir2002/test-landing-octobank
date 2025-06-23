<script setup>
import AppButton from "@/components/AppButton.vue";
import {redirectTo} from "@/utils/index.js";
</script>

<template>
  <div class="text-center mt-4">

    <div class="flex flex-column sm:flex-row md:flex-row">
      <div class="col-1 md:col-1 sm:col-1 lg:col-2"/>
      <AppButton
          class="flex-1 mb-4 sm:hidden md:hidden"
          label="Скачать приложение"
      />

      <AppButton
          class="flex-1 mb-4 sm:mb-0 md:mb-0 sm:mr-4 md:mr-4"
          label="Открыть счет"
          @click="redirectTo({ name: 'account' })"
      />

      <AppButton
          class="flex-1"
          severity="secondary"
          label="Узнать статус заявки"
          @click="redirectTo({ name: 'application-check' })"
      />
      <div class="col-1 md:col-1 sm:col-1 lg:col-2"/>
    </div>
  </div>
</template>