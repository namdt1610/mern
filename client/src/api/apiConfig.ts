// apiConfig.js
export const authApi = {
    base: `/`,
    login: `/login`,
    register: `/register`,
}
export const productApi = {
    base: `/products`,
    getById: (id) => `/products/${id}`,
}

export const cartApi = {
    base: `/cart`,
    getById: (id) => `/cart/${id}`,
}

export const UserApi = {
    base: `/users`,
    getById: (id) => `/users/${id}`,
}
