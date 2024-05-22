import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClientRoutes from './client/routes/ClientRoutes'
import AdminRoutes from './admin/routes/AdminRoutes'
import { createRoot } from 'react-dom/client'
import './index.css'

const App = () => (
    <Router>
        <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/*" element={<ClientRoutes />} />
        </Routes>
    </Router>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
