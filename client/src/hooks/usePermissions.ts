import { getUserRoleFromCookie } from '@/utils/useGetToken'
import { RouteConfig } from '@/admin/routes/routesConfig'

type UserRole = 'admin' | 'user'

export const usePermissions = (permissions?: RouteConfig['permissions']) => {
    const userRole = getUserRoleFromCookie() as UserRole | null

    if (!permissions || !userRole) {
        return { canView: false, canEdit: false, canDelete: false }
    }

    return {
        canView: permissions.view.includes(userRole),
        canEdit: permissions.edit?.includes(userRole) || false,
        canDelete: permissions.delete?.includes(userRole) || false,
    }
}
