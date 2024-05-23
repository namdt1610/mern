import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from '../views/home/index'
import Home from '../views/products/index'
import Layout from '../components/layout'

export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="dashboard" element={<Home />} />
                <Route path="categories" element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="api" element={<Home />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    )
}
