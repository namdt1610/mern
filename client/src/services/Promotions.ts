import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Promotion} from '@/types/Promotion'

export const promotionApi = createApi({
    reducerPath: 'promotionApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/api' }),
    endpoints: (builder) => ({
        getPromotions: builder.query<Promotion[], void>({
            query: () => '/promotions',
        }),
        addPromotion: builder.mutation<Promotion, Promotion>({
            query: (promotion) => ({
                url: '/promotions',
                method: 'POST',
                body: promotion,
            }),
        }),
        updatePromotion: builder.mutation<
            Promotion,
            { id: string; promotion: Promotion }
        >({
            query: ({ id, promotion }) => ({
                url: `/promotions/${id}`,
                method: 'PUT',
                body: promotion,
            }),
        }),
        deletePromotion: builder.mutation<void, string>({
            query: (id) => ({
                url: `/promotions/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetPromotionsQuery,
    useAddPromotionMutation,
    useUpdatePromotionMutation,
    useDeletePromotionMutation,
} = promotionApi
