import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Navbar from '../components/Navbar'

export default function ClientRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </>
    )
}
