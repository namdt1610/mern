// AdminLayout.tsx
import React, { useContext } from 'react'
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
    LoginOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import { Layout, theme, Menu } from 'antd/lib'
import type { MenuProps } from 'antd/'
import { AuthContext } from '../../contexts/AuthContext'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import Breadcrumb from '../ui/breadcrumb'
import Footer from '../ui/Footer'

const { Header, Content, Sider } = Layout

export default function LayoutApp() {
    const { state } = useContext(AuthContext)
    const isLogin = state.user !== null
    console.log(state)

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const items1: MenuProps['items'] = [
        ...(isLogin
            ? [
                  {
                      key: 'logout',
                      label: <Link to="/logout">Logout</Link>,
                  },
              ]
            : []),
        {
            key: 'login',
            label: <Link to="/login">Login</Link>,
        },
    ]

    const items2: MenuProps['items'] = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'Dashboard',
            children: [
                ...(isLogin
                    ? [
                          {
                              key: '1-1',
                              label: (
                                  <Link to="/admin/dashboard/overview">
                                      Overview
                                  </Link>
                              ),
                          },
                          {
                              key: '1-2',
                              label: (
                                  <Link to="/admin/dashboard/analytics">
                                      Analytics
                                  </Link>
                              ),
                          },
                          {
                              key: '1-3',
                              label: (
                                  <Link to="/admin/dashboard/reports">
                                      Reports
                                  </Link>
                              ),
                          },
                      ]
                    : []),
            ],
        },
        {
            key: '2',
            icon: <LaptopOutlined />,
            label: 'Products',
            children: [
                {
                    key: '2-1',
                    label: <Link to="/admin/products">All Products</Link>,
                },
                {
                    key: '2-2',
                    label: (
                        <Link to="/admin/products/create">Add New Product</Link>
                    ),
                },
                {
                    key: '2-3',
                    label: (
                        <Link to="/admin/products/categories">Categories</Link>
                    ),
                },
                {
                    key: '2-4',
                    label: <Link to="/admin/products/brands">Brands</Link>,
                },
            ],
        },
        {
            key: '3',
            icon: <NotificationOutlined />,
            label: 'Suppliers',
            children: [
                {
                    key: '3-1',
                    label: <Link to="/suppliers">All Suppliers</Link>,
                },
                {
                    key: '3-2',
                    label: <Link to="/suppliers/create">Add New Supplier</Link>,
                },
                {
                    key: '3-3',
                    label: (
                        <Link to="/suppliers/reports">Supplier Reports</Link>
                    ),
                },
            ],
        },
        {
            key: '4',
            icon: <LaptopOutlined />,
            label: 'Inventory',
            children: [
                {
                    key: '4-1',
                    label: <Link to="/inventory/current">Current Stock</Link>,
                },
                {
                    key: '4-2',
                    label: (
                        <Link to="/inventory/stock-in-out">Stock In/Out</Link>
                    ),
                },
                {
                    key: '4-3',
                    label: (
                        <Link to="/inventory/reports">Inventory Reports</Link>
                    ),
                },
            ],
        },
        {
            key: '5',
            icon: <UserOutlined />,
            label: 'Users',
            children: [
                { key: '5-1', label: <Link to="/admin/users">All Users</Link> },
                {
                    key: '5-2',
                    label: <Link to="/admin/users/roles">User Roles</Link>,
                },
                {
                    key: '5-3',
                    label: <Link to="/users/permissions">Permissions</Link>,
                },
            ],
        },
        // Thêm Login và Logout vào cuối
        {
            key: '6',
            icon: <LoginOutlined />,
            label: <Link to="/login">Login</Link>,
        },
        {
            key: '7',
            icon: <LogoutOutlined />,
            label: <Link to="/logout">Logout</Link>,
        },
    ]
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </Layout>
    )
}
