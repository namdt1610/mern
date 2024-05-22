import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../views/home/Home'
import About from '../views/about/About'
import Contact from '../views/contact/Contact'
import Store from '../views/store/Store'
import API from '../views/blank/API'
import Layout from '../components/Layout'

export default function ClientRoutes() {
    return (
        <Routes>
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
