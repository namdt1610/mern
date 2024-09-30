import './App.css'
import '../src/styles/global.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClientRoutes from './client/routes/ClientRoutes'
import AdminRoutes from './admin/routes/AdminRoutes.tsx'
import { AuthContextProvider } from './context/AuthContext'
import { ProductContextProvider } from './context/ProductContext'
import { CategoryContextProvider } from './context/CategoryContext'

const App = () => (
    <React.StrictMode>
        <AuthContextProvider>
            <ProductContextProvider>
                <CategoryContextProvider>
                    <Router>
                        <Routes>
                            <Route path="/*" element={<ClientRoutes />} />
                            <Route path="admin/*" element={<AdminRoutes />} />
                        </Routes>
                    </Router>
                </CategoryContextProvider>
            </ProductContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
