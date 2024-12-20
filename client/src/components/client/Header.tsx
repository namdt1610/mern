import React, { useEffect, useState } from 'react'
import { Button, Layout, Menu } from 'antd/'
import {
    AudioFilled,
    AudioOutlined,
    BookFilled,
    BookOutlined,
    HomeOutlined,
    LoginOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { getUserFromCookie } from '@/utils/useGetToken'

const { Header } = Layout
const user = getUserFromCookie()
console.log(user)

const userId = user?._id || null
console.log('userId', userId)

const navItems = [
    {
        key: '1',
        label: 'Home',
        link: '/',
        icon: <HomeOutlined />,
    },
    {
        key: '2',
        label: 'Books',
        link: '/books',
        icon: <BookFilled />,
    },
    {
        key: '3',
        label: 'Ebooks',
        link: '/ebooks',
        icon: <BookOutlined />,
    },
    {
        key: '4',
        label: 'Audio Books',
        link: '/audio-books',
        icon: <AudioOutlined />,
    },
    {
        key: '5',
        label: 'Podcasts',
        link: '/podcasts',
        icon: <AudioFilled />,
    },
]

const accountItems = userId
    ? [
          {
              key: '6',
              label: 'Cart',
              link: `/cart/${userId}`,
              icon: <ShoppingCartOutlined />,
          },
          {
              key: '7',
              label: 'Logout',
              link: '/logout',
              icon: <LoginOutlined />,
          },
      ]
    : [
          {
              key: '8',
              label: 'Login',
              link: '/login',
              icon: <LoginOutlined />,
          },
          {
              key: '9',
              label: 'Register',
              link: '/register',
              icon: <LoginOutlined />,
          },
      ]

const Index = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false) // Trạng thái đăng nhập
    const [isScrolled, setIsScrolled] = useState(false)

    // Hàm xử lý điều hướng khi click vào menu item
    const handleMenuClick = (e: { key: string }) => {
        const allItems = [...navItems, ...accountItems] // Kết hợp cả 2 danh sách
        const selectedItem = allItems.find((item) => item.key === e.key)
        // console.log('Clicked item:', selectedItem)
        if (selectedItem?.link) {
            navigate(selectedItem.link) // Điều hướng tới link của item
        }
    }
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10) // Nếu cuộn xuống > 10px
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <Header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white shadow-md backdrop-blur-md'
                    : 'bg-transparent'
            }`}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
            }}
        >
            {/* Logo */}
            <div style={{ flex: 'none' }}>
                <Link to={'/'}>
                    <img
                        className="w-16 h-16"
                        src="/img/DTN.webp"
                        alt="logo"
                        loading="lazy"
                    />
                </Link>
            </div>

            {/* Menu chính */}
            <div style={{ flex: 1, margin: '0 20px', maxWidth: '70%' }}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    onClick={handleMenuClick}
                    items={navItems}
                    style={{
                        backgroundColor: 'transparent',
                        borderBottom: 'none',
                    }}
                />
            </div>

            {/* Menu tài khoản */}
            <div style={{ flex: 1 }}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    items={accountItems}
                    onClick={handleMenuClick}
                    style={{
                        backgroundColor: 'transparent',
                        borderBottom: 'none',
                        alignItems: 'end',
                        justifyContent: 'flex-end',
                    }}
                />
            </div>
        </Header>
    )
}

export default Index
