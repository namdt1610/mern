import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import OrderStatusPage from '../pages/order/OrderStatusPage'
import OrderDetailsPage from '../pages/order/OrderDetailsPage'

const LoginPage = lazy(() => import('../pages/auth/Login/LoginClientPage'))
const RegisterPage = lazy(() => import('../pages/auth/Register/Register'))
const HomePage = lazy(() => import('../pages/home/HomePage'))
const StorePage = lazy(() => import('../pages/store/StorePage'))
const NotFound = lazy(() => import('../pages/other/404'))
const CheckoutPage = lazy(() => import('../pages/checkout/CheckoutPage'))
const User = lazy(() => import('../pages/user/index'))
const BookDetailsPage = lazy(() => import('../pages/store/ProductDetails'))
const CartPage = lazy(() => import('../pages/cart/CartPage'))
const OrderPage = lazy(() => import('../pages/order/OrderStatusPage'))

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
                        <ProtectedRoute>
                            <User />
                        </ProtectedRoute>
                    }
                />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}
