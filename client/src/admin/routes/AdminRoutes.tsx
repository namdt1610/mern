import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import routesConfig, { RouteConfig } from './routesConfig'

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

    return <Routes>{renderRoutes(routesConfig)}</Routes>
}
