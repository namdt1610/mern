import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from '../pages/home/index'
import Home from '../pages/products/index'
import Navbar from '../components/Navbar'

export default function AdminRoutes() {
    return (
        <>
            <Navbar />
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="categories" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="api" element={<Home />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </>
    )
}
