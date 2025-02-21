import { getUserFromCookie } from '@/utils/useGetToken'
import { RouteConfig } from '@/routes/admin/routesConfig'

type UserRole = 'admin' | 'user'

export const usePermissions = (permissions?: RouteConfig['permissions']) => {
    const userRole = getUserFromCookie()?.role as UserRole | null

    if (!permissions || !userRole) {
        return { canView: false, canEdit: false, canDelete: false }
    }

    return {
        canView: permissions.view.includes(userRole),
        canEdit: permissions.edit?.includes(userRole) || false,
        canDelete: permissions.delete?.includes(userRole) || false,
    }
}
