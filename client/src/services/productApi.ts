import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from 'interfaces/Product' // Định nghĩa kiểu Product

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

        // Lấy chi tiết sản phẩm theo ID
        getProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
        }),

        // Cập nhật sản phẩm
        updateProduct: builder.mutation<
            Product,
            Partial<Product> & { id: string }
        >({
            query: ({ id, ...data }) => ({
                url: `/products/${id}`,
                method: 'PUT',
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
    }),
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi
