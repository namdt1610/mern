import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthApi from '../../../hooks/useAuthApiBeta'
import { useApiContext } from '../../../contexts/ApiContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const { login, isLoading, error } = useAuthApi()
    const { login } = useAuthApi()
    const { state } = useApiContext()

    const handleSubmit = () => {
        login({ email, password })
    }

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <img
                    src="https://images.unsplash.com/photo-1680204101678-01741d4d4a2a?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                    <h1 className="text-center text-3xl font-semibold mb-6">
                        Login
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="text-sm block text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="text-sm block text-gray-600"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Password"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                className="text-blue-500"
                            />
                            <label
                                htmlFor="remember"
                                className="text-gray-600 ml-2"
                            >
                                Remember Me
                            </label>
                        </div>
                        <div className="mb-6 text-blue-500">
                            <Link to="/">Forgot Password?</Link>
                        </div>
                        <button
                            disabled={state.loading}
                            type="submit"
                            className="bg-black text-white font-semibold rounded-md py-2 px-4 w-full"
                        >
                            Login
                        </button>
                        {state.error && (
                            <div className="error text-center m-5">
                                {state.error}
                            </div>
                        )}
                    </form>
                    <div className="mt-4 text-gray-500 text-sm text-center">
                        <p>
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-black hover:underline"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
