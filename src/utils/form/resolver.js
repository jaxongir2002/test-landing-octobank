

export const AppResolver = (settings, { values }) => {
    const errors = {};
    let valid = true

    for (let key in settings){

        const validators = settings[key]


        if(validators.length){
            validators.forEach(validator => {
                let validField

                if(typeof validator === 'function') {
                    validField = validator && validator(values[key])
                }else {
                    validField = validator
                }

                if(typeof validField === 'string'){
                    errors[key] = [{ message: validField }];

                    valid = false
                }else if(typeof validField === 'boolean'){
                    errors[key] = null
                    valid = true
                }
            })
        }
    }

    return {
        values, // (Optional) Used to pass current form values to submit event.
        errors,
        valid,
    }
}