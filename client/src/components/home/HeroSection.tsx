import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
    return (
        <div className="hero-section border">
            <div className="hero-2-image">
                <img
                    className="object-cover w-full h-full"
                    loading="lazy"
                    src="./img/574.gif"
                    alt=""
                />
            </div>
            <div className="hero-2-content flex flex-col items-center justify-center my-10">
                <h1 className="text-4xl font-bold">New Balance 574</h1>
                <p className="m-4">
                    New Balance 574 is the most iconic sneaker in the New
                    Balance family. The 574 is a clean and classic die cut EVA
                    runner that utilizes ENCAP cushioning technology.
                </p>
                <Link className="btn btn-outline" to="/574">
                    Shop Now
                </Link>
            </div>
        </div>
    )
}
