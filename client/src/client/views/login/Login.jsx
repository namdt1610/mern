import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import PasswordInput from '../../components/Inputs/PasswordInput'

const Login = () => {
    return (
        <>
            <Header />
            <div className="flex items-center justify-center mt-28 ">
                <div className='w-96 border rounded-3xl bg-white px-7 py-10'>
                    <form onSubmit={() => {}}>
                        <h4 className="text-2xl mb-7">Login</h4>
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box"
                        />

                        <PasswordInput />

                        <button type="submit" className="btn-primary">
                            Login
                        </button>
                        <p className="text-sm text-center mt-4">
                            Not a member?{' '}
                            <Link to="/register" className="underline text-primary">
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
