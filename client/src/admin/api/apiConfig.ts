// apiConfig.js

export const productApi = {
    base: `/products`,
    getById: (id) => `/products/${id}`,
}

export const categoryApi = {
    base: `/categories`,
    getById: (id) => `/categories/${id}`,
}
