// apiConfig.js

export const authApi = {
    login: `/login`,
    register: `/register`,
    logout: `/logout`,
}
export const productApi = {
    base: `/products`,
    getById: (id: string) => `/products/${id}`,
}

export const cartApi = {
    base: `/cart`,
    getById: (id: string) => `/cart/${id}`,
}

export const userApi = {
    base: `/users`,
    getById: (id: string) => `/users/${id}`,
}

export const categoryApi = {
    base: `/categories`,
    getById: (id: string) => `/categories/${id}`,
}

export const orderApi = {
    base: '/orders',
    getById: (id: string) => `/orders/${id}`,
}
