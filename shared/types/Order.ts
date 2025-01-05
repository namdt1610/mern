export interface OrderItems {
    product: string
    image: string
    name: string
    quantity: number
    price: number
}

export interface Order {
    _id: string
    user: string
    orderItems: OrderItems[]
    shippingAddress: {
        address: string
        ward: string
        district: string
        province: string
    }
    paymentMethod: string
    paymentResult?: {
        _id?: string
        status?: string
        update_time?: string
        email_address?: string
    } | null
    itemsPrice: number
    taxPrice: number
    shippingPrice: number
    totalPrice: number
    status: string
    isPaid: boolean
    paidAt?: Date
    isDelivered: boolean
    deliveredAt?: Date
    createdAt: Date
}

export interface CreateOrderRequest {
    user: string
    orderItems: Array<{
        name: string
        quantity: number
        image: string
        price: number
        product: string
    }>
    shippingAddress: {
        address: string
        ward: string
        district: string
        province: string
    }
    paymentMethod: string
    itemsPrice: number
    taxPrice: number
    shippingPrice: number
    totalPrice: number
}
