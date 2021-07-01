export const updatedObject=(oldObject,updatedProperties)=>{
    return{
        ...oldObject,
        ...updatedProperties
    }
}

export const checkvalidity = (value, rules) => {
    let isValid = true
    if (rules) {
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.mailCheck) {
            const copiedValue = value.trim()
            isValid = copiedValue.match('@') && copiedValue.endsWith(".com") && isValid
        }
    }
    return isValid
}