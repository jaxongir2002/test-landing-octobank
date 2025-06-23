// import { useToast } from 'vue-toastification'
//
// const toast = useToast()
//
// const defaultOptions = {
//     position: 'bottom-left',
//     toastClassName: 'toast-custom',
//     timeout: 200000
// }
//
// export function toastSuccess(msg) {
//     toast.success(msg, defaultOptions)
// }
//
// export function toastError(msg, networkResponse = null) {
//     toast({
//         component: Error,
//         props: {
//             msg,
//             networkResponse,
//         },
//     }, defaultOptions)
// }


export function toastSuccess(toast, msg){
    toast.add({
        severity: 'success',
        summary: msg,
        life: 3000
    })
}