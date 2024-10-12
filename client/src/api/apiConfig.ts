// apiConfig.js

export const productApi = {
    base: `/products`,
    getById: (id) => `/products/${id}`,
    search: (searchTerm) => `/products/search?term=${searchTerm}`,
}
