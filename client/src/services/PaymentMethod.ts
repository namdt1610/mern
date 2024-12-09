import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PaymentMethod } from '@/types/PaymentMethod'

export const paymentMethodApi = createApi({
    reducerPath: 'paymentMethodApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/api' }),
    endpoints: (builder) => ({
        getPaymentMethods: builder.query<PaymentMethod[], void>({
            query: () => '/payment-methods',
        }),
        addPaymentMethod: builder.mutation<PaymentMethod, PaymentMethod>({
            query: (paymentMethod) => ({
                url: '/payment-methods',
                method: 'POST',
                body: paymentMethod,
            }),
        }),
        updatePaymentMethod: builder.mutation<
            PaymentMethod,
            { id: string; paymentMethod: PaymentMethod }
        >({
            query: ({ id, paymentMethod }) => ({
                url: `/payment-methods/${id}`,
                method: 'PUT',
                body: paymentMethod,
            }),
        }),
        deletePaymentMethod: builder.mutation<void, string>({
            query: (id) => ({
                url: `/payment-methods/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetPaymentMethodsQuery,
    useAddPaymentMethodMutation,
    useUpdatePaymentMethodMutation,
    useDeletePaymentMethodMutation,
} = paymentMethodApi
