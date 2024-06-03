import React from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClientRoutes from './client/routes/ClientRoutes'
// import AdminRoutes from './admin/routes/AdminRoutes'
import { AuthContextProvider } from './context/AuthContext'

const App = () => (
    <React.StrictMode>
        <AuthContextProvider>
            <Router>
                <Routes>
                    {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
                    <Route path="/*" element={<ClientRoutes />} />
                </Routes>
            </Router>
        </AuthContextProvider>
    </React.StrictMode>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
