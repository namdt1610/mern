import { baseQueryWithReauth } from './../redux/baseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '@/types/IUser'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => '/users',
        }),

        getUserById: builder.query<IUser, string>({
            query: (id) => `/users/${id}`,
        }),

        createUser: builder.mutation<IUser, Partial<IUser>>({
            query: (data) => ({
                url: '/users',
                method: 'POST',
                body: data,
            }),
        }),

        updateUser: builder.mutation<
            IUser,
            Partial<IUser> & { userId: string | undefined }
        >({
            query: ({ userId, ...data }) => ({
                url: `/users/${userId}`,
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

        getFavorites: builder.query<any[], string>({
            query: (userId) => ({
                url: `/users/favorites/${userId}`,
            }),
        }),

        addToFavorites: builder.mutation<
            IUser,
            { userId: string; productId: string }
        >({
            query: ({ userId, productId }) => ({
                url: `/users/favorites`,
                method: 'POST',
                body: JSON.stringify({ userId, productId }),
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
    useGetFavoritesQuery,
    useAddToFavoritesMutation,
} = userApi
