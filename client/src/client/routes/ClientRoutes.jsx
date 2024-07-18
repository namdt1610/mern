import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Navbar from '../components/Navbar'
import Home from '../pages/home/Home'

export default function ClientRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home/>} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </>
    )
}
