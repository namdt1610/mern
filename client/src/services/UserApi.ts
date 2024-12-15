import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {User} from '@shared/types/User'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8888/api',
        credentials: 'include',
        prepareHeaders: (headers) => {
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
        getUsers: builder.query<User[], void>({
            query: () => '/users',
        }),

        getUserById: builder.query<User, string>({
            query: (id) => `/users/${id}`,
        }),

        createUser: builder.mutation<User, Partial<User>>({
            query: (data) => ({
                url: '/users',
                method: 'POST',
                body: data,
            }),
        }),

        updateUser: builder.mutation<User, Partial<User> & { id: string }>({
            query: ({ id, ...data }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),

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
