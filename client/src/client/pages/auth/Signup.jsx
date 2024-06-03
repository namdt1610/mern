import React from 'react'
import { useState } from 'react'
import Header from '../../components/Header'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <>
            <Header />
            <div>
                <div>
                    <form className="signup" onSubmit={handleSubmit}>
                        <h4 className="text-2xl mb-7">Register</h4>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                            className="input-box"
                        />
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                            className="input-box"
                        />
                        <button type="submit" className="btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup
