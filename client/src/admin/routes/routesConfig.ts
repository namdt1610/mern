import { lazy, LazyExoticComponent } from 'react'

//* routes/routesConfig.ts

type UserRole = 'admin' | 'user'

export interface RouteConfig {
    path: string
    element: LazyExoticComponent<React.ComponentType<any>>
    protected?: boolean
    requiredRole?: 'admin' | 'user' | 'both'
    children?: RouteConfig[]
    index?: boolean
    permissions?: {
        view: UserRole[]
        edit?: UserRole[]
        delete?: UserRole[]
    }
}

export const authRoutes: RouteConfig[] = [
    { path: 'login', element: lazy(() => import('../pages/auth/Login/Login')) },
    {
        path: 'register',
        element: lazy(() => import('../pages/auth/Register/Register')),
    },
]

const adminRoutes: RouteConfig = {
    path: '',
    element: lazy(() => import('../../components/admin/layout/AdminLayout')),
    protected: true,
    permissions: {
        view: ['admin', 'user'],
    },
    children: [
        //* Dashboard routes
        {
            index: true,
            path: '',
            element: lazy(() => import('../pages/dashboard/AdminDashboard')),
            permissions: {
                view: ['admin', 'user'],
                edit: ['admin'],
            },
        },
        //* Product routes
        {
            path: 'products',
            element: lazy(() => import('../pages/products/Product')),
            permissions: {
                view: ['admin', 'user'],
                edit: ['admin'],
                delete: ['admin'],
            },
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
            path: 'products/reports',
            element: lazy(() => import('../pages/products/ProductReports')),
        },
        //* Category routes
        {
            path: 'categories/new',
            element: lazy(() => import('../pages/categories/CategoryNew')),
        },
        {
            path: 'categories/reports',
            element: lazy(() => import('../pages/categories/CategoryReports')),
        },
        {
            path: 'categories/:id',
            element: lazy(() => import('../pages/categories/CategoryDetails')),
        },
        {
            path: 'categories',
            element: lazy(() => import('../pages/categories/Category')),
        },
        //* Customer routes
        {
            path: 'customers',
            element: lazy(() => import('../pages/customers/Customer')),
        },
        //* Inventory routes
        {
            path: 'inventory',
            element: lazy(() => import('../pages/inventory/InventoryPage')),
            permissions: {
                view: ['admin', 'user'],
                edit: ['admin'],
                delete: ['admin'],
            },
        },
        {
            path: 'inventory/:id',
            element: lazy(() => import('../pages/inventory/InventoryDetails')),
        },
        {
            path: 'inventory/stock-in-out',
            element: lazy(() => import('../pages/inventory/InventoryImport')),
        },
        {
            path: 'inventory/activity',
            element: lazy(() => import('../pages/inventory/InventoryActivity')),
        },
        //* Order routes
        {
            path: 'orders',
            element: lazy(() => import('../pages/orders/AdminOrdersPage')),
        },
        {
            path: 'orders/:id',
            element: lazy(() => import('../pages/orders/OrderDetailsPage')),
        },
        {
            path: 'orders/new',
            element: lazy(() => import('../pages/orders/OrderNewPage')),
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
        {
            path: 'users/reports',
            element: lazy(() => import('../pages/users/UserReports')),
        },
        { path: '*', element: lazy(() => import('../pages/result/404')) },
    ],
}

const fallbackRoutes: RouteConfig[] = [
    { path: '*', element: lazy(() => import('../pages/result/404')) },
]

export default adminRoutes

