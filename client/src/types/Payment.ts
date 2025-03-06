export interface Payment {
    _id: string
    orderId: string
    userId: string
    paymentMethodId: string
    amount: number // Số tiền thanh toán
    status: 'pending' | 'completed' | 'failed' // Trạng thái thanh toán
    paymentDate: string // Ngày thanh toán
    createdAt: string
    updatedAt: string
}
