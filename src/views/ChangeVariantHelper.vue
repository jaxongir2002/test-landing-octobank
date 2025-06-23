<script setup>
import RadioButton from "primevue/radiobutton";
import {useVariantResolver} from "@/stores/useVariantResolver.js";
import AppCard from "@/components/cards/AppCard.vue";

const variantStore = useVariantResolver()
</script>

<template>

  <div class="app-change-variants hidden sm:flex absolute" v-if="variantStore.showIsAccount">
    <AppCard
        v-if="variantStore.showAccount"
        class="mr-2"
    >
      <template #content>
        <div class="app-body-1 mb-2">
          Форма открытия счета
        </div>
        <div class="flex xl:flex-column flex-wrap gap-4 mb-3">

          <div class="flex items-center gap-2">
            <RadioButton
                v-model="variantStore.variant"
                inputId="for-petition"
                value="has-petition"
            />
            <label for="for-petition" class="cursor-pointer">Есть заявка</label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
                v-model="variantStore.variant"
                inputId="for-account"
                value="has-account"
            />
            <label for="for-account" class="cursor-pointer">Есть счет</label>
          </div>

          <div class="flex items-center gap-2">
            <RadioButton
                v-model="variantStore.variant"
                inputId="for-create-account"
                value="create-account"
            />
            <label for="for-create-account" class="cursor-pointer">Создать счет</label>
          </div>
        </div>
      </template>
    </AppCard>

    <AppCard
        v-if="variantStore.showQr"
    >
      <template #content>
        <div class="app-body-1 mb-2">
          Форма QR Code
        </div>

        <div class="flex xl:flex-column flex-wrap gap-4 mb-3">

          <div class="flex items-center gap-2">
            <RadioButton
                v-model="variantStore.variantQr"
                inputId="for-recognized"
                value="recognized"
            />
            <label for="for-recognized" class="cursor-pointer"> Узнали </label>
          </div>

          <div class="flex items-center gap-2">
            <RadioButton
                v-model="variantStore.variantQr"
                inputId="for-unrecognized"
                value="unrecognized"
            />
            <label for="for-unrecognized" class="cursor-pointer">Не узнали</label>
          </div>
        </div>
      </template>
    </AppCard>

    <AppCard
        v-if="variantStore.showAcceptPetition"
        class="mr-2"
    >
      <template #content>
        <div class="app-body-1 mb-2">
          Форма анкеты
        </div>
        <div class="flex xl:flex-column flex-wrap gap-4 mb-3">
          <div class="flex items-center gap-2">
            <RadioButton
                v-model="variantStore.variantAcceptPetition"
                inputId="for-success"
                value="success"
            />
            <label for="for-success" class="cursor-pointer">Принять заявку</label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
                v-model="variantStore.variantAcceptPetition"
                inputId="for-fail"
                value="fail"
            />
            <label for="for-fail" class="cursor-pointer">Отклонить заявку</label>
          </div>
        </div>
      </template>
    </AppCard>
  </div>


  <div
      class="app-change-variants hidden sm:flex absolute"
    v-if="variantStore.showApplicationCheck"
  >
    <AppCard
        class="mr-2"
    >
      <template #content>
        <div class="app-body-1 mb-2">
          Статус заявки
        </div>
        <div class="flex xl:flex-column flex-wrap gap-4 mb-3">

          <div class="flex items-center gap-2">
            <RadioButton
                v-model="variantStore.variantApplicationCheck"
                inputId="for-application-yes"
                value="yes"
            />
            <label for="for-application-yes" class="cursor-pointer">Есть заявка</label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
                v-model="variantStore.variantApplicationCheck"
                inputId="for-application"
                value="no"
            />
            <label for="for-application" class="cursor-pointer">Заявка отсутствует</label>
          </div>
        </div>
      </template>
    </AppCard>
  </div>
</template>