<script setup>
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";
import {useVariantResolver} from "@/stores/useVariantResolver.js";
import axios from "axios";

const emit = defineEmits(['prev', 'recognized', 'unrecognized']);
const props = defineProps({
  stepActive: {
    type: Boolean,
    default: false
  }
});

const sessionId = ref(null);
const iframeVisible = ref(false);

const onClickBack = () => {
  emit('prev')
}

const stopCamera = () => {
  iframeVisible.value = !iframeVisible.value;
};

const onClickEnter = () => {
  if (useVariantResolver().variantQr === 'recognized') {
    emit('recognized');
    stopCamera()
  } else {
    emit('unrecognized');
  }
}
const basicUsername = 'micros24site';
const basicPassword = 'a8lo23d0r3f48';

const credentials = btoa(`${basicUsername}:${basicPassword}`);

async function postSession() {
  try {
    const res = await axios.post('https://api-staging.multibank.uz/api/profiles/public/my_id/web_session/create', null, {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })
    sessionId.value = res.data.data.session_id
  } catch (err) {
    console.log(err)
  }
}

watch(() => props.stepActive, (newVal) => {
  if (newVal) {
    stopCamera();
    postSession();
  }
});
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
          Идентификация
        </div>
      </div>
    </template>

    <template #content>
      <div class="flex justify-content-center" style="height: 80vh">
        <iframe v-if="iframeVisible" width="100%" height="100%"
                :src="`https://web.myid.uz/?pass_data=AS2342342&session_id=${sessionId}&birth_date=2005-06-10&is_resident=true&iframe=true&lang=ru`"
                allow="camera;fullscreen" allowfullscreen=""
                style="border: none; user-select: none; border-radius: 5px !important;"></iframe>
      </div>
    </template>

    <template #footer>
      <div class="flex col-6 mx-auto">
        <AppButton
            class="flex-1"
            label="Дальше"
            @click="onClickEnter"
        />
      </div>
    </template>
  </AccountOpenCard>
</template>