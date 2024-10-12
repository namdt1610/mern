import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Home from '../pages/home'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Store from '../pages/store/index'
import Cart from '../pages/cart/index'
import ErrorPage from '../pages/other/404'
import ProductContainer from '../pages/product/ProductContainer'

export default function ClientRoutes() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />

                {/* Store */}
                <Route path="store" element={<Store />} />

                <Route path="/:id" element={<ProductContainer />} />

                {/* Cart */}
                <Route path="/cart" element={<Cart />} />

                {/* Error Page */}
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </>
    )
}
