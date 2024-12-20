import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Typography } from 'antd/'
import Marquee from 'react-fast-marquee'
import '@/styles/HoverEffect.css'

const { Search } = Input
const { Title, Text } = Typography

export default function Hero() {
    const nav = useNavigate()
    const placeholderTexts = [
        'Search for products...',
        'Find your favorite items...',
        'Discover new deals...',
        'Enter keywords to search...',
    ]

    const [currentText, setCurrentText] = useState('') // Chuỗi hiển thị hiện tại
    const [index, setIndex] = useState(0) // Chỉ số chuỗi trong mảng
    const [charIndex, setCharIndex] = useState(0) // Chỉ số ký tự trong chuỗi hiện tại
    const [isDeleting, setIsDeleting] = useState(false) // Đang xóa ký tự hay không
    const [isPaused, setIsPaused] = useState(false) // Dừng lại trước khi xóa

    useEffect(() => {
        const currentPlaceholder = placeholderTexts[index] // Lấy chuỗi hiện tại

        if (isPaused) {
            // Dừng lại một lúc trước khi xóa
            const pauseTimer = setTimeout(() => setIsPaused(false), 3000) // Chờ 1 giây
            return () => clearTimeout(pauseTimer)
        }

        const typingSpeed = isDeleting ? 1 : 100 // Tốc độ xóa nhanh hơn gõ
        const timer = setTimeout(() => {
            if (!isDeleting && charIndex < currentPlaceholder.length) {
                // Thêm ký tự
                setCurrentText(currentText + currentPlaceholder[charIndex])
                setCharIndex(charIndex + 1)
            } else if (isDeleting && charIndex > 0) {
                // Xóa ký tự
                setCurrentText(currentText.slice(0, -1))
                setCharIndex(charIndex - 1)
            } else if (!isDeleting && charIndex === currentPlaceholder.length) {
                // Chờ trước khi xóa
                setIsPaused(true)
                setIsDeleting(true)
            } else if (isDeleting && charIndex === 0) {
                // Chuyển sang chuỗi tiếp theo
                setIsDeleting(false)
                setIndex((index + 1) % placeholderTexts.length)
            }
        }, typingSpeed)

        return () => clearTimeout(timer) // Dọn dẹp bộ đếm thời gian
    }, [charIndex, isDeleting, index, currentText, placeholderTexts])

    return (
        <div className="grid grid-cols-3">
            {/* Phần bên trái */}
            <div className="p-8 flex flex-col justify-center">
                <Title level={1}>New and Trending</Title>
                <Text type="success">Explore new world from authors</Text>
                <Search size="large" placeholder={currentText} />
            </div>

            {/* Phần giữa */}
            <Link
                to={'/'}
                className="p-7 text-center hover:scale-105 transition-transform duration-300"
            >
                <Title level={1}>Best seller of the week</Title>
                <img
                    className="rounded-3xl  shadow-lg"
                    src="/img/beethoven.webp"
                    alt="Beethoven"
                />
            </Link>

            {/* Phần bên phải */}
            <div className="grid grid-cols-2 p-7 items-center gap-4">
                <div className="text-center">
                    <Title level={2}>Top 2</Title>

                    <img
                        className="h-3/4 rounded-md hover:scale-105 transition-transform duration-300 shadow-md"
                        src="/img/thuat-thao-tung.webp"
                        alt="Thuat thao tung"
                    />
                    <p className="text-sm mt-2 text-gray-600">
                        Thuat Thao Tung
                    </p>
                </div>
                <div className="text-center">
                    <Title level={3}>Top 3</Title>

                    <img
                        className="h-3/4 rounded-md hover:scale-105 transition-transform duration-300 shadow-md"
                        src="/img/dopamine.webp"
                        alt="Dopamine"
                    />
                    <p className="text-sm mt-2 text-gray-600">
                        Dopamine Nation
                    </p>
                </div>
            </div>
        </div>
    )
}
