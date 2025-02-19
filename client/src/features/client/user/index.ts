import { lazy } from 'react'
export const OrderStatus = lazy(
    () => import('@/features/client/user/components/OrderStatus')
)
export const FavoriteItems = lazy(
    () => import('@/features/client/user/components/FavoriteItems')
)
export const ProfileSettings = lazy(
    () => import('@/features/client/user/components/ProfileSettings')
)
export const UserInfoCard = lazy(
    () => import('@/components/admin/UserInfoCard')
)
