import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IWarehouse } from '@/types/IWarehouse' // Định nghĩa kiểu Warehouse

export const WarehouseApi = createApi({
    reducerPath: 'WarehouseApi',
    baseQuery: fetchBaseQuery({
        baseUrl:
            process.env.REACT_APP_API_BASE_URL || 'http://localhost:8888/api', // API backend URL
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['Warehouses'],

    endpoints: (builder) => ({
        // Lấy danh sách các danh mục
        getWarehouses: builder.query<IWarehouse[], void>({
            query: () => '/warehouses',
            // transformResponse: (response: any) => response,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'Warehouses' as const,
                              _id,
                          })),
                          { type: 'Warehouses', id: 'LIST' },
                      ]
                    : [{ type: 'Warehouses', id: 'LIST' }],
        }),

        // Lấy chi tiết danh mục theo ID
        getWarehouseById: builder.query<IWarehouse, string>({
            query: (id) => `/warehouses/${id}`,
            providesTags: (result, error, id) => [{ type: 'Warehouses', id }],
        }),

        // Thêm danh mục mới
        addWarehouse: builder.mutation<IWarehouse, Omit<IWarehouse, '_id'>>({
            query: (Warehouse) => ({
                url: '/warehouses',
                method: 'POST',
                body: Warehouse,
            }),
            invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }],
        }),

        // Cập nhật danh mục
        updateWarehouse: builder.mutation<
            IWarehouse,
            { id: string; data: IWarehouse }
        >({
            query: ({ id, data }) => ({
                url: `/warehouses/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Warehouses', id },
            ],
        }),

        // Xóa danh mục
        deleteWarehouse: builder.mutation<void, string>({
            query: (id) => ({
                url: `/warehouses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Warehouses', id },
                { type: 'Warehouses', id: 'LIST' },
            ],
        }),
    }),
})

export const {
    useGetWarehousesQuery,
    useGetWarehouseByIdQuery,
    useAddWarehouseMutation,
    useUpdateWarehouseMutation,
    useDeleteWarehouseMutation,
} = WarehouseApi
