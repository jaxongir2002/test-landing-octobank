<script setup>
import {ref} from 'vue';
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";

const emit = defineEmits(['prev', 'next', 'unrecognized']);
const props = defineProps({
  stepActive: {
    type: Boolean,
    default: false
  }
});
const isRecording = ref(false);
const videoElement = ref(null);
const stream = ref(null);

const constraints = {
  audio: false,
  video: {
    width: {min: 1024, ideal: 1280, max: 1920},
    height: {min: 576, ideal: 720, max: 1080},
    facingMode: 'environment',
  },
}

async function startRecording() {
  stream.value = await navigator.mediaDevices.getUserMedia(constraints);
  isRecording.value = true;
}

function stopRecording() {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
    stream.value = null;
  }
  isRecording.value = false;

  // Optional: Video elementni uzish
  if (videoElement.value) {
    videoElement.value.srcObject = null;
  }
}
const onClickBack = () => {
  emit('prev')
}
</script>

<template>
  <AccountOpenCard>
    <template #title>
      <div class="flex">
        <div class="col-2 z-0">
          <AppButton
              severity="secondary"
              icon="pi pi-chevron-left"
              rounded
              @click="onClickBack"
          />
        </div>
        <div class="col-8 text-center app-h4 app-color-1B1B1B">
          Подтвердите свою личность
        </div>
      </div>
    </template>
    <template #content>
      <div class="p-4 bg-[#F9FAFB] rounded-xl shadow-md border border-[#E0E6ED]">
        <p style="color: #33373e;font-size: 20px" class="text-[20px] mb-4 text-[#374867] font-medium leading-[150%]">
          Для подтверждения личности, пожалуйста, запишите короткое видео с помощью вашей веб-камеры.
          На видео должно быть видно ваше лицо и удостоверяющий документ - ID-карта/паспорт (разворот с фотографией).
        </p>

        <ul style="color: #33373e;font-size: 18px" class="list-disc pl-5 space-y-2 text-[18px]">
          <li> ID-карта/паспорт и ваше лицо хорошо видны </li>
          <li> Информация в ID-карте/паспорте читаема </li>
          <li> Освещение достаточно яркое </li>
        </ul>

        <div class="flex gap-3 mt-4 mb-4">
          <button
              v-if="!isRecording"
              @click="startRecording"
              style="border-radius: 12px; background: #374867"
              class="flex-1 py-3 cursor-pointer rounded-xl text-white text-[18px] transition"
          >
            Начать запись
          </button>

          <button
              v-if="isRecording"
              @click="stopRecording"
              style="border-radius: 12px; background: #374867"
              class="flex-1 py-3 rounded-xl text-white text-[18px] transition"
          >
            Приостановить запись
          </button>
        </div>

        <div
            v-if="isRecording"
            ref="videoElement"
            style="justify-content: center"
            class="flex justify-center items-center mt-4"
        >
          <video
              style="border-radius: 12px"
              class="rounded-lg border border-[#374867]"
              :srcObject="stream"
              width="500"
              height="300"
              autoplay
          ></video>
        </div>
      </div>
    </template>


    <template #footer>
      <div class="flex gap-4">
        <AppButton
            @click="onClickBack"
            class="flex-1"
            severity="secondary"
            label="Отменить"
        />

        <AppButton
            class="flex-1"
            label="Продолжить"
            @click="emit('next')"
        />
      </div>
    </template>
  </AccountOpenCard>
</template>
