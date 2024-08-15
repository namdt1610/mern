const LeftColumn = () => {
    const [openDropdowns, setOpenDropdowns] = useState({
        size: false,
        gender: false,
        color: false,
        price: false,
        technology: false,
    })
    const toggleDropdown = (dropdown) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown],
        }))
    }

    const genders = ['Male', 'Female', 'Kids']
    const sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
    const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White']
    const prices = [
        '0-500',
        '500-1000',
        '1000-1500',
        '1500-2000',
        '2000-2500',
        '2500-3000',
    ]
    const technologies = ['Fresh Foam', 'Fuel Cell']
    return (
        <div className="left-column">
            <div className="left-col bg-gray-100 w-1/4">
                <div className="m-4">
                    <button
                        className="text-gray-600 hover:text-black"
                        onClick={() => toggleDropdown('size')}
                    >
                        Size
                    </button>
                    {openDropdowns.size && (
                        <div className="dropdown mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                            {sizes.map((size, index) => (
                                <div className="border border-gray-300 rounded-md">
                                    <a
                                        key={index}
                                        href="/"
                                        className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                    >
                                        {size}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="m-4">
                    <button
                        className="text-gray-600 hover:text-black"
                        onClick={() => toggleDropdown('gender')}
                    >
                        Gender
                    </button>
                    {openDropdowns.gender && (
                        <div className="dropdown mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                            {genders.map((gender, index) => (
                                <div className="border-gray">
                                    <a
                                        key={index}
                                        href="/"
                                        className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                    >
                                        {gender}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="m-4 ">
                    <button
                        className="text-gray-600 hover:text-black"
                        onClick={() => toggleDropdown('color')}
                    >
                        Color
                    </button>
                    {openDropdowns.color && (
                        <div className="dropdown mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                            {colors.map((color, index) => (
                                <div className="border-gray">
                                    <a
                                        key={index}
                                        href="/"
                                        className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                    >
                                        {color}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="m-4 ">
                    <button
                        className="text-gray-600 hover:text-black"
                        onClick={() => toggleDropdown('price')}
                    >
                        Price
                    </button>
                    {openDropdowns.price && (
                        <div className="dropdown  mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                            {prices.map((price, index) => (
                                <div className="border-gray">
                                    <a
                                        key={index}
                                        href="/"
                                        className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                    >
                                        {price}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="m-4 ">
                    <button
                        className="text-gray-600 hover:text-black"
                        onClick={() => toggleDropdown('technology')}
                    >
                        Technology
                    </button>
                    {openDropdowns.technology && (
                        <div className="dropdown mt-2 bg-white shadow-lg grid grid-cols-4 gap-2 p-2 rounded-md">
                            {technologies.map((technology, index) => (
                                <div className="border-gray">
                                    <a
                                        key={index}
                                        href="/"
                                        className="center text-gray-600 hover:text-black py-1 px-2 text-wrap"
                                    >
                                        {technology}
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LeftColumn
