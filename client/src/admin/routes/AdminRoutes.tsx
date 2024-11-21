import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/index'
import Layout from '../../components/layout/AdminLayout'
import Error from '../pages/result/404'

import Dashboard from '../pages/dashboard/AdminDashboard'

import Product from '../pages/products/Product'
import CreateProduct from '../pages/products/ProductNew'
import ProductDetails from '../pages/products/ProductDetails'

import Category from '../pages/categories/Category'
import CategoryDetails from '../pages/categories/CategoryDetails'
import CategoryNew from '../pages/categories/CategoryNew'

import Users from '../pages/users/User'
import UserDetail from '../pages/users/UserDetails'

import Login from '../pages/auth/Login/Login'
import Register from '../pages/auth/Register/Register'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

//! Sau này nhớ tách file này ra thành folder pages

export default function AdminRoutes() {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="products" element={<Product />} />
                    <Route path="products/:id" element={<ProductDetails />} />
                    <Route path="products/new" element={<CreateProduct />} />

                    <Route path="categories" element={<Category />} />
                    <Route
                        path="categories/:id"
                        element={<CategoryDetails />}
                    />
                    <Route path="categories/new" element={<CategoryNew />} />

                    <Route path="users" element={<Users />} />
                    <Route path="users/:id" element={<UserDetail />} />

                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </>
    )
}
