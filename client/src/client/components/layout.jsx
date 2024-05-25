import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
    const testMenuItems = [
        { href: '/', title: 'Home' },
        { href: 'store', title: 'Store' },
        { href: 'about', title: 'About' },
        { href: 'contact', title: 'Contact' },
        { href: 'api', title: 'API' },
        { href: 'admin', title: 'Admin' },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Add 1 more div tag to wrap the header */}
            
            <Header />

            {/* Navigation */}
            <div className="flex flex-col md:flex-row flex-1">
                <aside className="bg-gray-100 w-full md:w-60">
                    <nav>
                        <ul className="space-y-2">
                            {testMenuItems.map(({ href, title }) => (
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

                {/* Main content */}
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
