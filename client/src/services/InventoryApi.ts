import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {InventoryItem} from '@/types/InventoryItem' // Định nghĩa kiểu InventoryItem

export const inventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/api', // API backend URL
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    endpoints: (builder) => ({
        // Lấy danh sách sản phẩm trong kho
        getInventoryItems: builder.query<InventoryItem[], void>({
            query: () => '/inventory',
        }),

        // Cập nhật số lượng tồn kho của sản phẩm
        updateInventory: builder.mutation<
            void,
            { id: string; quantity: number }
        >({
            query: ({ id, quantity }) => ({
                url: `/inventory/${id}`,
                method: 'PUT',
                body: { quantity },
            }),
        }),

        // Thêm sản phẩm vào kho
        addInventoryItem: builder.mutation<InventoryItem, InventoryItem>({
            query: (item) => ({
                url: '/inventory',
                method: 'POST',
                body: item,
            }),
        }),

        // Xóa sản phẩm khỏi kho
        removeInventoryItem: builder.mutation<void, string>({
            query: (id) => ({
                url: `/inventory/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetInventoryItemsQuery,
    useUpdateInventoryMutation,
    useAddInventoryItemMutation,
    useRemoveInventoryItemMutation,
} = inventoryApi
