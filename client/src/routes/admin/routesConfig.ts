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
    {
        path: 'login',
        element: lazy(() => import('../../pages/admin/auth/Login/Login')),
    },
    {
        path: 'register',
        element: lazy(() => import('../../pages/admin/auth/Register/Register')),
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
            element: lazy(
                () => import('../../pages/admin/dashboard/AdminDashboard/AdminDashboard')
            ),
            permissions: {
                view: ['admin', 'user'],
                edit: ['admin'],
            },
        },
        //* Product routes
        {
            path: 'products',
            element: lazy(() => import('../../pages/admin/products/ProductList')),
            permissions: {
                view: ['admin', 'user'],
                edit: ['admin'],
                delete: ['admin'],
            },
        },
        {
            path: 'products/:id',
            element: lazy(
                () => import('../../pages/admin/products/ProductDetails')
            ),
        },
        {
            path: 'products/new',
            element: lazy(
                () => import('../../pages/admin/products/ProductNew')
            ),
        },
        {
            path: 'products/reports',
            element: lazy(
                () => import('../../pages/admin/products/ProductReports')
            ),
        },
        //* Category routes
        {
            path: 'categories/new',
            element: lazy(
                () => import('../../pages/admin/categories/CategoryNew')
            ),
        },
        {
            path: 'categories/reports',
            element: lazy(
                () => import('../../pages/admin/categories/CategoryReports')
            ),
        },
        {
            path: 'categories/:id',
            element: lazy(
                () => import('../../pages/admin/categories/CategoryDetails')
            ),
        },
        {
            path: 'categories',
            element: lazy(
                () => import('../../pages/admin/categories/CategoryList')
            ),
        },
        //* Customer routes
        {
            path: 'customers',
            element: lazy(() => import('../../pages/admin/customers/Customer')),
        },
        //* Inventory routes
        {
            path: 'inventory',
            element: lazy(
                () => import('../../pages/admin/inventory/InventoryPage')
            ),
            permissions: {
                view: ['admin', 'user'],
                edit: ['admin'],
                delete: ['admin'],
            },
        },
        {
            path: 'inventory/:id',
            element: lazy(
                () => import('../../pages/admin/inventory/InventoryDetails')
            ),
        },
        {
            path: 'inventory/stock-in-out',
            element: lazy(
                () => import('../../pages/admin/inventory/InventoryImport')
            ),
        },
        {
            path: 'inventory/activity',
            element: lazy(
                () => import('../../pages/admin/inventory/InventoryActivity')
            ),
        },
        //* Order routes
        {
            path: 'orders',
            element: lazy(
                () => import('../../pages/admin/orders/AdminOrdersPage')
            ),
        },
        {
            path: 'orders/:id',
            element: lazy(
                () => import('../../pages/admin/orders/OrderDetailsPage')
            ),
        },
        {
            path: 'orders/new',
            element: lazy(
                () => import('../../pages/admin/orders/OrderNewPage')
            ),
        },
        //* Payment methods routes
        {
            path: 'payment-methods',
            element: lazy(
                () => import('../../pages/admin/payments/PaymentMethods')
            ),
        },
        {
            path: 'payment-methods/:id',
            element: lazy(
                () => import('../../pages/admin/payments/PaymentMethodsDetails')
            ),
        },
        {
            path: 'payment-methods/new',
            element: lazy(
                () => import('../../pages/admin/payments/PaymentMethodsNew')
            ),
        },

        //* User routes
        {
            path: 'users',
            element: lazy(() => import('../../pages/admin/users/User')),
        },
        {
            path: 'users/:id',
            element: lazy(() => import('../../pages/admin/users/UserDetails')),
        },
        {
            path: 'users/reports',
            element: lazy(() => import('../../pages/admin/users/UserReports')),
        },
        {
            path: '*',
            element: lazy(() => import('../../pages/admin/result/404')),
        },

        //* Warehouse routes
        {
            path: 'warehouses',
            element: lazy(
                () => import('../../pages/admin/warehouses/WarehouseAdminPage')
            ),
            permissions: {
                view: ['admin', 'user'],
                edit: ['admin'],
                delete: ['admin'],
            },
        },
        {
            path: 'users/:id',
            element: lazy(
                () => import('../../pages/admin/warehouses/WarehouseAdminPage')
            ),
        },
    ],
}

const fallbackRoutes: RouteConfig[] = [
    { path: '*', element: lazy(() => import('../../pages/admin/result/404')) },
]

export default adminRoutes
