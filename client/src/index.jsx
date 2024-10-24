import './index.css'

import React from 'react'
import ClientRoutes from './client/routes/ClientRoutes'
import AdminRoutes from './admin/routes/AdminRoutes.tsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ProductContextProvider } from './context/ProductContext'
import { CategoryContextProvider } from './context/CategoryContext'
import { ThemeProvider } from './context/ThemeContext'

const App = () => (
    <React.StrictMode>
        <ThemeProvider>
            <AuthContextProvider>
                <ProductContextProvider>
                    <CategoryContextProvider>
                        <Router>
                            <Routes>
                                <Route path="/*" element={<ClientRoutes />} />
                                <Route
                                    path="admin/*"
                                    element={<AdminRoutes />}
                                />
                            </Routes>
                        </Router>
                    </CategoryContextProvider>
                </ProductContextProvider>
            </AuthContextProvider>
        </ThemeProvider>
    </React.StrictMode>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
