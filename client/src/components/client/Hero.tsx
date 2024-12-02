import React from 'react'
import { Input, Button } from 'antd/'

const { Search } = Input
export default function Hero() {
    return (
        <div className="grid grid-cols-3">
            {/* Phần bên trái */}
            <div className="p-7 flex flex-col justify-center">
                <p className="text-5xl p-4 font-bold text-gray-800">
                    New & Trending
                </p>
                <p className="p-4 text-gray-600">
                    Explore new worlds from authors
                </p>
                <Search
                    className="p-4"
                    placeholder="Titles, authors, or topics"
                />
            </div>

            {/* Phần giữa */}
            <div className="p-7 text-center hover:scale-105 transition-transform duration-300">
                <p className="text-lg text-gray-800">Best seller of the week</p>
                <img
                    className="rounded-3xl  shadow-lg"
                    src="/img/beethoven.webp"
                    alt="Beethoven"
                />
                <Button className="mt-4" type="primary">
                    View All
                </Button>
            </div>

            {/* Phần bên phải */}
            <div className="grid grid-cols-2 p-7 items-center gap-4">
                <div className="text-center">
                    <p className="font-medium text-gray-800">Top 2</p>
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
                    <p className="font-medium text-gray-800">Top 3</p>
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
