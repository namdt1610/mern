import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import OrderStatusPage from '@/pages/client/order/OrderStatusPage'
import OrderDetailsPage from '@/pages/client/order/OrderDetailsPage'
import PrivateRoute from '@/routes/admin/PrivateRoute'

const LoginPage = lazy(
    () => import('@/pages/client/auth/Login/LoginClientPage')
)
const RegisterPage = lazy(() => import('@/pages/client/auth/Register/Register'))
const HomePage = lazy(() => import('@/pages/client/home/HomePage'))
const StorePage = lazy(() => import('@/pages/client/store/StorePage'))
const NotFound = lazy(() => import('@/pages/client/cart/CartPage'))
const CheckoutPage = lazy(() => import('@/pages/client/checkout/CheckoutPage'))
const User = lazy(() => import('@/pages/client/user/index'))
const BookDetailsPage = lazy(
    () => import('@/pages/client/store/ProductDetailsPage')
)
const CartPage = lazy(() => import('@/pages/client/cart/CartPage'))
const OrderPage = lazy(() => import('@/pages/client/order/OrderStatusPage'))

export default function ClientRoutes() {
    return (
        <Suspense
            fallback={
                <Spin
                    delay={500}
                    fullscreen
                    tip={'Loading'}
                    indicator={
                        <LoadingOutlined style={{ fontSize: 48 }} spin />
                    }
                    size="large"
                ></Spin>
            }
        >
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="books" element={<StorePage />} />

                <Route path="/:id" element={<BookDetailsPage />} />
                <Route path="/cart/:id" element={<>{<CartPage />}</>} />
                <Route
                    path="/checkout/:id"
                    element={
                        <>
                            <CheckoutPage />
                        </>
                    }
                />
                <Route path="/orders" element={<OrderStatusPage />} />
                <Route path="/order/:id" element={<OrderDetailsPage />} />
                <Route
                    path="/user"
                    element={
                        <PrivateRoute>
                            <User />
                        </PrivateRoute>
                    }
                />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}
