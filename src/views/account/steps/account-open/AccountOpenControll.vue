<script setup>
import Stepper from 'primevue/stepper';
import StepPanels from 'primevue/steppanels';
import StepPanel from "primevue/steppanel";
import AccountOpenStep from "@/views/account/steps/account-open/AccountOpenStep.vue";
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppButton from "@/components/AppButton.vue";
import {redirectTo} from "@/utils/index.js";

const step = ref(0)
const emit = defineEmits(['next', 'prev'])

const petition = ref({
  number: null,
  status: null,
})

const onSuccessStep = ({ number, status }) => {
  petition.value = {
    number,
    status,
  }
}
</script>

<template>
  <Stepper
      class="app-account-stepper"
      v-model:value="step"
  >

    <StepPanels>

      <StepPanel v-slot="{ activateCallback }" :value="0">
        <AccountOpenStep
          @success="activateCallback(1)"
          @has-account="activateCallback(2)"
          @error="emit('next')"
        />
      </StepPanel>

      <StepPanel v-slot="{ activateCallback }" :value="1">
        <AccountOpenCard>

          <template #title>
            Заявка {{ petition.number }}
          </template>

          <template #content>
            Статус: {{ petition.status }}
          </template>

          <template #footer>
            <div class="flex ">
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

      <StepPanel v-slot="{ activateCallback }" :value="2">
        <AccountOpenCard>

          <template #title>
            У вас уже открыт счёт
          </template>

          <template #footer>
            <div class="flex ">
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
</template>