<script setup>
import Stepper from 'primevue/stepper';
import StepPanels from 'primevue/steppanels';
import StepPanel from "primevue/steppanel";
import AccountOpenStep from "@/views/account/steps/account-open/AccountOpenStep.vue";
import {redirectTo} from "@/utils/index.js";
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";
import AccountOpenOtpStep from "@/views/account/steps/account-otp/AccountOpenOtpStep.vue";
import AccountOpenIdentifyQr from "@/views/account/steps/identify-qr/AccountOpentIdentifyQr.vue";
import {useVariantResolver} from "@/stores/useVariantResolver.js";
import Image from "primevue/image";
import qrIdentificationUnRecognized from "@/assets/img/qr-identification-unrecognized.svg";
import AccountOpenApplicationFirst from "@/views/account/steps/applications/AccountOpenApplicationFirst.vue";
import AccountOpenApplicationTariff from "@/views/account/steps/applications/AccountOpenApplicationTariff.vue";
import AccountOpenApplicationOrg from "@/views/account/steps/applications/AccountOpenApplicationOrg.vue";
import AccountOpenCheckVideo from "@/views/account/steps/identify-qr/AccountOpenCheckVideo.vue";

const variantStore = useVariantResolver();

const step = ref("account-form");
const accountOpenOtp = ref();
const petition = ref({
  number: null,
  status: null,
  phone: null,
});

const onSuccessStep = ({number, status}, next) => {
  petition.value = {
    number,
    status,
  }

  next('has-petition')
}

const onCreateAccount = (organization, next) => {
  petition.value = organization
  next('create-account')
}

const onUpdateStepper = value => {
  if (value === 'create-account') {
    accountOpenOtp.value.startTimer()
  }

  variantStore.step = value
}

const onSendPetition = (status, next) => {
  if (status === 'success') {
    next('application-tariff-success')
  } else if (status === 'fail') {
    next('application-tariff-fail')
  }
}

onMounted(() => {
  variantStore.step = step.value
});
</script>

<template>
  <div class="pt-4 flex-1">
    <Stepper
        class="app-account-stepper flex-1"
        v-model:value="step"
        @update:value="onUpdateStepper"
    >

      <StepPanels class="px-0 py-0">
        <StepPanel v-slot="{ activateCallback }" :value="'account-form'">
          <AccountOpenStep
              @prev="redirectTo({ name: 'index' })"
              @has-petition="({ number, status }) => onSuccessStep({number, status}, activateCallback) "
              @has-account="activateCallback('has-account')"
              @create-account="(organization) => onCreateAccount(organization, activateCallback)"
          />
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" :value="'has-petition'">
          <AccountOpenCard>
            <template #title>
              <div class="flex">
                <div class="col-2 z-0">
                  <AppButton
                      severity="secondary"
                      icon="pi pi-chevron-left"
                      rounded
                      @click="activateCallback('account-form')"
                  />
                </div>
                <div class="col-9 text-center mb-3">
                   <span class="app-h4 app-color-1B1B1B">
                    Заявка уже существует
                  </span>
                </div>
              </div>
            </template>

            <template #footer>
              <div class="flex justify-content-center">
                <div class="col-6 flex">
                  <AppButton
                      class="flex-1"
                      label="Понятно"
                      @click="redirectTo({ name: 'index' })"
                  />
                </div>
              </div>
            </template>

          </AccountOpenCard>
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" :value="'has-account'">
          <AccountOpenCard>
            <template #title>
              <div class="flex">
                <div class="col-2 z-0">
                  <AppButton
                      severity="secondary"
                      icon="pi pi-chevron-left"
                      rounded
                      @click="activateCallback('account-form')"
                  />
                </div>
                <div class="col-9 text-center mb-3">
                   <span class="app-h4 app-color-1B1B1B">
                    У вас уже открыт счёт
                  </span>
                </div>
              </div>
            </template>

            <template #footer>
              <div class="flex justify-content-center">
                <div class="col-6 flex">
                  <AppButton
                      class="flex-1"
                      label="Понятно"
                      @click="redirectTo({ name: 'index' })"
                  />
                </div>
              </div>
            </template>
          </AccountOpenCard>
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" :value="'create-account'">
          <AccountOpenOtpStep
              ref="accountOpenOtp"
              :phone="petition.phone"
              :step-active="step === 'create-account'"
              :client-type="petition.clientType"
              @prev="activateCallback('account-form')"
              @next="activateCallback('identify-qr')"
          />
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" :value="'identify-qr'">
          <AccountOpenIdentifyQr
              @prev="activateCallback('create-account')"
              :step-active="step === 'identify-qr'"
              @recognized="activateCallback('check-video')"
              @unrecognized="activateCallback('identify-qr-unrecognized')"
          />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" :value="'check-video'">
          <AccountOpenCheckVideo
              @prev="activateCallback('identify-qr')"
              :step-active="step === 'check-video'"
              @recognized="activateCallback(petition.clientType === 'company' ? 'application-org' : 'application-first')"
          />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" :value="'identify-qr-unrecognized'">
          <AccountOpenCard>
            <template #title>
              <div class="flex">
                <div class="col-2 z-0">
                  <AppButton
                      severity="secondary"
                      icon="pi pi-chevron-left"
                      rounded
                      @click="activateCallback('identify-qr')"
                  />
                </div>
                <div class="col-8 text-center flex justify-content-center mb-5">
                  <Image
                      :src="qrIdentificationUnRecognized"
                      width="154"
                      height="154"
                  />
                </div>
              </div>
            </template>

            <template #content>
              <div class="text-center mb-5">
                <div class="app-body-1 font-medium mb-1">
                  К сожалению, мы вас не узнали
                </div>
                <div class="app-body-2 font-medium">
                  Попробуйте пройти идентификацию ещё раз
                </div>
              </div>
            </template>

            <template #footer>
              <div class="flex gap-4">
                <AppButton
                    class="flex-1"
                    severity="secondary"
                    label="Отменить"
                    @click="redirectTo({ name: 'index' })"
                />

                <AppButton
                    class="flex-1"
                    label="Попробовать еще раз"
                    @click="activateCallback('identify-qr')"
                />
              </div>
            </template>
          </AccountOpenCard>
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" :value="'application-first'">
          <AccountOpenApplicationFirst
              @prev="activateCallback('account-form')"
              @next="activateCallback('application-tariff')"
          />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" :value="'application-org'">
          <AccountOpenApplicationOrg
              @prev="activateCallback('account-form')"
              @next="activateCallback('application-tariff')"
          />
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" :value="'application-tariff'">
          <AccountOpenApplicationTariff
              @prev="activateCallback('account-form')"
              @next=" activateCallback('application-accept-by-phone')"
          />
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" :value="'application-accept-by-phone'">
          <AccountOpenOtpStep
              ref="accountOpenOtp"
              :phone="petition.phone"
              @prev="activateCallback('application-tariff')"
              @next="value => onSendPetition(value, activateCallback) "
          />
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" :value="'application-tariff-success'">
          <AccountOpenCard>

            <template #title>
              <div class="text-center mb-3">
                <div class="app-h4 app-color-1B1B1B mb-1">
                  Заявка № 545663 принята
                </div>
                <div class="fz-16">
                  Вы можете отслеживать статус заявки по её номеру<br>
                  в приложении или на сайте
                </div>
              </div>
            </template>

            <template #footer>
              <div class="flex justify-content-center">
                <div class="col-6 flex">
                  <AppButton
                      class="flex-1"
                      label="Понятно"
                      @click="redirectTo({ name: 'index' })"
                  />
                </div>
              </div>
            </template>
          </AccountOpenCard>
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" :value="'application-tariff-fail'">
          <AccountOpenCard>
            <template #title>
              <div class="text-center mb-3">
                <div class="app-h4 app-color-1B1B1B mb-1">
                  Не удалось принять заявку
                </div>
                <div class="fz-16">
                  [text]
                </div>
              </div>
            </template>

            <template #footer>
              <div class="flex justify-content-center">
                <div class="col-6 flex">
                  <AppButton
                      class="flex-1"
                      label="Понятно"
                      @click="redirectTo({ name: 'index' })"
                  />
                </div>
              </div>
            </template>
          </AccountOpenCard>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<style lang="scss">
.p-card {
  background: #f5f6f7 !important;
}
</style>