import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Home from '../pages/home'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ClientRoutes() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />
            </Routes>
            <Footer />
        </>
    )
}
