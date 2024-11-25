import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../../components/layout/AdminLayout'
import Error from '../pages/result/404'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import { Spin } from 'antd/'

const Dashboard = lazy(() => import('../pages/dashboard/AdminDashboard'))
const Product = lazy(() => import('../pages/products/Product'))
const CreateProduct = lazy(() => import('../pages/products/ProductNew'))
const ProductDetails = lazy(() => import('../pages/products/ProductDetails'))
const Category = lazy(() => import('../pages/categories/Category'))
const CategoryDetails = lazy(
    () => import('../pages/categories/CategoryDetails')
)
const CategoryNew = lazy(() => import('../pages/categories/CategoryNew'))
const Users = lazy(() => import('../pages/users/User'))
const UserDetail = lazy(() => import('../pages/users/UserDetails'))
const Login = lazy(() => import('../pages/auth/Login/Login'))
const Register = lazy(() => import('../pages/auth/Register/Register'))

export default function AdminRoutes() {
    return (
        <Suspense
            fallback={
                <div className="min-w-screen min-h-screen flex items-center justify-center">
                    <Spin size="large" />
                </div>
            }
        >
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />

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
        </Suspense>
    )
}
