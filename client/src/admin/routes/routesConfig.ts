import { lazy, LazyExoticComponent } from 'react'
//* routes/routesConfig.ts

export interface RouteConfig {
    path: string
    element: LazyExoticComponent<React.ComponentType<any>>
    protected?: boolean
    children?: RouteConfig[]
    index?: boolean
    requiredRole?: 'admin' | 'user' | 'both'
}

const authRoutes: RouteConfig[] = [
    { path: 'login', element: lazy(() => import('../pages/auth/Login/Login')) },
    {
        path: 'register',
        element: lazy(() => import('../pages/auth/Register/Register')),
    },
]

const adminRoutes: RouteConfig = {
    path: '/',
    element: lazy(() => import('../../components/layout/admin/AdminLayout')),
    protected: true,
    requiredRole: 'admin',
    children: [
        {
            index: true,
            element: lazy(() => import('../pages/dashboard/AdminDashboard')),
            path: '',
        },
        {
            path: 'products',
            element: lazy(() => import('../pages/products/Product')),
        },
        {
            path: 'products/:id',
            element: lazy(() => import('../pages/products/ProductDetails')),
        },
        {
            path: 'products/new',
            element: lazy(() => import('../pages/products/ProductNew')),
        },
        {
            path: 'categories',
            element: lazy(() => import('../pages/categories/Category')),
        },
        {
            path: 'categories/:id',
            element: lazy(() => import('../pages/categories/CategoryDetails')),
        },
        {
            path: 'categories/new',
            element: lazy(() => import('../pages/categories/CategoryNew')),
        },
        {
            path: 'users',
            element: lazy(() => import('../pages/users/User')),
        },
        {
            path: 'users/:id',
            element: lazy(() => import('../pages/users/UserDetails')),
        },
    ],
}

const fallbackRoutes: RouteConfig[] = [
    { path: '*', element: lazy(() => import('../pages/result/404')) },
]

const routesConfig: RouteConfig[] = [
    ...authRoutes,
    adminRoutes,
    ...fallbackRoutes,
]

export default routesConfig
