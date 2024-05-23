import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
    const menuItems = [
        { href: '/admin', title: 'Home' },
        { href: '/admin/dashboard', title: 'Dashboard' },
        { href: '/admin/products', title: 'Products' },
        { href: '/admin/categories', title: 'Categories' },
        { href: '/admin/api', title: 'API' },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <div>
                <header className="bg-gray-200 text-black sticky top-0 h-14 flex justify-center items-center font-semibold uppercase">
                    Shoesify
                </header>
            </div>

            <div className="flex flex-col md:flex-row flex-1">
                <aside className="bg-gray-100 w-full md:w-60">
                    <nav>
                        <ul className="space-y-2">
                            {menuItems.map(({ href, title }) => (
                                <li className="m-2" key={title}>
                                    <NavLink
                                        to={href}
                                        className="text-black hover:text-blue-500"
                                        activeClassName="text-blue-500"
                                    >
                                        {title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
