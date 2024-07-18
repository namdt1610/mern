import React from 'react'
import { Link } from 'react-router-dom'
import Slideshow from '../../components/Slideshow'

const images = [
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm7ygnemfo93b_xxhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm822nodfbtf4_xxhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxmb22u4hrkrb4_xxhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm8p6q6qml582_xxhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm84w7tr3dl68_xxhdpi',
]

const bannerSideImages = [
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm9n0fcs8gr72_xhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxmbpgk0qm6x20_xhdpi',
]

const linkSections = [
    {
        index: 0,
        imageUrl:
            'https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi',
        title: 'Voucher Xtra',
    },
    {
        index: 1,
        imageUrl:
            'https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi',
        title: 'Voucher Xtra',
    },
    {
        index: 2,
        imageUrl:
            'https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi',
        title: 'Voucher Xtra',
    },
    {
        index: 3,
        imageUrl:
            'https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi',
        title: 'Voucher Xtra',
    },
    {
        index: 4,
        imageUrl:
            'https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi',
        title: 'Voucher Xtra',
    },
    {
        index: 5,
        imageUrl:
            'https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi',
        title: 'Voucher Xtra',
    },
    {
        index: 6,
        imageUrl:
            'https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi',
        title: 'Voucher Xtra',
    },
]

function App() {
    return (
        <div className="container mx-auto my-4">
            <div className="banner-section shadow-xl rounded-xl p-4">
                <div className="flex md:flex-row justify-center items-center">
                    {/* Banner Slideshow */}
                    <div className="banner-slideshow mx-2 w-full md:w-2/3 h-auto md:h-128">
                        <Slideshow images={images} />
                    </div>

                    {/* Banner Side */}
                    <div className="banner-side flex flex-col w-full md:w-1/3 mx-2 h-fit md:h-128">
                        {bannerSideImages.map((image, index) => (
                            <div key={index}>
                                <img
                                    className="rounded-xl w-full h-auto object-cover mb-4"
                                    src={image}
                                    alt="banner-side-1"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Link Section */}
                <div className="flex justify-between items-center m-4">
                    {linkSections.map((section) => (
                        <div key={section.index}>
                            <Link
                                to="/"
                                className="flex flex-col items-center justify-center"
                            >
                                <img
                                    src={section.imageUrl}
                                    alt={section.title}
                                    className="w-12 h-auto object-cover mb-2"
                                />
                                <span className="font-light">
                                    {section.title}
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* Categories Section*/}
            <div className="categories-section shadow-xl rounded-xl p-4">
                <div className="section-header ">
                    <h3 className="text-2xl uppercase font-medium">Danh mục</h3>

                </div>
                <div className="section-body ">

                </div>
            </div>
            {/* Product Section */}
            <div className="product-section"></div>
        </div>
    )
}

export default App
