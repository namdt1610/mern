import { Product } from './Product'

export interface Inventory {
    _id: string
    product: Product
    quantity: number
    status: string
    createdAt: Date
    updatedAt: Date
}
