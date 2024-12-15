import {lazy, LazyExoticComponent} from 'react'

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
    element: lazy(() => import('../../components/admin/layout/AdminLayout')),
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
        //* Category routes
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
            path: 'categories/reports',
            element: lazy(() => import('../pages/categories/CategoryReports')),
        },
        //* Customer routes
        {
            path: 'customers',
            element: lazy(() => import('../pages/customers/Customer')),
        },
        //* Inventory routes
        {
            path: 'inventory',
            element: lazy(() => import('../pages/inventory/Inventory')),
        },
        {
            path: 'inventory/:id',
            element: lazy(() => import('../pages/inventory/InventoryDetails')),
        },
        {
            path: 'inventory/new',
            element: lazy(() => import('../pages/inventory/InventoryNew')),
        },
        //* Order routes
        {
            path: 'orders',
            element: lazy(() => import('../pages/orders/Order')),
        },
        {
            path: 'orders/:id',
            element: lazy(() => import('../pages/orders/OrderDetails')),
        },
        {
            path: 'orders/new',
            element: lazy(() => import('../pages/orders/OrderNew')),
        },
        //* Payment methods routes
        {
            path: 'payment-methods',
            element: lazy(() => import('../pages/payments/PaymentMethods')),
        },
        {
            path: 'payment-methods/:id',
            element: lazy(
                () => import('../pages/payments/PaymentMethodsDetails')
            ),
        },
        {
            path: 'payment-methods/new',
            element: lazy(() => import('../pages/payments/PaymentMethodsNew')),
        },

        //* User routes
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
