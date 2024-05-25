import React from 'react'
import Header from '../../components/Header'

const Register = () => {
    return (
        <>
            <Header />
            <div>
                <div>
                    <form onSubmit={() => {}}>
                        <h4 className="text-2xl mb-7">Register</h4>
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box"
                        />
                        <input
                            type="password"
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
export default Register
