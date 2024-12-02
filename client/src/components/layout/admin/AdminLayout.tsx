// AdminLayout.tsx
import React, { useContext, useState } from 'react'
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
    LoginOutlined,
    LogoutOutlined,
    BarChartOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons'
import { Layout, theme, Menu, Button, Card } from 'antd/lib'
import type { MenuProps } from 'antd/'
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import Breadcrumb from '../../ui/breadcrumb'
import Footer from '../../ui/Footer'
import useAuthApi from '../../../hooks/Auth/useAuthApiBeta'
import UserInfoCard from '../../admin/UserInfoCard'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../features/authSlice'
import { RootState } from '../../../store'

const { Content, Sider } = Layout

export default function LayoutApp() {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const isLogin = user !== null
    // console.log('Is user logged in:', isLogin)
    const location = useLocation()
    const currentPath = location.pathname
    const [collapsed, setCollapsed] = useState(false)

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const onLogout = () => {
        dispatch(logout())
    }

    if (!isLogin) {
        return <Navigate to="/admin/login" />
    }

    const items2: MenuProps['items'] = [
        {
            key: '1',
            icon: <BarChartOutlined />,
            label: <Link to="/admin">Dashboard</Link>,
            children: [
                ...(isLogin
                    ? [
                          {
                              key: '/admin',
                              label: <Link to="/admin">Overview</Link>,
                          },
                          {
                              key: '1-2',
                              label: (
                                  <Link to="/admin/analytics">Analytics</Link>
                              ),
                          },
                          {
                              key: '1-3',
                              label: <Link to="/admin/reports">Reports</Link>,
                          },
                      ]
                    : []),
            ],
        },
        {
            key: '2',
            icon: <LaptopOutlined />,
            label: <Link to="/admin/products">Products</Link>,
            children: [
                {
                    key: '/admin/products',
                    label: <Link to="/admin/products">All Products</Link>,
                },
                {
                    key: '/admin/products/new',
                    label: (
                        <Link to="/admin/products/new">Add New Product</Link>
                    ),
                },
                {
                    key: '/admin/categories',
                    label: <Link to="/admin/categories">Categories</Link>,
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
            label: <Link to="/admin/users">Users</Link>,
            children: [
                {
                    key: '/admin/users',
                    label: <Link to="/admin/users">All Users</Link>,
                },
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

        ...(isLogin
            ? [
                  {
                      key: '6',
                      icon: <LogoutOutlined />,
                      label: 'Logout',
                      onClick: onLogout,
                  },
              ]
            : [
                  {
                      key: '7',
                      icon: <LoginOutlined />,
                      label: <Link to="/admin/login">Login</Link>,
                  },
              ]),
    ]
    return (
        <>
            <Layout>
                <Sider
                    width={'250'}
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
                            <Card className="card-border-color h-full">
                                <Breadcrumb />
                            </Card>
                            <UserInfoCard />
                        </div>

                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </>
    )
}
