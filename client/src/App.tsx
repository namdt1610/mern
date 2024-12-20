import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ClientRoutes from './client/routes/ClientRoutes'
import AdminRoutes from './admin/routes/AdminRoutes'
import 'antd'

export default function App() {
    return (
        <Routes>
            <Route path="/*" element={<ClientRoutes />} />
            <Route path="admin/*" element={<AdminRoutes />} />
        </Routes>
    )
}
