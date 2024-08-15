import { Link } from 'react-router-dom'
import React, { useState } from 'react'

const Men = () => {
    const [openDropdowns, setOpenDropdowns] = useState({
        size: false,
        gender: false,
        color: false,
        price: false,
        technology: false,
    })
    const toggleDropdown = (dropdown) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown],
        }))
    }

    const genders = ['Male', 'Female', 'Kids']
    const sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
    const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White']
    const prices = [
        '0-500',
        '500-1000',
        '1000-1500',
        '1500-2000',
        '2000-2500',
        '2500-3000',
    ]
    const technologies = ['Fresh Foam', 'Fuel Cell']

    return (
        <>
            <div className="flex">
                <div className="left-col bg-gray-100 w-1/4">
                    <div className="m-4">
                        <button
                            className="text-gray-600 hover:text-black"
                            onClick={() => toggleDropdown('size')}
                        >
                            Size
                        </button>
                        {openDropdowns.size && (
                            <div className="dropdown mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                                {sizes.map((size, index) => (
                                    <div className="border border-gray-300 rounded-md">
                                        <a
                                            key={index}
                                            href="/"
                                            className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                        >
                                            {size}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="m-4">
                        <button
                            className="text-gray-600 hover:text-black"
                            onClick={() => toggleDropdown('gender')}
                        >
                            Gender
                        </button>
                        {openDropdowns.gender && (
                            <div className="dropdown mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                                {genders.map((gender, index) => (
                                    <div className="border-gray">
                                        <a
                                            key={index}
                                            href="/"
                                            className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                        >
                                            {gender}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="m-4 ">
                        <button
                            className="text-gray-600 hover:text-black"
                            onClick={() => toggleDropdown('color')}
                        >
                            Color
                        </button>
                        {openDropdowns.color && (
                            <div className="dropdown mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                                {colors.map((color, index) => (
                                    <div className="border-gray">
                                        <a
                                            key={index}
                                            href="/"
                                            className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                        >
                                            {color}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="m-4 ">
                        <button
                            className="text-gray-600 hover:text-black"
                            onClick={() => toggleDropdown('price')}
                        >
                            Price
                        </button>
                        {openDropdowns.price && (
                            <div className="dropdown  mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                                {prices.map((price, index) => (
                                    <div className="border-gray">
                                        <a
                                            key={index}
                                            href="/"
                                            className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                        >
                                            {price}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="m-4 ">
                        <button
                            className="text-gray-600 hover:text-black"
                            onClick={() => toggleDropdown('technology')}
                        >
                            Technology
                        </button>
                        {openDropdowns.technology && (
                            <div className="dropdown mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                                {technologies.map((technology, index) => (
                                    <div className="border-gray">
                                        <a
                                            key={index}
                                            href="/"
                                            className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                        >
                                            {technology}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="main-content gap-2 w-1/2">
                    <div className="breadcrumb flex m-2">
                        <a href="/" className="no-underline text-black">
                            Home
                        </a>
                        <span className="mx-2">/</span>
                        <a href="/" className="no-underline text-black">
                            Store
                        </a>
                        <span className="mx-2">/</span>
                        <a href="/" className="no-underline text-black">
                            Men
                        </a>
                    </div>
                    <div className="flex my-2">
                        <h1 className="text-2xl font-semibold m-2">Filter</h1>
                        <select className="m-2 p-2 rounded-lg shadow-lg bg-gray-100">
                            <option value="all">All</option>
                            <option value="popular">Popular</option>
                            <option value="decrease">Decreasing Price</option>
                            <option value="increase">Increasing Price</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {Array.from(Array(9)).map((_, index) => (
                            <Link
                                to="/{index}"
                                key={index}
                                className="no-underline p-2 rounded-lg shadow-lg bg-gray-100 min-h-48 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                            >
                                <div className="h-48 bg-gray-200 mb-2 rounded-lg shadow-lg">
                                    {/* Phần hình ảnh */}
                                    <img
                                        src={`https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2fb6ff59-aca1-4f1f-a836-0888d4f119a6/v2k-run-shoes-zJV8TV.png`}
                                        alt={`Product ${index + 1}`}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-lg">
                                    {/* Phần thông tin giày */}
                                    <h3 className="text-lg font-semibold mb-2 text-black">
                                        Product {index + 1}
                                    </h3>
                                    <p className="text-gray-600">
                                        Thông tin về giày...
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="side-bar-right bg-gray-100 w-1/4">
                    <ul className="mt-4">
                        <li className="py-2">
                            <Link>
                                <picture></picture>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Men
