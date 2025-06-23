import {isEmpty, isEmptyArray, isNullOrUndefined} from './index'

// 👉 Required Validator
export const requiredValidator = (value, text = "Это поле обязательно для заполнения") => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
        return text

    return !!String(value).trim().length || text
}

// 👉 Email Validator
// export const emailValidator = value => {
//     const {t} = i18n.global
//     if (isEmpty(value))
//         return true
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     if (Array.isArray(value))
//         return value.every(val => re.test(String(val))) || t('EMAIL_NOT_VALID')
//
//     return re.test(String(value)) || t('EMAIL_NOT_VALID')
// }
//
// // 👉 Password Validator
// export const passwordValidator = password => {
//     const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
//     const validPassword = regExp.test(password)
//
//     return (
//         // eslint-disable-next-line operator-linebreak
//         validPassword ||
//         'Field must contain at least one uppercase, lowercase, special character and digit with min 8 chars')
// }
//
// // 👉 Confirm Password Validator
// export const confirmedValidator = (value, target) => value === target || 'Пароли не совпадают'
//
// // 👉 Between Validator
// export const betweenValidator = (value, min, max) => {
//     const valueAsNumber = Number(value)
//
//     if (max === undefined || max === null || max === '') {
//         return valueAsNumber >= Number(min) || `Введите число, большее или равное ${resolveCurrency(min)}`
//     }
//
//     return (valueAsNumber >= Number(min) && valueAsNumber <= Number(max))
//         || `Введите число между ${min} и ${max}`
// }
//
export const betweenLengthValidator = (value, min, max, { minText = `Минимальная длина поля должна быть ${min} символов`, maxText = `Максимальная длина поля не может привышать ${max} символов` }) => {
  if (isEmpty(value))
    return true


  if(value.length < min){
    return minText
  }else if(value.length > max){
    return maxText
  }

  return true
}


export const minLengthValidator = (value, min, { minText = `Минимальная длина поля должна быть ${min} символов`}) => {
    if (isEmpty(value))
        return true

    if(value.length < min){
        return minText
    }

    return true
}
//
// export const sumValidator = val => {
//   const { t } = i18n.global
//   const sum = reverseResolveCurrency(val)
//
//   if (sum === 0.00) {
//     return t('REQUIRED')
//   }
//
//   if (sum < 0.00) {
//     return t('SUM_IS_LESS_THAN_ZERO')
//   }
//
//
//   return true
// }
//
// // 👉 Integer Validator
// export const integerValidator = value => {
//     if (isEmpty(value))
//         return true
//     if (Array.isArray(value))
//         return value.every(val => /^-?[0-9]+$/.test(String(val))) || 'This field must be an integer'
//
//     const {t} = i18n.global
//
//     return /^-?[0-9]+$/.test(String(value)) || t('ONLY_NUMBERS')
// }
//
// // 👉 Regex Validator
// export const regexValidator = (value, regex, message = null) => {
//     if (isEmpty(value))
//         return true
//     let regeX = regex
//     if (typeof regeX === 'string')
//         regeX = new RegExp(regeX)
//     if (Array.isArray(value))
//         return value.every(val => regexValidator(val, regeX))
//
//     const {t} = i18n.global
//
//     return regeX.test(String(value)) || t(message ?? 'ERROR_FORMAT')
// }
//
// // 👉 Alpha Validator
// export const alphaValidator = value => {
//     if (isEmpty(value))
//         return true
//
//     return /^[A-Z]*$/i.test(String(value)) || 'The Alpha field may only contain alphabetic characters'
// }
//
// // 👉 URL Validator
// export const urlValidator = value => {
//     if (isEmpty(value))
//         return true
//     const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
//
//     return re.test(String(value)) || 'URL is invalid'
// }
//
// // 👉 Length Validator
// export const lengthValidator = (value, length) => {
//     if (isEmpty(value))
//         return true
//
//     const {t} = i18n.global
//
//     if (String(value).length > length) {
//         return t('MAX_LENGTH_VALIDATOR', {length})
//     } else if (String(value).length < length) {
//         return t('MIN_LENGTH_VALIDATOR', {length})
//     }
//
//     return true
// }
//
// // 👉 Alpha-dash Validator
// export const alphaDashValidator = value => {
//     if (isEmpty(value))
//         return true
//     const valueAsString = String(value)
//
//     return /^[0-9A-Z_-]*$/i.test(valueAsString) || 'All Character are not valid'
// }
//
// export const betweenNumberValidator = (value, min, max) => {
//   let valueAsNumber = Number(value)
//
//   if (!valueAsNumber) {
//     valueAsNumber = reverseResolveCurrency(value)
//   }
//
//   if (max === undefined || max === null || max === '') {
//     return valueAsNumber >= Number(min) || `Введите число, большее или равное ${min}`
//   }
//
//   if (min === undefined || min === null || min === '') {
//     return valueAsNumber <= Number(max) || `Введите число, меньшее или равное ${max}`
//   }
//
//   if (min === max) {
//     return valueAsNumber === Number(max) || `Введите число, равное ${max}`
//   }
//
//   return (valueAsNumber >= Number(min) && valueAsNumber <= Number(max))
//     || `Введите число между ${min} и ${max}`
// }
