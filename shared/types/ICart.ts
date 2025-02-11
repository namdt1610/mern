import { IProduct } from './IProduct'

export interface CartDetails {
    product: Pick<IProduct, '_id' | 'name' | 'price' | 'imageUrl'>
    quantity: number
}

export interface ICart {
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
