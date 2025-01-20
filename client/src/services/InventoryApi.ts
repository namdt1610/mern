import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Inventory } from 'shared/types/Inventory'

export const inventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/api',
        credentials: 'include',
    }),
    tagTypes: ['Inventory'],
    endpoints: (builder) => ({
        // Add stock
        addStock: builder.mutation<
            Inventory,
            { productId: string; quantity: number; userId: string | null }
        >({
            query: ({ productId, quantity, userId }) => ({
                url: `/inventory/${productId}/add`,
                method: 'POST',
                body: { quantity, userId },
            }),
            invalidatesTags: ['Inventory'],
        }),

        // Remove stock
        removeStock: builder.mutation<
            Inventory,
            { productId: string; quantity: number }
        >({
            query: ({ productId, quantity }) => ({
                url: `/inventory/${productId}/remove`,
                method: 'POST',
                body: { quantity },
            }),
            invalidatesTags: ['Inventory'],
        }),

        // Update stock
        updateStock: builder.mutation<
            Inventory,
            { productId: string; quantity: number }
        >({
            query: ({ productId, quantity }) => ({
                url: `/inventory/${productId}/stock`,
                method: 'PATCH',
                body: { quantity },
            }),
            invalidatesTags: ['Inventory'],
        }),

        // Add this new endpoint
        getAllStock: builder.query<Inventory[], void>({
            query: () => '/inventory',
            providesTags: ['Inventory'],
        }),

        // Add to the existing endpoints
        getStockActivity: builder.query<any[], [Date, Date] | undefined>({
            query: (dateRange) => ({
                url: '/inventory/activity',
                params: dateRange
                    ? {
                          startDate: dateRange[0].toISOString(),
                          endDate: dateRange[1].toISOString(),
                      }
                    : undefined,
            }),
            providesTags: ['Inventory'],
        }),

        // Add to existing endpoints
        getInventoryById: builder.query<Inventory, string>({
            query: (id) => `/inventory/${id}`,
            providesTags: ['Inventory'],
        }),

        getInventoryByCart: builder.query<Inventory[], string>({
            query: (userId) => `/inventory/cart/${userId}`,
            providesTags: ['Inventory'],
        }),
        
        updateInventory: builder.mutation<
            Inventory,
            { id: string; data: Partial<Inventory> }
        >({
            query: ({ id, data }) => ({
                url: `/inventory/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Inventory'],
        }),
    }),
})

export const {
    useGetAllStockQuery,
    useAddStockMutation,
    useRemoveStockMutation,
    useUpdateStockMutation,
    useGetStockActivityQuery,
    useGetInventoryByIdQuery,
    useUpdateInventoryMutation,
} = inventoryApi
