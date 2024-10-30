import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-50 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <Link to={'/admin'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/admin/dashboard'}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to={'/admin/orders'}>Orders</Link>
                    </li>
                    <li>
                        <Link to={'/admin/products'}>Products</Link>
                    </li>
                    <li>
                        <Link to={'/admin/categories'}>Categories</Link>
                    </li>
                    <li>
                        <Link to={'/admin/users'}>Users</Link>
                    </li>
                    <li>
                        <Link to={'/admin/customers'}>Customers</Link>
                    </li>
                    <li>
                        <Link to={'/admin/orders'}>Orders</Link>
                    </li>
                    <li>
                        <Link to={'/admin/reviews'}>Reviews</Link>
                    </li>
                    <li>
                        <Link to={'/admin/settings'}>Settings</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
