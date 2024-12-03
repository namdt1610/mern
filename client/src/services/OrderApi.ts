import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order } from 'interfaces/Order' // Định nghĩa kiểu Order

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
    endpoints: (builder) => ({
        // Lấy danh sách đơn hàng
        getOrders: builder.query<Order[], void>({
            query: () => '/orders',
        }),

        // Lấy chi tiết đơn hàng theo ID
        getOrderById: builder.query<Order, string>({
            query: (id) => `/orders/${id}`,
        }),

        // Tạo đơn hàng mới
        createOrder: builder.mutation<Order, Order>({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order,
            }),
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
        }),

        // Xóa đơn hàng
        deleteOrder: builder.mutation<void, string>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
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
