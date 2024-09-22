import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/index'
import Layout from '../../admin/components/Layout.jsx'

import Product from '../pages/products/index'
import CreateProductForm from '../pages/products/create.jsx'
import ProductDetailsForm from '../pages/products/read.jsx'

import Category from '../pages/categories/index.jsx'
import CreateCategoryForm from '../pages/categories/create.tsx'

export default function AdminRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    {/* Products */}
                    <Route path="products" element={<Product />} />
                    <Route path="products/page/:page" element={<Product />} />
                    <Route
                        path="products/create"
                        element={<CreateProductForm />}
                    />
                    <Route
                        path="products/:id"
                        element={<ProductDetailsForm />}
                    />

                    {/* Categories */}
                    <Route path="categories" element={<Category />} />
                    <Route
                        path="categories/create"
                        element={<CreateCategoryForm />}
                    />

                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Route>
            </Routes>
        </>
    )
}
