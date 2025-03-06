import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Category } from '@/types/Category' // Định nghĩa kiểu Category

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl:
            process.env.REACT_APP_API_BASE_URL || 'http://localhost:8888/api', // API backend URL
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['Categories'],

    endpoints: (builder) => ({
        // Lấy danh sách các danh mục
        getCategories: builder.query<Category[], void>({
            query: () => '/categories',
            // transformResponse: (response: any) => response,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'Categories' as const,
                              _id,
                          })),
                          { type: 'Categories', id: 'LIST' },
                      ]
                    : [{ type: 'Categories', id: 'LIST' }],
        }),

        // Lấy chi tiết danh mục theo ID
        getCategoryById: builder.query<Category, string>({
            query: (id) => `/categories/${id}`,
            providesTags: (result, error, id) => [{ type: 'Categories', id }],
        }),

        // Thêm danh mục mới
        addCategory: builder.mutation<Category, Omit<Category, '_id'>>({
            query: (category) => ({
                url: '/categories',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
        }),

        // Cập nhật danh mục
        updateCategory: builder.mutation<
            Category,
            { id: string; data: Category }
        >({
            query: ({ id, data }) => ({
                url: `/categories/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Categories', id },
            ],
        }),

        // Xóa danh mục
        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Categories', id },
                { type: 'Categories', id: 'LIST' },
            ],
        }),
    }),
})

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi
