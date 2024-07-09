import React from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClientRoutes from './client/routes/ClientRoutes'
import AdminRoutes from './admin/routes/AdminRoutes'
import { AuthContextProvider } from './context/AuthContext'
import { ProductsContextProvider } from './context/ProductContext'

const App = () => (
    <React.StrictMode>
        <AuthContextProvider>
            <ProductsContextProvider>
                <Router>
                    <Routes>
                        <Route path="/*" element={<ClientRoutes />} />
                        <Route path="admin/*" element={<AdminRoutes />} />
                    </Routes>
                </Router>
            </ProductsContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
