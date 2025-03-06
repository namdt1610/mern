export interface Review {
    _id: string
    userId: string
    productId: string
    rating: number // Ví dụ: Đánh giá từ 1 đến 5
    comment: string
    createdAt: string
    updatedAt: string
}
