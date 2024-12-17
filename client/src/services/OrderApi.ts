import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order, CreateOrderRequest } from 'shared/types/Order' // Định nghĩa kiểu Order

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/api', // API backend URL
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        // Lấy danh sách đơn hàng
        getOrders: builder.query<Order[], void>({
            query: () => '/orders',
            providesTags: ['Order'],
        }),

        // Lấy chi tiết đơn hàng theo ID
        getOrderById: builder.query<Order, string>({
            query: (userId) => `/orders/${userId}`,
            providesTags: (result, error, orderId) => [
                { type: 'Order', id: orderId },
            ],
        }),

        // Tạo đơn hàng mới
        createOrder: builder.mutation<Order, CreateOrderRequest>({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['Order'],
        }),

        // Cập nhật trạng thái đơn hàng
        updateOrderStatus: builder.mutation<
            Order,
            { id: string; status: string }
        >({
            query: ({ id, status }) => ({
                url: `/orders/${id}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Order'],
        }),

        // Xóa đơn hàng
        deleteOrder: builder.mutation<void, string>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        }),
    }),
})

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation,
} = orderApi
