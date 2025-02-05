// Sidebar.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Menu, Space } from 'antd'
import type { MenuProps } from 'antd'
import {
    BarChartOutlined,
    BookOutlined,
    BoxPlotOutlined,
    GiftOutlined,
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MenuOutlined,
    OrderedListOutlined,
    PayCircleOutlined,
    StarOutlined,
    UserOutlined,
} from '@ant-design/icons'

interface SidebarProps {
    collapsed: boolean
    setCollapsed: (value: boolean) => void
    onLogout: () => void
}

export default function Sidebar({
    collapsed,
    setCollapsed,
    onLogout,
}: SidebarProps) {
    const location = useLocation()
    const currentPath = location.pathname

    const items2: MenuProps['items'] = [
        {
            key: 'dashboard',
            icon: <BarChartOutlined />,
            label: <Link to="/admin">Dashboard</Link>,
            children: [
                {
                    key: 'dashboard-overview',
                    label: <Link to="/admin">Overview</Link>,
                },
                {
                    key: 'dashboard-analytics',
                    label: <Link to="/admin/analytics">Analytics</Link>,
                },
                {
                    key: 'dashboard-reports',
                    label: <Link to="/admin/reports">Reports</Link>,
                },
            ],
        },
        {
            key: 'categories',
            icon: <MenuOutlined />,
            label: <Link to="/admin/categories">Categories</Link>,
            children: [
                {
                    key: 'categories-all',
                    label: <Link to="/admin/categories">All Categories</Link>,
                },
                {
                    key: 'categories-new',
                    label: (
                        <Link to="/admin/categories/new">Add New Category</Link>
                    ),
                },
                {
                    key: 'categories-reports',
                    label: (
                        <Link to="/admin/categories/reports">
                            Category Reports
                        </Link>
                    ),
                },
            ],
        },
        {
            key: 'inventory',
            icon: <BoxPlotOutlined />,
            label: <Link to="/admin/inventory">Inventory</Link>,
            children: [
                {
                    key: 'inventory-all',
                    label: <Link to="/admin/inventory">Current Stock</Link>,
                },
                {
                    key: 'inventory-stock-in-out',
                    label: (
                        <Link to="/admin/inventory/stock-in-out">
                            Stock In/Out
                        </Link>
                    ),
                },
                {
                    key: 'inventory-reports',
                    label: (
                        <Link to="/admin/inventory/reports">
                            Inventory Reports
                        </Link>
                    ),
                },
            ],
        },
        {
            key: 'warehouses',
            icon: <HomeOutlined />,
            label: <Link to="/admin/warehouses">Warehouses</Link>,
            children: [
                {
                    key: 'warehouses-all',
                    label: <Link to="/admin/warehouses">All Warehouses</Link>,
                },
                {
                    key: 'warehouses-new',
                    label: (
                        <Link to="/admin/warehouses/new">
                            Add New Warehouse
                        </Link>
                    ),
                },
                {
                    key: 'warehouses-reports',
                    label: (
                        <Link to="/admin/warehouses/reports">
                            Warehouse Reports
                        </Link>
                    ),
                },
            ],
        },
        {
            key: 'orders',
            icon: <OrderedListOutlined />,
            label: <Link to="/admin/orders">Orders</Link>,
            children: [
                {
                    key: 'orders-all',
                    label: <Link to="/admin/orders">All Orders</Link>,
                },
                {
                    key: 'orders-new',
                    label: <Link to="/admin/orders/new">Add New Order</Link>,
                },
                {
                    key: 'orders-reports',
                    label: (
                        <Link to="/admin/orders/reports">Order Reports</Link>
                    ),
                },
            ],
        },
        {
            key: 'payment-methods',
            icon: <PayCircleOutlined />,
            label: <Link to="/admin/payment-methods">Payment Methods</Link>,
            children: [
                {
                    key: 'payment-methods-all',
                    label: (
                        <Link to="/admin/payment-methods">
                            All Payment Methods
                        </Link>
                    ),
                },
                {
                    key: 'payment-methods-new',
                    label: (
                        <Link to="/admin/payment-methods/new">
                            Add New Payment Method
                        </Link>
                    ),
                },
                {
                    key: 'payment-methods-reports',
                    label: (
                        <Link to="/admin/payment-methods/reports">
                            Payment Method Reports
                        </Link>
                    ),
                },
            ],
        },
        {
            key: 'products',
            icon: <BookOutlined />,
            label: <Link to="/admin/products">Products</Link>,
            children: [
                {
                    key: 'products-all',
                    label: <Link to="/admin/products">All Products</Link>,
                },
                {
                    key: 'products-new',
                    label: (
                        <Link to="/admin/products/new">Add New Product</Link>
                    ),
                },
                {
                    key: 'products-reports',
                    label: (
                        <Link to="/admin/products/reports">
                            Product Reports
                        </Link>
                    ),
                },
            ],
        },
        {
            key: 'promotions',
            icon: <GiftOutlined />,
            label: <Link to="/admin/promotions">Promotions</Link>,
            children: [
                {
                    key: 'promotions-all',
                    label: <Link to="/admin/promotions">All Promotions</Link>,
                },
                {
                    key: 'promotions-new',
                    label: (
                        <Link to="/admin/promotions/new">
                            Add New Promotion
                        </Link>
                    ),
                },
                {
                    key: 'promotions-reports',
                    label: (
                        <Link to="/admin/promotions/reports">
                            Promotion Reports
                        </Link>
                    ),
                },
            ],
        },
        {
            key: 'reviews',
            icon: <StarOutlined />,
            label: <Link to="/admin/reviews">Reviews</Link>,
            children: [
                {
                    key: 'reviews-all',
                    label: <Link to="/admin/reviews">All Reviews</Link>,
                },
                {
                    key: 'reviews-new',
                    label: <Link to="/admin/reviews/new">Add New Review</Link>,
                },
                {
                    key: 'reviews-reports',
                    label: (
                        <Link to="/admin/reviews/reports">Review Reports</Link>
                    ),
                },
            ],
        },
        {
            key: 'suppliers',
            icon: <HomeOutlined />,
            label: <Link to="/admin/suppliers">Suppliers</Link>,
            children: [
                {
                    key: 'suppliers-all',
                    label: <Link to="/admin/suppliers">All Suppliers</Link>,
                },
                {
                    key: 'suppliers-new',
                    label: (
                        <Link to="/admin/suppliers/new">Add New Supplier</Link>
                    ),
                },
                {
                    key: 'suppliers-reports',
                    label: (
                        <Link to="/admin/suppliers/reports">
                            Supplier Reports
                        </Link>
                    ),
                },
            ],
        },
        {
            key: 'user',
            icon: <UserOutlined />,
            label: <Link to="/admin/users">Users</Link>,
            children: [
                {
                    key: 'user-all',
                    label: <Link to="/admin/users">All Users</Link>,
                },
                {
                    key: 'user-reports',
                    label: <Link to="/admin/users/reports">User Reports</Link>,
                },
            ],
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: onLogout,
        },
        {
            key: 'login',
            icon: <LoginOutlined />,
            label: <Link to="/admin/login">Login</Link>,
        },
    ]

    return (
        <div className="flex flex-col h-svh">
            <Space direction="vertical" className="items-center p-4">
                <Link to="/admin/dashboard">
                    <img
                        src="/img/logo_dtn.png"
                        alt="logo"
                        className="w-8 h-8 transition-all duration-200"
                        style={{
                            marginLeft: collapsed ? '8px' : '0',
                            transform: collapsed ? 'scale(0.8)' : 'scale(1)',
                        }}
                    />
                </Link>
                <Button
                    icon={
                        collapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )
                    }
                    onClick={() => setCollapsed(!collapsed)}
                />
            </Space>
            <Menu
                mode="inline"
                selectedKeys={[currentPath]}
                defaultOpenKeys={[]}
                style={{
                    flex: 1,
                }}
                items={items2}
            />
        </div>
    )
}
