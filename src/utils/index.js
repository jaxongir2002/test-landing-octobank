import router from "@router";


export const redirectTo = (routeParams) => {
    router.push(routeParams)
}


export const phoneMask = '+998 (##) ### ## ##'


export const getOnlyNumbersFromString = (str) => {
    return String(str).replace(/\D/g, '')
}

