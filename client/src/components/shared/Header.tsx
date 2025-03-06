import React, { useEffect, useState } from 'react'
import { Badge, Button, Dropdown, Layout, Menu } from 'antd'
import {
    AudioFilled,
    AudioOutlined,
    BookFilled,
    BookOutlined,
    HomeOutlined,
    LoginOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    MenuOutlined,
    BellOutlined,
    SearchOutlined,
    WarningFilled,
} from '@ant-design/icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getUserFromCookie } from '@/utils/useGetToken'
import { motion, AnimatePresence } from 'framer-motion'
import * as Sentry from '@sentry/react'

const { Header } = Layout

export default function HeaderComponent() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const user = getUserFromCookie()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        const handleResize = () => setIsMobile(window.innerWidth < 768)

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const navItems = [
        { key: 'home', label: 'Home', icon: <HomeOutlined />, link: '/' },
        { key: 'books', label: 'Books', icon: <BookFilled />, link: '/books' },
        {
            key: 'ebooks',
            label: 'Ebooks',
            icon: <BookOutlined />,
            link: '/ebooks',
        },
        {
            key: 'audiobooks',
            label: 'Audio Books',
            icon: <AudioOutlined />,
            link: '/audio-books',
        },
        {
            key: 'podcasts',
            label: 'Podcasts',
            icon: <AudioFilled />,
            link: '/podcasts',
        },
    ]

    const userMenuItems = [
        {
            key: 'profile',
            label: 'Profile',
            icon: <UserOutlined />,
            link: `/profile`,
        },
        {
            key: 'orders',
            label: 'My Orders',
            icon: <ShoppingCartOutlined />,
            link: `/orders/${user?._id}`,
        },
        { key: 'logout', label: 'Logout', icon: <LoginOutlined /> },
    ]

    const menuItems = navItems.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        onClick: () => handleMenuClick(item.link),
    }))

    const handleMenuClick = (path: string) => navigate(path)

    return (
        <Header
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-sm'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src="/img/logo_dtn.png"
                        alt="logo"
                        className="h-12 w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <div className="flex-1 mx-8">
                        <Menu
                            mode="horizontal"
                            selectedKeys={[location.pathname]}
                            className="border-none bg-transparent"
                            items={menuItems}
                        >
                            {/* {navItems.map((item) => (
                                <Menu.Item
                                    key={item.key}
                                    icon={item.icon}
                                    onClick={() => handleMenuClick(item.link)}
                                    className="!text-gray-600 hover:!text-blue-600"
                                >
                                    {item.label}
                                </Menu.Item>
                            ))} */}
                        </Menu>
                    </div>
                )}

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Search Button (Mobile) */}
                    {isMobile && (
                        <Button
                            type="text"
                            icon={<SearchOutlined />}
                            onClick={() => navigate('/search')}
                        />
                    )}

                    {/* Notifications */}
                    <Badge count={3} size="small">
                        <Button
                            type="text"
                            icon={<BellOutlined />}
                            className="flex items-center justify-center"
                        />
                    </Badge>

                    {/* Cart */}
                    {user && (
                        <Badge count={2} size="small">
                            <Button
                                type="text"
                                icon={<ShoppingCartOutlined />}
                                onClick={() => navigate(`/cart/${user._id}`)}
                                className="flex items-center justify-center"
                            />
                        </Badge>
                    )}

                    {/* User Menu */}
                    {user ? (
                        <Dropdown
                            menu={{
                                items: userMenuItems.map((item) => ({
                                    key: item.key,
                                    label: (
                                        <span className="flex items-center gap-2">
                                            {item.icon}
                                            {item.label}
                                        </span>
                                    ),
                                    onClick: () =>
                                        handleMenuClick(item?.link ?? ''),
                                })),
                            }}
                            trigger={['click']}
                        >
                            <Button
                                type="text"
                                icon={<UserOutlined />}
                                className="flex items-center gap-2"
                            >
                                {!isMobile && <span>{user.name}</span>}
                            </Button>
                        </Dropdown>
                    ) : (
                        <>
                            <Button
                                type="primary"
                                icon={<LoginOutlined />}
                                onClick={() => navigate('/login')}
                            >
                                {!isMobile && 'Login'}
                            </Button>
                            <Button
                                type="primary"
                                icon={<WarningFilled />}
                                onClick={async () => {
                                    throw new Error('Lỗi test')
                                }}
                            >
                                {!isMobile && 'Break the app'}
                            </Button>
                        </>
                    )}

                    {/* Mobile Menu */}
                    {isMobile && (
                        <Dropdown
                            menu={{
                                items: navItems.map((item) => ({
                                    key: item.key,
                                    label: (
                                        <span className="flex items-center gap-2">
                                            {item.icon}
                                            {item.label}
                                        </span>
                                    ),
                                    onClick: () => handleMenuClick(item.link),
                                })),
                            }}
                            trigger={['click']}
                        >
                            <Button type="text" icon={<MenuOutlined />} />
                        </Dropdown>
                    )}
                </div>
            </div>
        </Header>
    )
}
