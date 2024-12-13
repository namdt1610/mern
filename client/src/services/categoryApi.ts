import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Category } from '@shared/types/Category' // Định nghĩa kiểu Category

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/api', // API backend URL
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    endpoints: (builder) => ({
        // Lấy danh sách các danh mục
        getCategories: builder.query<Category[], void>({
            query: () => '/categories',
        }),

        // Lấy chi tiết danh mục theo ID
        getCategoryById: builder.query<Category, string>({
            query: (id) => `/categories/${id}`,
        }),

        // Thêm danh mục mới
        addCategory: builder.mutation<Category, Category>({
            query: (category) => ({
                url: '/categories',
                method: 'POST',
                body: category,
            }),
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
        }),

        // Xóa danh mục
        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
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
