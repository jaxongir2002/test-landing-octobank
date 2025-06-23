import { createApp } from 'vue'
import App from './App.vue'
import i18n from '@/plugins/i18n'
import router from '@/router'
import { createPinia } from 'pinia'
import { mask } from 'vue-the-mask'
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import AppPreset from "@/plugins/theme"
import Tooltip from 'primevue/tooltip';
import "@/styles/main.scss"
import "vue-toastification/dist/index.css"
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: AppPreset,
        options: {
            darkModeSelector: '.app-dark-mode' // Отключаем автоматическое переключение на темную тему
        }
    },
})
app.use(ToastService)

app.directive('mask', mask)
app.directive('tooltip', Tooltip)

app.mount('#app')