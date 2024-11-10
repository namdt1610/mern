import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

const Login = lazy(() => import('../pages/auth/Login'))
const Signup = lazy(() => import('../pages/auth/Register'))
const Home = lazy(() => import('../pages/home'))
const Store = lazy(() => import('../pages/store/index'))
const ProductDetails = lazy(() => import('../pages/product/ProductDetails'))
const Cart = lazy(() => import('../pages/cart/index'))
const ErrorPage = lazy(() => import('../pages/other/404'))
const Checkout = lazy(() => import('../pages/checkout/index'))
const User = lazy(() => import('../pages/user/index'))

export default function ClientRoutes() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Home />} />
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
            </Suspense>
            <Footer />
        </>
    )
}
