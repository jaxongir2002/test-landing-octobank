import axios from '@axios'
import { defineStore } from 'pinia'
import {useRoute} from "vue-router";
import router from "@router";



export const useVariantResolver = defineStore('VariantResolver', {
    state: () => ({
        variant: 'has-petition',
        variantOtp: 'input',
        variantQr: 'recognized',
        variantAcceptPetition: 'success',
        variantApplicationCheck: 'yes',
        step: null,
    }),

    getters: {
        showAccount(state) {
            return state.step === 'account-form'
        },

        showOtp(state) {
            return state.step === 'create-account'
        },
        showQr(state) {
            return state.step === 'identify-qr'
        },
        showIsAccount(state) {
            return router.currentRoute.value.name === 'account' && this.step === 'account-form'
        },
        showApplicationCheck(state) {
            return router.currentRoute.value.name === 'application-check'
        },
        showAcceptPetition(state) {

            return state.step === 'application-tariff'
        }
    },
    actions: {
        showOnlyOtp(){
            this.showAccount = false
            this.showOtp = true
        },
        showOnlyAccount(){
            this.showAccount = true
            this.showOtp = false
        }
    },
})
