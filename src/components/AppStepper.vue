<script setup>
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import {useVModels} from "@vueuse/core";


const props = defineProps({
  step: {
    type: Number,
    required: false,
    default: 0,
  },
})

const emit = defineEmits(['update:step'])

const { step } = useVModels(props, emit)

</script>

<template>
  <Stepper v-model:value="step">

    <StepPanels>

      <template
          v-for="(stepComp, index) in steps"
          :key="index"
      >
        <StepPanel v-slot="{ activateCallback }" value="0">

        </StepPanel>
      </template>

    </StepPanels>
  </Stepper>
</template>