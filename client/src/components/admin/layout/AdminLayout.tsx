// AdminLayout.tsx
import React, { useState } from 'react'
import {
    BarChartOutlined,
    BookOutlined,
    BoxPlotOutlined,
    CustomerServiceOutlined,
    GiftOutlined,
    HomeOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuOutlined,
    MenuUnfoldOutlined,
    OrderedListOutlined,
    PayCircleOutlined,
    StarOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Button, Card, Layout, Menu, theme } from 'antd/lib'
import type { MenuProps } from 'antd/'
import { Link, Outlet, useLocation } from 'react-router-dom'
import UserInfoCard from '../../admin/UserInfoCard'

const { Content, Sider } = Layout

export default function LayoutApp() {
    const location = useLocation()
    const currentPath = location.pathname
    const [collapsed, setCollapsed] = useState(false)

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const onLogout = () => {}

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
            key: 'customers',
            icon: <CustomerServiceOutlined />,
            label: <Link to="/admin/customers">Customers</Link>,
            children: [
                {
                    key: 'customers-all',
                    label: <Link to="/admin/customers">All Customers</Link>,
                },
                {
                    key: 'customers-new',
                    label: (
                        <Link to="/admin/customers/new">Add New Customer</Link>
                    ),
                },
                {
                    key: 'customers-reports',
                    label: (
                        <Link to="/admin/customers/reports">
                            Customer Reports
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
        <>
            <Layout>
                <Sider
                    width={'auto'}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    breakpoint="lg"
                    // collapsedWidth="0"
                    style={{ background: '#f3f3f3', border: '1px solid' }}
                >
                    <div className="items-center justify-center flex flex-col pt-4">
                        <Link to={'/admin/dashboard'}>
                            <img
                                src="/img/logo_dtn.png"
                                alt="logo"
                                className="w-16 cursor-pointer"
                                loading="lazy"
                            />
                        </Link>

                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </div>
                    <Menu
                        mode="inline"
                        selectedKeys={[currentPath]}
                        defaultOpenKeys={[]}
                        style={{
                            background: '#f3f3f3',
                            fontSize: '1.25rem',
                            minHeight: '100vh',
                        }}
                        items={items2}
                    />
                </Sider>
                <Layout>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className="grid grid-cols-2 gap-4 ">
                            <Card className="card-border-color h-full"></Card>
                            <UserInfoCard />
                        </div>

                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
