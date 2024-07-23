import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Header from './Header'
import Dropdown from './Dropdown'

export default function Layout() {
    const MenuItems = [
        { href: '/admin', title: 'Dashboard' },
        {
            href: '/admin/products',
            title: 'Products',
            dropdownItems: [
                { href: '/admin/products', title: 'List Products' },
                { href: '/admin/products/create', title: 'Create Product' },
            ],
        },
        { href: '/admin/categories', title: 'Categories' },
        { href: '/admin/suppliers', title: 'Suppliers' },
        { href: '/api', title: 'API' },
        { href: '/', title: 'Client Side' },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Add 1 more div tag to wrap the header */}

            <Header />

            {/* Navigation */}
            <div className="flex flex-col md:flex-row flex-1">
                <aside className="w-full md:w-60 shadow-xl ">
                    <nav>
                        <ul className="space-y-2 m-4">
                            {MenuItems.map(({ href, title, dropdownItems }) => (
                                <li className="" key={title}>
                                    {dropdownItems ? (
                                        <Dropdown
                                            title={title}
                                            items={dropdownItems}
                                        />
                                    ) : (
                                        <NavLink
                                            to={href}
                                            className="text-black hover:text-blue-500"
                                            // activeClassName="text-blue-500"
                                        >
                                            {title}
                                        </NavLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 m-4 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
