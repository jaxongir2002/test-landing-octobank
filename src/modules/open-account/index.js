import {useVariantResolver} from "@/stores/useVariantResolver.js";

export const openAccountCreator = () => {
    const loading = ref(false)
    const organization = ref({
        clientType: 'company',
        oferta: [],
    })

    const checkOrganization = () => {
        loading.value = true

        if(useVariantResolver().variant === 'has-petition'){
            return "petition"
        }else if(useVariantResolver().variant === 'has-account'){
            return 'account'
        }

        setTimeout(() => {
            loading.value = false
        }, 3000)

        return false
    }

    return {
        organization,
        checkOrganization,
    }
}