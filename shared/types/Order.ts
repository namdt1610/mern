export interface Order {
    _id: string
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
        city: string
        postalCode: string
        country: string
    }
    paymentMethod: string
    paymentResult?: {
        id: string
        status: string
        update_time: string
        email_address: string
    }
    itemsPrice: number
    taxPrice: number
    shippingPrice: number
    totalPrice: number
    isPaid: boolean
    paidAt?: Date
    isDelivered: boolean
    deliveredAt?: Date
    createdAt: Date
}
