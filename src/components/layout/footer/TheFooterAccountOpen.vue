<script setup>
import AppButton from "@/components/AppButton.vue";

import callFilledIcon from "@/assets/img/icons/call-filled-icon.svg"
import telegramFilledIcon from "@/assets/img/icons/telegram-filled-icon.svg"
import mapFilledIcon from "@/assets/img/icons/map-filled-icon.svg"
import AppIcon from "@/components/AppIcon.vue";
</script>

<template>
  <div class="app-footer-account-open">
    <div class="app-container flex justify-content-center">
      <div class="col-12 flex flex-row flex-wrap gap-3 lg:col-9 xl:col-7  justify-content-between">

        <div class="flex align-items-center">
          <AppIcon
              :icon="callFilledIcon"
              class="mr-2"
          />

          <div class="font-medium">
            +998 (71) 202-50-80
          </div>
        </div>


        <div class="flex align-items-center">
          <AppIcon
              :icon="telegramFilledIcon"
              class="mr-2"
          />

          <div class="font-medium">
            Написать в телеграм
          </div>
        </div>

        <div class="flex align-items-center">
          <AppIcon
              :icon="mapFilledIcon"
              class="mr-2"
          />

          <div class="font-medium">
            Отделения на карте
          </div>
        </div>

      </div>
    </div>
  </div>
</template>