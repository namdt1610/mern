import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../views/home/Home'
import About from '../views/about/About'
import Contact from '../views/contact/Contact'
import Store from '../views/store/Store'
import API from '../views/blank/API'
import Login from '../views/login/Login'
import Register from '../views/login/Register'
import Layout from '../components/layout'

export default function ClientRoutes() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="store" element={<Store />} />
                <Route path="api" element={<API />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    )
}
