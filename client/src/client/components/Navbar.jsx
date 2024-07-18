import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
    }
    return (
        <header>
            <nav className="uppercase flex items-center justify-between p-5 shadow">
                <div className="mx-5 ">
                    <Link to="/">
                        <h1 className="text-3xl">Browsify</h1>
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="mx-4 uppercase bg-orange-200 w-24 h-12 rounded-xl"
                        onClick={handleClick}
                    >
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
