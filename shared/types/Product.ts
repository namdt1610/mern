export interface Product {
    _id: string
    name: string
    price: number
    description: string
    imageUrl: string
    category: string
    createdAt: Date
    updatedAt: Date
    clickCount: number
    stock: number
    status: string
    sku: string
    isActive: boolean
    sold: number
    author: string
}
