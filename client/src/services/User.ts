import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../interfaces' // Định nghĩa kiểu User

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/api', // API backend URL
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    endpoints: (builder) => ({
        // Lấy danh sách users
        getUsers: builder.query<User[], void>({
            query: () => '/users',
        }),

        // Lấy chi tiết user theo ID
        getUserById: builder.query<User, string>({
            query: (id) => `/users/${id}`,
        }),

        // Cập nhật user
        updateUser: builder.mutation<User, Partial<User> & { id: string }>({
            query: ({ id, ...data }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        // Xóa user
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi
