import { Navigate, useLocation } from 'react-router-dom'
import { getUserRoleFromCookie } from '@/utils/useGetToken'
import { usePermissions } from '@/hooks/usePermissions'
import { RouteConfig } from '@/admin/routes/routesConfig'
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
    const userRole = getUserRoleFromCookie()

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
