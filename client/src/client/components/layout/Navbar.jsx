import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gray-100 py-4 ">
            <div className="container mx-auto">
                <ul className="flex items-center justify-around">
                    <li>
                        <Link to="store/men">Men</Link>
                    </li>
                    <li>
                        <Link to="store/women">Women</Link>
                    </li>
                    <li>
                        <Link to="store/kids">Kids</Link>
                    </li>
                    <li>
                        <Link to="store">Products</Link>
                    </li>
                    <li>
                        <Link to="cart">Cart</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
