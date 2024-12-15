import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Customer} from '@/types/Customer'

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/api' }),
    endpoints: (builder) => ({
        getCustomers: builder.query<Customer[], void>({
            query: () => '/customers',
        }),
        getCustomerById: builder.query<Customer, string>({
            query: (id) => `/customers/${id}`,
        }),
        addCustomer: builder.mutation<Customer, Customer>({
            query: (customer) => ({
                url: '/customers',
                method: 'POST',
                body: customer,
            }),
        }),
        updateCustomer: builder.mutation<
            Customer,
            { id: string; data: Customer }
        >({
            query: ({ id, data }) => ({
                url: `/customers/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteCustomer: builder.mutation<void, string>({
            query: (id) => ({
                url: `/customers/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customerApi
