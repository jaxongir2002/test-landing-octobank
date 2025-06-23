<script setup>
import servicesInHandImg from "@/assets/img/bannerImg.png";
import Image from "primevue/image";
</script>

<template>
  <div
      style="height: 70vh;  padding: 5px 14px;"
      class="flex-column card-banner flex-column-reverse align-items-center sm:align-items-center md:flex-row  flex gap-2">
    <div class=" sm:col-9 md:col-6 ">
      <Image
          :src="servicesInHandImg"
          width="100%"
          heigth="100%"
      />
    </div>
    <div class="flex flex-column align-items-center">
      <div style="width: 100%" class="text-banner text-left app-h2 line-height-2 mb-4">
        Расчетный счет для бизнеса — откройте за несколько шагов, не выходя из офиса
      </div>
        <ul class="text-banner">
          <li class="app-body-1 font-medium mb-3 list-none">
            — Комплексное банковское обслуживание
          </li>
          <li class="app-body-1 font-medium mb-3 list-none">
            — Удобное открытие уставного фонда
          </li>
          <li class="app-body-1 font-medium mb-3 list-none">
            — Полный контроль и управление счетом онлайн
          </li>
          <li class="app-body-1 font-medium mb-3 list-none">
            — Быстрые и надежные расчеты
          </li>
          <li class="app-body-1 font-medium mb-3 list-none">
            — Документы и справки — без лишней бюрократии
          </li>
          <li class="app-body-1 font-medium mb-3 list-none">
            — Консультации и поддержка
          </li>
        </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-banner {
  background: #f5f6f7;
  border-radius: 12px;

  .text-banner {
    color: #33373e;
  }
}
@media (max-width: 768px) {
  .app-h2 {
    font-size: 18px;
    text-align: left;
    width: 100%;
  }
  .app-body-1{
    font-size: 14px;
  }
}
</style>