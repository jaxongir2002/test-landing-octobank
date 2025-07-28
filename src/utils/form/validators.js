import {isEmpty, isEmptyArray, isNullOrUndefined} from './index'

// 👉 Required Validator
export const requiredValidator = (value, text = "Это поле обязательно для заполнения") => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
        return text

    return !!String(value).trim().length || text
}

// 👉 Email Validator
export const emailValidator = (val) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) return 'Это поле обязательно для заполнения';
    return regex.test(val) || 'Введите корректный email';
};
