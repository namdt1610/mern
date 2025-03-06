export interface IProduct {
    _id: string
    name: string
    price: number
    description: string
    imageUrl?: string
    category: { name: string }
    createdAt: Date
    updatedAt: Date
    clickCount: number
    status: string
    sku: string
    isActive: boolean
    sold: number
    author: string
}
