import React from 'react'
import { Button } from 'antd/'

export default function MainContent() {
    return (
        <div>
            {' '}
            {/* Main Content */}
            <div className="p-10 bg-white">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Featured Books
                </h2>
                <div className="grid grid-cols-4 gap-6">
                    {/* Mỗi item sách */}
                    {Array(8)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    className="rounded-lg w-full h-48 object-cover mb-4"
                                    src={
                                        `/img/book-${index + 1}.webp` ||
                                        `/img/beethoven.webp`
                                    }
                                    alt={`Book ${index + 1}`}
                                />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Book Title {index + 1}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Author Name
                                </p>
                                <Button className="mt-4 w-full" type="primary">
                                    Details
                                </Button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
