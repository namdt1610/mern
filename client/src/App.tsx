import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ClientRoutes from './routes/client/ClientRoutes'
import AdminRoutes from './routes/admin/AdminRoutes'

export default function App() {
    return (
        <Routes>
            <Route path="/*" element={<ClientRoutes />} />
            <Route path="admin/*" element={<AdminRoutes />} />
        </Routes>
    )
}
