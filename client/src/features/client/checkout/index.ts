import { lazy } from 'react'
export const CartInfo = lazy(
    () => import('@/features/client/checkout/components/CartInfo')
)
export const DeliveryInfo = lazy(
    () => import('@/features/client/checkout/components/DeliveryInfo')
)
