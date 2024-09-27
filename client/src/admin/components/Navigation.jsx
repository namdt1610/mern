import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigation = () => {
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Link to="/admin">
                            <h1 className="text-3xl">Admin Panel</h1>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/admin">Dashboard</Nav.Link>
                            <Nav.Link href="/admin/products">Products</Nav.Link>
                            <Nav.Link href="/admin/categories">
                                Categories
                            </Nav.Link>
                            <Nav.Link href="/admin/suppliers">
                                Suppliers
                            </Nav.Link>
                            <Nav.Link href="/admin/orders">Orders</Nav.Link>
                            <Nav.Link href="/admin/invoices">Invoices</Nav.Link>
                            <Nav.Link href="/admin/customers">
                                Customers
                            </Nav.Link>
                            <Nav.Link href="/admin/users">Users</Nav.Link>
                            <Nav.Link href="/">Client Side</Nav.Link>

                            <NavDropdown
                                title="Dropdown"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <header>
                <nav className="uppercase flex items-center justify-between p-5 shadow">
                    <div className="mx-5 ">
                        <Link to="/admin">
                            <h1 className="text-3xl">Admin Panel</h1>
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
            </header> */}
        </>
    )
}

export default Navigation
