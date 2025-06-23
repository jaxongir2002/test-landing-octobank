<script setup>
import {AppResolver} from "@/utils/form/resolver.js";
import AppButton from "@/components/AppButton.vue";
import AccountOpenCard from "@/views/account/AccountOpenCard.vue";
import AppTextField from "@/components/form-inputs/AppTextField.vue";
import {requiredValidator} from "@/utils/form/validators.js";
import {Form} from "@primevue/forms";
import {useVariantResolver} from "@/stores/useVariantResolver.js";

const emit = defineEmits(['prev', 'has-petition'])

const application = ref()
const applicationError = ref()

const form = ref()
const variantStore = useVariantResolver()

const formValidRules = ref({
  application: [requiredValidator]
})

const onClickNext = async () => {
  applicationError.value = null
  const { valid } = await form.value.validate()

  if(valid) {
    if(variantStore.variantApplicationCheck === 'yes'){
      emit('has-petition', {
        number: '56745432454343',
        status: 'На рассмотрении'
      })
    }else if(variantStore.variantApplicationCheck === 'no'){
      applicationError.value = 'Заявки с таким номером не существует. Проверьте нормер и попробуйте ещё раз'
    }
  }
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
              @click="emit('prev')"
          />
        </div>
        <div class="col-8 text-center">
              <span class="app-h4 app-color-1B1B1B">
                Статус заявки
              </span>
        </div>
      </div>
    </template>

    <template #content>

      <Form
          ref="form"
          v-slot="$form"
          :resolver="(validation) => AppResolver(formValidRules, validation)"
      >
        <div class="flex flex-column">
          <div class="col-12">
            <AppTextField
                v-model="application"
                class="flex-1"
                name="application"
                :error-message="$form?.application?.error?.message || applicationError"
                :invalid="!!applicationError"
                label="Номер заявки"
                @blur="applicationError = null"
            />
          </div>

        </div>
      </Form>
    </template>

    <template #footer>
      <div class="flex flex-column-reverse sm:flex-row gap-2 sm:gap-4">
        <AppButton
            class="flex-1"
            severity="secondary"
            label="Отменить"
            @click="emit('prev')"
        />

        <AppButton
            class="flex-1"
            @click="onClickNext"
            label="Узнать статус"
        />
      </div>
    </template>
  </AccountOpenCard>
</template>