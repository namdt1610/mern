import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../../components/loading'
import { fetchProducts } from '../../../hooks/useProductActions'
import { ProductContext } from '../../../context/ProductContext'

const Men = () => {
    const { state, dispatch } = useContext(ProductContext)

    useEffect(() => {
        fetchProducts(dispatch)
    }, [dispatch])

    const products = state.products || []

    if (products.length === 0) {
        return <div className="text-center">Không có sản phẩm nào.</div>
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
            {state.loading && <Loading />}
            <div className="main-content gap-2">
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
                    <h1 className="text-2xl font-semibold m-2">Sort</h1>
                    <select className="m-2 p-2 rounded-lg shadow-lg bg-gray-100">
                        <option value="all">All</option>
                        <option value="popular">Popular</option>
                        <option value="decrease">Decreasing Price</option>
                        <option value="increase">Increasing Price</option>
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {products.map((product) => (
                        <Link
                            to={`/${product._id}`}
                            key={product.id}
                            className="no-underline p-2 rounded-lg shadow-lg bg-gray-100 min-h-48 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                        >
                            <div className="h-48 bg-gray-200 mb-2 rounded-lg shadow-lg">
                                <img
                                    src={`http://localhost:8888${product.imageUrl}`}
                                    alt={product.name}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h3 className="text-lg font-semibold mb-2 text-black">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600">
                                    {product.description}
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
        </>
    )
}

export default Men
