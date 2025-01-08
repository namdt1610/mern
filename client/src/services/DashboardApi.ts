import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface DashboardStats {
    totalOrders: number
    totalRevenue: number
    totalUsers: number
    totalProducts: number
    paidOrders: number
    pendingOrders: number
    monthlyRevenue: number
}

interface SalesData {
    _id: string
    sales: number
    orders: number
}

interface CategoryStats {
    _id: string
    name: string
    productCount: number
    totalSales: number
}

interface RecentOrder {
    _id: string
    user: {
        name: string
        email: string
    }
    totalAmount: number
    status: string
    createdAt: string
}

interface TopProduct {
    _id: string
    name: string
    price: number
    soldCount: number
    clickCount: number
}

export interface DashboardResponse {
    stats: DashboardStats
    recentOrders: RecentOrder[]
    topProducts: TopProduct[]
    salesData: SalesData[]
    categoryStats: CategoryStats[]
}

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Dashboard'],
    endpoints: (builder) => ({
        getDashboardStats: builder.query<DashboardResponse, void>({
            query: () => '/dashboard/stats',
            providesTags: ['Dashboard'],
        }),

        getRecentActivity: builder.query<
            {
                type: string
                message: string
                timestamp: string
                user?: string
            }[],
            void
        >({
            query: () => '/dashboard/activity',
            providesTags: ['Dashboard'],
        }),

        refreshDashboard: builder.mutation<void, void>({
            query: () => ({
                url: '/dashboard/refresh',
                method: 'POST',
            }),
            invalidatesTags: ['Dashboard'],
        }),
    }),
})

export const {
    useGetDashboardStatsQuery,
    useGetRecentActivityQuery,
    useRefreshDashboardMutation,
} = dashboardApi
