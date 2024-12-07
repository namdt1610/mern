import React, { useState, useEffect } from 'react'
import { Layout, Menu, Button } from 'antd/'
import {
    HomeOutlined,
    BookFilled,
    BookOutlined,
    AudioOutlined,
    AudioFilled,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'

const { Header } = Layout

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
        link: '/book',
        icon: <BookFilled />,
    },
    {
        key: '3',
        label: 'Ebook',
        link: '/ebook',
        icon: <BookOutlined />,
    },
    {
        key: '4',
        label: 'Audio Book',
        link: '/audio-book',
        icon: <AudioOutlined />,
    },
    {
        key: '5',
        label: 'Podcast',
        link: '/podcast',
        icon: <AudioFilled />,
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
                    defaultSelectedKeys={['2']}
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
