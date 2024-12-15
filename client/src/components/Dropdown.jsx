import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import '../styles/Dropdown.css'

const Dropdown = ({ title, items }) => {
    const [open, setOpen] = useState(false)

    const toggleDropdown = () => {
        setOpen(!open)
    }
    return (
        <div className="dropdown ">
            <button
                onClick={toggleDropdown}
                className="dropdown-toggle text-black hover:text-blue-500"
            >
                {title}
            </button>
            <ul
                className={`dropdown-menu ${
                    open ? 'open' : 'closed'
                } left-0 w-48 bg-white shadow-lg`}
            >
                {items.map((item) => (
                    <li key={item.title} className="">
                        <NavLink
                            to={item.href}
                            className="text-black hover:text-blue-500"
                            // activeClassName="text-blue-500"
                            onClick={() => setOpen(false)}
                        >
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown
