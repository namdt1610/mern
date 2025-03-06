// services/CartApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddToCartRequest, ICart } from '@/types/ICart'

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/api', // API backend URL
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        // Lấy giỏ hàng của người dùng
        getCart: builder.query<ICart, string>({
            // Nhận id người dùng làm tham số
            query: (userId) => `/cart/${userId}`,
            providesTags: ['Cart'],
        }),

        // Thêm sản phẩm vào giỏ hàng
        addToCart: builder.mutation<
            void,
            { userId: string; item: AddToCartRequest }
        >({
            query: ({ userId, item }) => ({
                url: `/cart/${userId}`,
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Cart'],
        }),

        // Cập nhật số lượng sản phẩm trong giỏ hàng
        updateCartItem: builder.mutation<
            void,
            { userId: string; productId: string; quantity: number }
        >({
            query: ({ userId, productId, quantity }) => ({
                url: `/cart/${userId}/${productId}`,
                method: 'PUT',
                body: { quantity },
            }),
            invalidatesTags: ['Cart'],
        }),

        // Xóa sản phẩm khỏi giỏ hàng
        removeCartItem: builder.mutation<
            void,
            { userId: string; productId: string }
        >({
            query: ({ userId, productId }) => ({
                url: `/cart/${userId}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
})

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
} = cartApi
