import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="text-black py-8">
            <div className="bg-black text-white py-4 flex items-center justify-center">
                <h5 className="mx-3">Before shopping, please</h5>
                <Link className="btn-primary" to="/login">
                    Login here
                </Link>
                <h5 className="mx-3">or</h5>
                <Link className="btn-primary" to="/signup">
                    Register here
                </Link>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-4">
                {/* Cột 1: Logo và mô tả */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">New Balance</h3>
                    <p>
                        Discover the latest styles and trends with New Balance.
                        Shop comfortable and durable footwear and apparel.
                    </p>
                </div>

                {/* Cột 2: Danh mục sản phẩm */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Products</h4>
                    <ul>
                        <li className="mb-2">
                            <a href="/" className="hover:underline">
                                Men’s Shoes
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/" className="hover:underline">
                                Women’s Shoes
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/" className="hover:underline">
                                Kid’s Shoes
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/" className="hover:underline">
                                Apparel
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Cột 3: Thông tin liên hệ */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                    <p>Email: support@newbalance.com</p>
                    <p>Phone: 1-800-123-4567</p>
                    <p>Address: 1234 Street Name, City, State, ZIP</p>
                </div>

                {/* Cột 4: Mạng xã hội */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                    <ul className="flex space-x-4">
                        <li>
                            <i className="fab fa-facebook-f"></i>
                            <a
                                href="https://facebook.com"
                                className="hover:text-white"
                            >
                                Facebook
                            </a>
                        </li>
                        <li>
                            <i className="fab fa-instagram"></i>
                            <a
                                href="https://instagram.com"
                                className="hover:text-white"
                            >
                                Instagram
                            </a>
                        </li>
                        <li>
                            <i className="fab fa-twitter"></i>
                            <a
                                href="https://twitter.com"
                                className="hover:text-white"
                            >
                                Twitter
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-8 border-t border-gray-700 pt-4">
                <p>&copy; 2024 New Balance. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
