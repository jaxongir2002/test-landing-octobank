import {createI18n} from 'vue-i18n'


export default createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') ?? 'ru',
    fallbackLocale: 'ru',
})
