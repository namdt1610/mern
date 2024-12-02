import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

const Login = lazy(() => import('../pages/auth/Login'))
const Signup = lazy(() => import('../pages/auth/Register'))
const HomePage = lazy(() => import('../pages/home/HomePage'))
const Store = lazy(() => import('../pages/store/index'))
const ProductDetails = lazy(() => import('../pages/product/ProductDetails'))
const Cart = lazy(() => import('../pages/cart/index'))
const ErrorPage = lazy(() => import('../pages/other/404'))
const Checkout = lazy(() => import('../pages/checkout/index'))
const User = lazy(() => import('../pages/user/index'))

export default function ClientRoutes() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/" element={<HomePage />} />
                <Route path="store" element={<Store />} />
                <Route path="/:id" element={<ProductDetails />} />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <User />
                        </ProtectedRoute>
                    }
                />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </>
    )
}
