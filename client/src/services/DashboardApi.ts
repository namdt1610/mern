import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface DashboardStats {
    totalOrders: number
    totalRevenue: number
    totalUsers: number
    paidOrders: number
    pendingOrders: number
}

interface RevenueData {
    month: string
    revenue: number
}

interface TopProduct {
    productId: string
    name: string
    totalSales: number
    revenue: number
}

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getDashboardStats: builder.query<DashboardStats, void>({
            query: () => '/dashboard/stats',
        }),

        getMonthlyRevenue: builder.query<RevenueData[], void>({
            query: () => '/dashboard/revenue/monthly',
        }),

        getTopProducts: builder.query<TopProduct[], void>({
            query: () => '/dashboard/products/top',
        }),

        getRecentActivity: builder.query<any[], void>({
            query: () => '/dashboard/activity/recent',
        }),
    }),
})

export const {
    useGetDashboardStatsQuery,
    useGetMonthlyRevenueQuery,
    useGetTopProductsQuery,
    useGetRecentActivityQuery,
} = dashboardApi
