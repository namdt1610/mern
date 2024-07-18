import React from 'react'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import '../styles/Slideshow.css'

const Slideshow = ({ images }) => {
    const properties = {
        duration: 2000,
        transitionDuration: 500,
        infinite: true,
        // indicators: true,
        arrows: true,
        pauseOnHover: true,
    }

    return (
        <div className="slide-container relative ">
            <Fade {...properties}>
                {images.map((image, index) => (
                    <div className="each-fade " key={index}>
                        <img
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            src={image}
                            alt={`slide-${index}`}
                        />
                    </div>
                ))}
            </Fade>
            <div className="absolute bottom-0 w-full flex justify-center pb-4">
                <div className="indicator-container">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className="indicator mx-1 rounded-full bg-gray-300"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slideshow
