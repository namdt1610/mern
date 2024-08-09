import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ClientRoutes from './routes/ClientRoutes'

function App() {
    return (
        <Router>
            <ClientRoutes />
        </Router>
    )
}

export default App
