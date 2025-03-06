import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IInventory } from '@/types/IInventory'

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
            IInventory,
            {
                productId: string
                quantity: number
                userId: string | null
                warehouseId?: string
            }
        >({
            query: ({ productId, quantity, userId, warehouseId }) => ({
                url: `/inventory/${productId}/add`,
                method: 'POST',
                body: { quantity, userId, warehouseId },
            }),
            invalidatesTags: ['Inventory'],
        }),

        // Remove stock
        removeStock: builder.mutation<
            IInventory,
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
            IInventory,
            { productId: string; quantity: number }
        >({
            query: ({ productId, quantity }) => ({
                url: `/inventory/${productId}/stock`,
                method: 'PATCH',
                body: { quantity },
            }),
            invalidatesTags: ['Inventory'],
        }),

        getAllStock: builder.query<IInventory[], void>({
            query: () => '/inventory',
            providesTags: ['Inventory'],
        }),

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

        // Get product's stock by ID
        getInventoryByProductId: builder.query<IInventory, string>({
            query: (bookId) => `/inventory/${bookId}`,
            providesTags: ['Inventory'],
        }),

        getInventoryByCart: builder.query<IInventory[], string>({
            query: (userId) => `/inventory/cart/${userId}`,
            providesTags: ['Inventory'],
        }),

        updateInventory: builder.mutation<
            IInventory,
            { id: string; data: Partial<IInventory> }
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
    useGetInventoryByProductIdQuery,
    useUpdateInventoryMutation,
    useLazyGetInventoryByProductIdQuery,
} = inventoryApi
