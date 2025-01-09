// utils/format.utils.ts

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

export const isValidPhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/ // Định dạng E.164
    return phoneRegex.test(phone)
}

export const isValidURL = (url: string): boolean => {
    const urlRegex = /^(https?:\/\/)?([a-z0-9.-]+)(:[0-9]{1,5})?(\/[^\s]*)?$/i
    return urlRegex.test(url)
}

export const isValidPrice = (price: string): boolean => {
    const priceRegex = /^\d+(\.\d{1,2})?$/
    return priceRegex.test(price)
}

export const validationRules = {
    email: isValidEmail,
    phone: isValidPhoneNumber,
    url: isValidURL,
}
