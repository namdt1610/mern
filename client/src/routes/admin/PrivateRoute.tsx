import { Navigate, useLocation } from 'react-router-dom'
import { getUserFromCookie } from '@/utils/useGetToken'
import { usePermissions } from '@/hooks/usePermissions'
import { RouteConfig } from '@/routes/admin/routesConfig'
import React from 'react'

interface PrivateRouteProps {
    children: React.ReactNode
    permissions?: RouteConfig['permissions']
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    children,
    permissions,
}) => {
    const location = useLocation()
    const userRole = getUserFromCookie()?.role

    // If no permissions required, just check if user is logged in
    if (!permissions) {
        if (!userRole) {
            return (
                <Navigate
                    to="/admin/login"
                    state={{ from: location }}
                    replace
                />
            )
        }
        return <>{children}</>
    }

    // If permissions are required, check both authentication and authorization
    const { canView } = usePermissions(permissions)

    if (!userRole) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />
    }

    if (!canView) {
        return <Navigate to="/admin/403" replace />
    }

    return <>{children}</>
}

export default PrivateRoute
