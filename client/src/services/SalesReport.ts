import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {SalesReport} from '@/types/SalesReport'

export const salesReportApi = createApi({
    reducerPath: 'salesReportApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/api' }),
    endpoints: (builder) => ({
        getSalesReportByDate: builder.query<
            SalesReport,
            { startDate: string; endDate: string }
        >({
            query: ({ startDate, endDate }) =>
                `/sales-report/date-range?start=${startDate}&end=${endDate}`,
        }),
        getSalesReportByProduct: builder.query<
            SalesReport,
            { productId: string; startDate: string; endDate: string }
        >({
            query: ({ productId, startDate, endDate }) =>
                `/sales-report/product/${productId}?start=${startDate}&end=${endDate}`,
        }),
        getSalesReportByCategory: builder.query<
            SalesReport,
            { categoryId: string; startDate: string; endDate: string }
        >({
            query: ({ categoryId, startDate, endDate }) =>
                `/sales-report/category/${categoryId}?start=${startDate}&end=${endDate}`,
        }),
        getSalesReportByOrderStatus: builder.query<
            SalesReport,
            { status: string; startDate: string; endDate: string }
        >({
            query: ({ status, startDate, endDate }) =>
                `/sales-report/status/${status}?start=${startDate}&end=${endDate}`,
        }),
    }),
})

export const {
    useGetSalesReportByDateQuery,
    useGetSalesReportByProductQuery,
    useGetSalesReportByCategoryQuery,
    useGetSalesReportByOrderStatusQuery,
} = salesReportApi
