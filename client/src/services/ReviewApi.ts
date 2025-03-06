import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Review } from '@/types/Review'

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/api' }),
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], string>({
            query: (bookId) => `/reviews/${bookId}`,
        }),
        getReviewsByProductId: builder.query<Review[], string>({
            query: (productId) => `/reviews/product/${productId}`,
        }),
        getReviewsByUserId: builder.query<Review[], string>({
            query: (userId) => `/reviews/user/${userId}`,
        }),
        getReviewsByProductIdAndUserId: builder.query<
            Review[],
            { productId: string; userId: string }
        >({
            query: ({ productId, userId }) => `/reviews/${productId}/${userId}`,
        }),
        getAverageRating: builder.query<number, string>({
            query: (productId) => `/reviews/average/${productId}`,
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
    useGetReviewsByProductIdQuery,
    useGetReviewsByUserIdQuery,
    useGetReviewsByProductIdAndUserIdQuery,
    useGetAverageRatingQuery,
} = reviewApi
