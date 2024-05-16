import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Home from './view/navigations/Home'
import About from './view/navigations/About'
import Contact from './view/navigations/Contact'
import Store from './view/navigations/Store'
import API from './view/navigations/API'
import Layout from './components/Layout'

function App() {
    return (
        <div className="App">
            <HashRouter>
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
            </HashRouter>
        </div>
    )
}

export default App
