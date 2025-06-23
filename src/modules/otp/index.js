import {FakeFetch} from "@/utils/fake-fetch.js";

export const OtpCreator = (phone) => {
    const formattedPhone = '+998 (XX) XXX-XX-XX'
    const defaultSuccessCode = '111111'

    const otpCode = ref()
    const loading = ref(false)


    const confirm = async () => {
        loading.value = true

        return await FakeFetch(() => {

            loading.value = false

            return otpCode.value === defaultSuccessCode
        })
    }

    return {
        formattedPhone,
        otpCode,
        loading,
        confirm,
    }

}