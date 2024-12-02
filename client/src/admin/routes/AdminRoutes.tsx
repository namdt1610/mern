import React, { Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import routesConfig from './routesConfig'
import Cookies from 'js-cookie'
import { setUser } from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

// Kiểu của payload trong token
interface DecodedToken {
    email: string
    id: string
    role: string
}

export default function AdminRoutes() {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = Cookies.get('user') // Lấy token từ cookie
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token) // Giải mã token
                if (decoded) {
                    // Lưu thông tin user vào Redux store
                    dispatch(
                        setUser({
                            user: {
                                _id: decoded.id,
                                email: decoded.email,
                                role: decoded.role,
                                avatar: '',
                                name: '',
                                status: 'active',
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                            },
                            token,
                        })
                    )
                }
            } catch (error) {
                console.error('Token is invalid or expired', error)
            }
        }
    }, [dispatch])

    const renderRoutes = (routes: typeof routesConfig) =>
        routes.map(
            (
                {
                    path,
                    element: Element,
                    children,
                    protected: isProtected,
                    index,
                },
                idx
            ) => {
                const routeElement = isProtected ? (
                    <ProtectedRoute>
                        <Element />
                    </ProtectedRoute>
                ) : (
                    <Element />
                )

                return children ? (
                    <Route key={idx} path={path} element={routeElement}>
                        {renderRoutes(children)}{' '}
                        {/* Đệ quy để render các route con */}
                    </Route>
                ) : (
                    <Route
                        key={idx}
                        path={path}
                        element={routeElement}
                        index={index}
                    />
                )
            }
        )

    return (
        <Suspense
            fallback={
                <div className="min-w-screen min-h-screen flex items-center justify-center">
                    <Spin size="large" />
                </div>
            }
        >
            <Routes>{renderRoutes(routesConfig)}</Routes>
        </Suspense>
    )
}
