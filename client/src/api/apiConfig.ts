// apiConfig.js
export const authApi = {
    login: `/login`,
    register: `/register`,
    logout: `/logout`,
}
export const productApi = {
    base: `/products`,
    getById: (id) => `/products/${id}`,
}

export const cartApi = {
    base: `/cart`,
    getById: (id) => `/cart/${id}`,
}

export const userApi = {
    base: `/users`,
    getById: (id) => `/users/${id}`,
}
