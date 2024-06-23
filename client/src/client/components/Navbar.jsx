import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
    }
    return (
        <header className="bg-black ">
            <nav className="uppercase flex justify-between p-5 text-white">
                <div className="mx-5">
                    <Link to="/">
                        <h1>Shoesify</h1>
                    </Link>
                </div>
                <div className="flex">
                    <button className="mx-4 uppercase outline" onClick={handleClick}>
                        Logout
                    </button>
                    <Link className="mx-4" to="/login">
                        Login
                    </Link>
                    <Link className="mx-4" to="/signup">
                        Signup
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
