import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './ui/layout/navbar'
import Sidebar from './ui/layout/sidebar'
import Breadcrumb from './ui/breadcrumb'

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className="container-fluid mx-auto flex">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="outlet p-4 flex-1">
                    <Breadcrumb />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
