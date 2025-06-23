import {useVariantResolver} from "@/stores/useVariantResolver.js";
import AppTextField from "@/components/form-inputs/AppTextField.vue";
import InputOtp from 'primevue/inputotp';


export const initOtpComponent = computed(() => {
    const variantStore = useVariantResolver()

    if(variantStore.variantOtp === 'input'){
        return {
            component: AppTextField,
            bind: {

            }
        }
    }else if(variantStore.variantOtp === 'otp'){
        return {
            component: InputOtp,
            bind: {
                class: "app-otp-input",
                integerOnly: true,
                size: 'large',
                length: 6,
            },
        }
    }
})