import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import routesConfig, { RouteConfig } from './routesConfig'
import LoadingError from '@/components/LoadingError'

export default function AdminRoutes() {
    const renderRoutes = (routes: RouteConfig[]) =>
        routes.map(({ path, element: Element, children, index }, idx) => {
            return children ? (
                <Route key={path || idx} path={path} element={<Element />}>
                    {renderRoutes(children)}
                </Route>
            ) : (
                <Route
                    key={path || idx}
                    path={path}
                    element={<Element />}
                    index={index}
                />
            )
        })

    return (
        <Suspense fallback={<LoadingError isLoading={true} error={null} />}>
            <Routes>{renderRoutes(routesConfig)}</Routes>
        </Suspense>
    )
}
