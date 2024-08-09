import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
    }
    return (
        <div className="nav-bar m-3">
            <nav className="uppercase flex items-center justify-around">
                <div className="logo w-[120px]">
                    <Link to="/">
                        <img className="" src="/img/logo.png" alt="" />
                    </Link>
                </div>
                <div className="mx-5 ">
                    <Link className="no-underline" to="/">
                        <h1 className="text-3xl text-black">
                            New Balance Outlet Store
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="mx-4 uppercase bg-green-200 w-24 h-12 rounded-xl"
                        onClick={handleClick}
                    >
                        Logout
                    </button>
                    <Link className="mx-4 no-underline" to="/login">
                        Login
                    </Link>
                    <Link className="mx-4 no-underline" to="/signup">
                        Signup
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
