import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/ui/navbar'

export default function Layout() {
    return (
        <>
            <Navbar/>
            <Outlet />
        </>
    )
}
