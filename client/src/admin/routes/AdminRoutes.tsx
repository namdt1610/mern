import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import routesConfig from './routesConfig'

// Kiểu của payload trong token
interface DecodedToken {
    email: string
    id: string
    role: string
}

export default function AdminRoutes() {
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
