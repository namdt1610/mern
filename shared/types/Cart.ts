import { Product } from './Product'

export interface CartDetails {
    product: Pick<Product, '_id' | 'name' | 'price' | 'imageUrl' | 'stock'>
    quantity: number
}

export interface Cart {
    user: string
    products: CartDetails[]
    totalQuantity: number
    totalPrice: number
    createdAt: Date
    updatedAt: Date
}

export interface AddToCartRequest {
    product_id: string
    quantity: number
}
