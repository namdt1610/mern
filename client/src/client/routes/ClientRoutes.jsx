import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Home from '../pages/home'
import Men from '../pages/store/Men'
import Women from '../pages/store/Women'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Store from '../pages/store/index'

export default function ClientRoutes() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />

                {/* Store */}
                <Route path="store" element={<Store />} />
                <Route path="store/men" element={<Men />} />
                <Route path="store/women" element={<Women />} />

                <Route path="/*" element={<h1>404 Not Found</h1>} />
            </Routes>
            <Footer />
        </>
    )
}
