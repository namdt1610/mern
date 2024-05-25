import React from 'react'

const Header = () => {
    return (
        <div>
            <header className="bg-gray-200 text-black sticky top-0 px-4 h-14 flex justify-between items-center font-semibold uppercase">
                <div>
                    <a href="/">Shoesify</a>
                </div>
                <div>
                    <a href="login">Login</a>
                </div>
            </header>
        </div>
    )
}

export default Header
