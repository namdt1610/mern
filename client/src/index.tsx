import './index.css'

import React from 'react'
import ClientRoutes from './client/routes/ClientRoutes'
import AdminRoutes from './admin/routes/AdminRoutes'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.js'
import { ProductContextProvider } from './contexts/ProductContext'
import { CategoryContextProvider } from './contexts/CategoryContext'
import { ThemeProvider } from './contexts/ThemeContext.js'
import { ApiProvider } from './contexts/ApiContext'
import { Api } from '@mui/icons-material'

const App = () => (
    <React.StrictMode>
        <ApiProvider>
            <ThemeProvider>
                <AuthContextProvider>
                    <ProductContextProvider>
                        <CategoryContextProvider>
                            <Router>
                                <Routes>
                                    <Route
                                        path="/*"
                                        element={<ClientRoutes />}
                                    />
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
        </ApiProvider>
    </React.StrictMode>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
