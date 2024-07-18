import React from 'react';
import Slideshow from '../../components/Slideshow';

const images = [
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm7ygnemfo93b_xxhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm822nodfbtf4_xxhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxmb22u4hrkrb4_xxhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm8p6q6qml582_xxhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm84w7tr3dl68_xxhdpi',
];

const bannerSideImages = [
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxm9n0fcs8gr72_xhdpi',
    'https://cf.shopee.vn/file/vn-11134258-7r98o-lxmbpgk0qm6x20_xhdpi',
];

function App() {
    return (
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center my-4">
            {/* Banner Slideshow */}
            <div className="banner-slideshow mx-2 w-full md:w-2/3">
                <Slideshow images={images} />
            </div>

            {/* Banner Side */}
            <div className="banner-side flex flex-col w-full md:w-1/3 mx-2">
                <img
                    className="rounded-xl w-full h-auto object-cover mb-4"
                    src={bannerSideImages[0]}
                    alt="banner-side-1"
                />
                <img
                    className="rounded-xl w-full h-auto object-cover"
                    src={bannerSideImages[1]}
                    alt="banner-side-2"
                />
            </div>
        </div>
    );
}

export default App;
