import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../ui/layout/navbar'
import Sidebar from '../ui/layout/sidebar'
import Breadcrumb from '../ui/breadcrumb'
import Footer from '../ui/Footer'

export default function Layout() {
    return (
        <>
            <div className="container-fluid mx-auto flex">
                <div className="sidebar">
                    <Navbar />
                </div>
                <div className="outlet p-4 flex-1">
                    <Breadcrumb />
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    )
}
