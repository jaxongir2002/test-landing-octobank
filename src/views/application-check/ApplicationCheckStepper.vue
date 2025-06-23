<script setup>
import Stepper from "primevue/stepper";
import StepPanels from "primevue/steppanels";
import StepPanel from "primevue/steppanel";
import ApplicationCheckBlock from "@/views/application-check/ApplicationCheckBlock.vue";
import {redirectTo} from "@/utils/index.js";
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";

const step = ref("application-check")
const petition = ref({
  number: null,
  status: null,
})

const onHasPetition = ({ number, status }, next) => {
  petition.value = {
    number,
    status
  }


  next('application-check-status')
}
</script>

<template>
  <div class="pt-4 flex-1">
    <Stepper
        class="app-account-stepper flex-1"
        v-model:value="step"
    >
      <StepPanels class="px-0 py-0">

        <StepPanel v-slot="{ activateCallback }" :value="'application-check'">
          <ApplicationCheckBlock
              @prev="redirectTo({ name: 'index' })"
              @has-petition="value => onHasPetition(value, activateCallback)"
          />
        </StepPanel>

        <StepPanel v-slot="{ activateCallback }" :value="'application-check-status'">
          <AccountOpenCard>

            <template #title>
              <div class="flex">
                <div class="col-2 z-0">
                  <AppButton
                      severity="secondary"
                      icon="pi pi-chevron-left"
                      rounded
                      @click="activateCallback('application-check')"
                  />
                </div>
                <div class="col-8 text-center">
                   <span class="app-h4 app-color-1B1B1B">
                    Заявка {{ petition.number }}
                  </span>
                </div>
              </div>

            </template>

            <template #content>
              <div class="mt-4 mb-4">

              <span class="app-body-1">
                Статус: {{ petition.status }}
              </span>
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