import { lazy } from 'react'
export const ProductImage = lazy(
    () => import('./components/ProductImage')
)
export const ProductInfo = lazy(
    () => import('./components/ProductInfo')
)
export const ProductReview = lazy(
    () => import('./components/ProductReview')
)
