import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const LeftColumn = () => {
    const [openDropdowns, setOpenDropdowns] = useState({
        size: false,
        gender: false,
        color: false,
        price: false,
        technology: false,
    })

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
            <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium flex justify-between items-center">
                    Size
                    <ChevronDown />
                </div>
                <div className="collapse-content flex flex-wrap">
                    {sizes.map((size, i) => (
                        <div className="m-1" key={i}>
                            <Link to="/" className="btn btn-outline">
                                {size}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                    Genders
                </div>
                <div className="collapse-content flex flex-wrap">
                    {genders.map((gender, i) => (
                        <div className="m-1" key={i}>
                            <Link to="/" className="btn btn-outline">
                                {gender}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">Colors</div>
                <div className="collapse-content flex flex-wrap">
                    {colors.map((color, i) => (
                        <div className="m-1" key={i}>
                            <Link to="/" className="btn btn-outline">
                                {color}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">Price</div>
                <div className="collapse-content flex flex-wrap">
                    {prices.map((price, i) => (
                        <div className="m-1" key={i}> 
                            <Link to="/" className="btn btn-outline">
                                {price}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                    Technologies
                </div>
                <div className="collapse-content flex flex-wrap">
                    {technologies.map((technology, i) => (
                        <div className="m-1" key={i}>
                            <Link to="/" className="btn btn-outline">
                                {technology}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftColumn
