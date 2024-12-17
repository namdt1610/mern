import React, { useEffect, useState } from 'react'
import { Button, Layout, Menu } from 'antd/'
import {
    AudioFilled,
    AudioOutlined,
    BookFilled,
    BookOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { getUserFromCookie } from '@/utils/useGetToken'

const { Header } = Layout
const user = getUserFromCookie()
console.log(user)

const userId = user?._id || null
console.log('userId', userId)

const items = [
    {
        key: '1',
        label: 'Home',
        link: '/',
        icon: <HomeOutlined />,
    },
    {
        key: '2',
        label: 'Book',
        link: '/books',
        icon: <BookFilled />,
    },
    {
        key: '3',
        label: 'Ebook',
        link: '/ebooks',
        icon: <BookOutlined />,
    },
    {
        key: '4',
        label: 'Audio Book',
        link: '/audio-books',
        icon: <AudioOutlined />,
    },
    {
        key: '5',
        label: 'Podcast',
        link: '/podcasts',
        icon: <AudioFilled />,
    },
    {
        key: 'cart',
        label: 'Cart',
        link: `/cart/${userId}`,    
        icon: <ShoppingCartOutlined />,
    },
]

const Index = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false) // Trạng thái đăng nhập
    const [isScrolled, setIsScrolled] = useState(false)

    // Hàm xử lý điều hướng khi click vào menu item
    const handleMenuClick = (e: { key: string }) => {
        const selectedItem = items.find((item) => item.key === e.key)
        if (selectedItem?.link) {
            navigate(selectedItem.link) // Điều hướng tới link của item
        }
    }

    // Hàm đăng xuất
    const handleLogout = () => {
        setIsLoggedIn(false)
    }

    // Hàm đăng nhập
    const handleLogin = () => {
        navigate('/login')
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
            className={`sticky top-0 z-10 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white shadow-md backdrop-blur-md'
                    : 'bg-transparent'
            }`}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={'/'}>
                    <img
                        className="w-16 h-16"
                        src="/img/DTN.webp"
                        alt="logo"
                        loading="lazy"
                    />
                </Link>

                <Menu
                    theme="light"
                    mode="horizontal"
                    onClick={handleMenuClick} // Thêm sự kiện onClick
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                        backgroundColor: 'transparent',
                    }}
                />
            </div>

            {/* Nút Login / Logout */}
            <div>
                {isLoggedIn ? (
                    <Button onClick={handleLogout} type="primary" danger>
                        Logout
                    </Button>
                ) : (
                    <Button onClick={handleLogin} type="primary">
                        Login
                    </Button>
                )}
            </div>
        </Header>
    )
}

export default Index
