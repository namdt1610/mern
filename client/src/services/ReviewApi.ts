import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Review} from '@/types/Review'

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/api' }),
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], string>({
            query: (bookId) => `/reviews/${bookId}`,
        }),
        addReview: builder.mutation<Review, Review>({
            query: (review) => ({
                url: '/reviews',
                method: 'POST',
                body: review,
            }),
        }),
        updateReview: builder.mutation<Review, { id: string; review: Review }>({
            query: ({ id, review }) => ({
                url: `/reviews/${id}`,
                method: 'PUT',
                body: review,
            }),
        }),
        deleteReview: builder.mutation<void, string>({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetReviewsQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi
