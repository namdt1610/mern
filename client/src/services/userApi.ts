import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '@/types/User' // Định nghĩa kiểu User

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/api', // API backend URL
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            // Tránh việc thiết lập Content-Type cho FormData
            const isFileUpload =
                headers.get('Content-Type') === 'multipart/form-data'
            if (!isFileUpload) {
                headers.set('Content-Type', 'application/json')
            }
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

        // Tạo user mới
        createUser: builder.mutation<User, Partial<User>>({
            query: (data) => ({
                url: '/users',
                method: 'POST',
                body: data,
            }),
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

        // Tải avatar lên
        uploadAvatar: builder.mutation<{ avatarUrl: string }, FormData>({
            query: (formData) => ({
                url: '/upload',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUploadAvatarMutation,
} = userApi
