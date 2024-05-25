import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'

const Login = () => {
    return (
        <>
            <Header />
            <div className="flex items-center justify-center mt-28">
                <div>
                    <form onSubmit={() => {}}>
                        <h4 className="text-2xl mb-7">Login</h4>
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box"
                        />
                        <button type="submit" className="btn-primary">
                            Login
                        </button>
                        <p className="text-sm text-center mt-4">
                            Not a member?{' '}
                            <Link to="/register" className="text-blue-500">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
