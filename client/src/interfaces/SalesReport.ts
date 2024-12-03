export interface SalesReport {
    totalSales: number // Tổng doanh thu
    totalOrders: number // Tổng số đơn hàng
    totalProductsSold: number // Tổng số sản phẩm đã bán
    startDate: string // Ngày bắt đầu
    endDate: string // Ngày kết thúc
    salesByCategory: Array<{
        categoryId: string
        categoryName: string
        totalSales: number
        totalOrders: number
    }>
    salesByProduct: Array<{
        productId: string
        productName: string
        totalSales: number
        totalOrders: number
    }>
    salesByOrderStatus: Array<{
        status: string
        totalSales: number
        totalOrders: number
    }>
}
