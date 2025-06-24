<script setup>
import {ref} from 'vue';
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";

const emit = defineEmits(['prev', 'recognized', 'unrecognized']);
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
      <p style="font-size: 16px; margin-bottom: 10px; color: #374867; font-weight: 500; line-height: 150%">
        Для подтверждения личности, пожалуйста, запишите короткое видео с помощью вашей веб-камеры.
        На видео должно быть видно ваше лицо и удостоверяющий документ - ID-карта/паспорт (разворот с фотографией).
      </p>
      <ul class="list-none pl-3">
        <li class="mb-1">ID-карта/паспорт и ваше лицо хорошо видны</li>
        <li class="mb-1 text-[#374867]">Информация в ID-карте/паспорте читаема</li>
        <li class="mb-1">Освещение достаточно яркое.</li>
      </ul>
      <div class="flex gap-2 mt-3 mb-2">
        <button
            v-if="!isRecording"
            @click="startRecording"
            style="border-radius: 12px"
            class="px-4 py-2 bg-blue-600 text-white "
        >
          Начать запись
        </button>

        <button
            v-if="isRecording"
            @click="stopRecording"
            style="border-radius: 12px"
            class="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Приостановить запись
        </button>
      </div>
      <div v-if="isRecording" ref="videoElement" style="display: flex; justify-content: center;align-items: center; margin-top: 10px">
        <video style="border-radius: 10px;" :srcObject="stream" width="500" height="300" autoplay></video>
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
