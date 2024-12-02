import { lazy, LazyExoticComponent } from 'react'

interface RouteConfig {
    path: string
    element: LazyExoticComponent<React.ComponentType<any>>
    protected?: boolean
    children?: RouteConfig[]
    index?: boolean
}

const routesConfig: RouteConfig[] = [
    { path: 'login', element: lazy(() => import('../pages/auth/Login/Login')) },
    {
        path: 'register',
        element: lazy(() => import('../pages/auth/Register/Register')),
    },
    {
        path: '/',
        element: lazy(
            () => import('../../components/layout/admin/AdminLayout')
        ),
        // protected: true,

        children: [
            {
                index: true,
                element: lazy(
                    () => import('../pages/dashboard/AdminDashboard')
                ),
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
                element: lazy(
                    () => import('../pages/categories/CategoryDetails')
                ),
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
            { path: '*', element: lazy(() => import('../pages/result/404')) },
        ],
    },
]

export default routesConfig
