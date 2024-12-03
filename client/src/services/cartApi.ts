import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CartItem } from 'interfaces/CartItem' // Định nghĩa kiểu CartItem

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
    endpoints: (builder) => ({
        // Lấy danh sách sản phẩm trong giỏ hàng
        getCartItems: builder.query<CartItem[], void>({
            query: () => '/cart',
        }),

        // Thêm sản phẩm vào giỏ hàng
        addToCart: builder.mutation<void, CartItem>({
            query: (item) => ({
                url: '/cart',
                method: 'POST',
                body: item,
            }),
        }),

        // Cập nhật số lượng sản phẩm trong giỏ hàng
        updateCartItem: builder.mutation<
            void,
            { id: string; quantity: number }
        >({
            query: ({ id, quantity }) => ({
                url: `/cart/${id}`,
                method: 'PUT',
                body: { quantity },
            }),
        }),

        // Xóa sản phẩm khỏi giỏ hàng
        removeCartItem: builder.mutation<void, string>({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetCartItemsQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
} = cartApi
