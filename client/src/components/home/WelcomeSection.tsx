import React from 'react'
import { Link } from 'react-router-dom'

export default function WelcomeSection() {
    return (
        <div className="welcome-section border">
            <div className="content m-4 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">
                    Welcome to New Balance Outlet Store
                </h1>
                <p className="m-3">Sale up to 50% for all products</p>
                <Link to="/store" className="btn btn-outline">
                    Shop Now
                </Link>
            </div>
        </div>
    )
}
