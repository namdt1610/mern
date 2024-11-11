import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/index'
import Layout from '../../components/layout/AdminLayout'
import Error from '../pages/result/404'
import Dashboard from '../pages/dashboard/index'
import Product from '../pages/products/index'
import CreateProductForm from '../pages/products/create'
import ProductDetailsForm from '../pages/products/read'
import Category from '../pages/categories/index'
import CreateCategoryForm from '../pages/categories/create'
import Users from '../pages/users/index'
import UserDetail from '../pages/userDetails/UserDetails'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import Login from '../pages/auth/Login/Login'
import Register from '../../admin/pages/auth/Register/Register.Index'

export default function AdminRoutes() {
    return (
        <>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="dashboard/overview"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

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

                    {/* Users */}
                    <Route path="users" element={<Users />} />
                    <Route path="users/:id" element={<UserDetail />} />

                    {/* Customers */}
                    {/* <Route path="customers" element={<Customers />} />

                    {/* Orders */}
                    {/* <Route path="orders" element={<Orders />} /> */}

                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </>
    )
}
