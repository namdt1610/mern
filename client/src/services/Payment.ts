import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Payment } from '@/types/Payment'

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/api' }),
    endpoints: (builder) => ({
        getPayments: builder.query<Payment[], void>({
            query: () => '/payments',
        }),
        createPayment: builder.mutation<Payment, Payment>({
            query: (payment) => ({
                url: '/payments',
                method: 'POST',
                body: payment,
            }),
        }),
        getPaymentByOrderId: builder.query<Payment, string>({
            query: (orderId) => `/payments/order/${orderId}`,
        }),
    }),
})

export const {
    useGetPaymentsQuery,
    useCreatePaymentMutation,
    useGetPaymentByOrderIdQuery,
} = paymentApi
