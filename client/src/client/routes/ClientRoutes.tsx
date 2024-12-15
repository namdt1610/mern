import React, {lazy, Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import {Spin} from 'antd'

const Login = lazy(() => import('../pages/auth/Login'))
const Signup = lazy(() => import('../pages/auth/Register'))
const HomePage = lazy(() => import('../pages/home/HomePage'))
const Store = lazy(() => import('../pages/store/StoreIndex'))
const ErrorPage = lazy(() => import('../pages/other/404'))
const Checkout = lazy(() => import('../pages/checkout/index'))
const User = lazy(() => import('../pages/user/index'))
const ProductDetails = lazy(() => import('../pages/store/ProductDetails'))

export default function ClientRoutes() {
    return (
        <Suspense
            fallback={
                <Spin
                    fullscreen
                    percent={'auto'}
                    tip={'Loading'}
                    size="large"
                ></Spin>
            }
        >
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/" element={<HomePage />} />
                <Route path="books" element={<Store />} />
                <Route path="/:id" element={<ProductDetails />} />
                <Route
                    path="/cart"
                    element={<ProtectedRoute>{/* <Cart /> */}</ProtectedRoute>}
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
        </Suspense>
    )
}
