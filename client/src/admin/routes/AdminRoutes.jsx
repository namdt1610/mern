import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Product from '../pages/products/index'
import Navbar from '../components/Navbar'

export default function AdminRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/products" element={<Product />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </>
    )
}
