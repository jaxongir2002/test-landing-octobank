<script setup>
import {redirectTo} from "@/utils/index.js";
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";
import {useQrCode} from "@/composables/useQr.js";
import AccountOpenAppBannerImg from "@/assets/img/account-open-app-banner.png"
import Image from "primevue/image"
import {useVariantResolver} from "@/stores/useVariantResolver.js";

const emit = defineEmits(['prev', 'next'])

const qrCode = useQrCode('asdasdasdkajdhkashdkasdkasdh', {
  width: 290,
  height: 290,
  backgroundOptions: {
    color: "transparent",
  },
})


onBeforeMount(() => {
  // Todo: Потом убрать
  useVariantResolver().step = null
})
</script>


<template>
  <div class="app-container">

    <div class="flex py-5">
      <div class="col-2 z-0 pb-0">
        <AppButton
            severity="secondary"
            icon="pi pi-chevron-left"
            rounded
            @click="emit('prev')"
        />
      </div>
    </div>

    <div class="account-open-app-banner relative p-6 w-full">
      <div class="app-h3 text-white mb-4">
        Перед тем как начать необходимо установить приложение
      </div>

      <div class="text-white mb-4">
        Отсканируйте QR-код
      </div>

      <div class="flex justify-content-start" :style="{ 'max-width': qrCode.width, 'max-height': qrCode.height }">
        <Image
            class="account-open-app-banner-qr p-3 bg-white"
            :src="qrCode.getImg()"
            width="100%"
            height="100%"
        />
      </div>
    </div>
    <div class="flex justify-content-end pt-6">
      <AppButton
          class="px-92"
          @click="emit('next')"
          label="Продолжить"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.px-92{
  padding-left: 92px;
  padding-right: 92px;
}

.account-open-app-banner {
  //max-height: 548px;
  border-radius: 24px;

  &-qr {
    border-radius: 24px;
  }

  &:before {
    content: '';
    position: absolute;
    border-radius: 24px;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: url('@/assets/img/account-open-app-banner.png') no-repeat;
    z-index: -1;
  }
}
</style>