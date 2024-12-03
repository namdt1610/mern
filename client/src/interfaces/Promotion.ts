export interface Promotion {
    _id: string
    code: string // Mã khuyến mãi
    discountPercentage: number // Phần trăm giảm giá
    startDate: string // Ngày bắt đầu
    endDate: string // Ngày kết thúc
    description: string // Mô tả
    createdAt: string
    updatedAt: string
}
