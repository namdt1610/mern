import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import OrderStatusPage from '@/pages/client/order/OrderStatusPage'
import OrderDetailsPage from '@/pages/client/order/OrderDetailsPage'
const LoginPage = lazy(
    () => import('@/pages/client/auth/Login/LoginClientPage')
)
const RegisterPage = lazy(() => import('@/pages/client/auth/Register/Register'))
import HomePage from '@/pages/client/home/HomePage' // Load ngay lập tức

const StorePage = lazy(() => import('@/pages/client/store/StorePage'))
const NotFound = lazy(() => import('@/pages/client/other/404'))
const CheckoutPage = lazy(() => import('@/pages/client/checkout/CheckoutPage'))
const UserProfilePage = lazy(
    () => import('@/pages/client/user/UserProfilePage')
)
const BookDetailsPage = lazy(
    () => import('@/features/client/productDetails/ProductDetails')
)
const CartPage = lazy(() => import('@/pages/client/cart/CartContainer'))

// Import Skeleton Components
import UserProfileSkeleton from '@/components/client/skeletons/UserProfileSkeleton'
import CheckoutSkeleton from '@/components/client/skeletons/CheckoutSkeleton'
import StoreSkeleton from '@/components/client/skeletons/StoreSkeleton'

export default function ClientRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
                path="/login"
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginPage />
                    </Suspense>
                }
            />

            <Route
                path="/register"
                element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <RegisterPage />
                    </Suspense>
                }
            />

            <Route
                path="books"
                element={
                    <Suspense fallback={<StoreSkeleton />}>
                        <StorePage />
                    </Suspense>
                }
            />

            <Route
                path="/profile"
                element={
                    <Suspense fallback={<UserProfileSkeleton />}>
                        <UserProfilePage />
                    </Suspense>
                }
            />

            <Route
                path="/checkout/:id"
                element={
                    <Suspense fallback={<CheckoutSkeleton />}>
                        <CheckoutPage />
                    </Suspense>
                }
            />

            <Route
                path="/cart/:id"
                element={
                    <Suspense fallback={<div>Loading Cart...</div>}>
                        <CartPage />
                    </Suspense>
                }
            />

            <Route path="/orders" element={<OrderStatusPage />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
            <Route path="/:id" element={<BookDetailsPage />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    )
}
