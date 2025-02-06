import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '@shared/types/Product'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/api', // API backend URL
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    endpoints: (builder) => ({
        // Lấy danh sách sản phẩm
        getProducts: builder.query<Product[], void>({
            query: () => '/products',
        }),

        // Get active products
        getActiveProducts: builder.query<Product[], void>({
            query: () => '/products/active',
        }),

        // Lấy chi tiết sản phẩm theo ID
        getProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
        }),

        // Thêm sản phẩm mới
        addProduct: builder.mutation<Product, Partial<Product>>({
            query: (data) => ({
                url: '/products',
                method: 'POST',
                body: data,
            }),
        }),

        // Cập nhật sản phẩm
        updateProduct: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/products/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),

        // Xóa sản phẩm
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
        }),

        // Tăng số lượt click cho sản phẩm
        updateClickCount: builder.mutation<Product, string>({
            query: (productId) => ({
                url: `products/${productId}/click`,
                method: 'PATCH',
            }),
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetActiveProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUpdateClickCountMutation,
} = productApi
