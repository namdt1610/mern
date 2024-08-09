import { Link } from 'react-router-dom'
import Slideshow from '../../components/Slideshow'
import { useProductsContext } from '../../../hooks/useProductsContext'
import { useEffect } from 'react'
import { images, bannerSideImages, linkSections } from './images'

function App() {
    console.log(images, bannerSideImages, linkSections)
    const { products, dispatch } = useProductsContext()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/admin/products')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json })
            }
        }
        fetchProducts()
        // eslint-disable-next-line
    }, [])
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
                                    className="rounded-xl w-full h-[250px] object-cover mb-4"
                                    src={image}
                                    alt="banner-side-1"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Link Section */}
                <div className="flex-col items-center my-4">
                    <div className="section-header mb-4">
                        <h3 className="text-2xl uppercase font-medium">
                            Hôm nay mang gì đây nhỉ?
                        </h3>
                    </div>
                    <div className="section-body flex justify-between">
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
            </div>
            {/* Categories Section*/}
            <div className="categories-section shadow-xl rounded-xl p-4">
                <div className="section-header ">
                    <h3 className="text-2xl uppercase font-medium">Danh mục</h3>
                </div>
                <div className="section-body ">
                    <div className="flex justify-between">
                        <Link
                            to="/"
                            className="flex flex-col items-center justify-center"
                        >
                            <img
                                src="https://cf.shopee.vn/file/0a3e9c0e7e8b1c0c1d6b9f8f2c7c1b6f"
                                alt="category-1"
                                className="w-20 h-auto object-cover mb-2"
                            />
                            <span className="font-light">
                                Tất cả các sản phẩm
                            </span>
                        </Link>
                        <Link
                            to="/"
                            className="flex flex-col items-center justify-center"
                        >
                            <img
                                src="https://cf.shopee.vn/file/0a3e9c0e7e8b1c0c1d6b9f8f2c7c1b6f"
                                alt="category-2"
                                className="w-20 h-auto object-cover mb-2"
                            />
                            <span className="font-light">Nam</span>
                        </Link>
                        <Link
                            to="/"
                            className="flex flex-col items-center justify-center"
                        >
                            <img
                                src="https://cf.shopee.vn/file/0a3e9c0e7e8b1c0c1d6b9f8f2c7c1b6f"
                                alt="category-3"
                                className="w-20 h-auto object-cover mb-2"
                            />
                            <span className="font-light">Nữ</span>
                        </Link>
                        <Link
                            to="/"
                            className="flex flex-col items-center justify-center"
                        >
                            <img
                                src="https://cf.shopee.vn/file/0a3e9c0e7e8b1c0c1d6b9f8f2c7c1b6f"
                                alt="category-4"
                                className="w-20 h-auto object-cover mb-2"
                            />
                            <span className="font-light">Trẻ em</span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Product Section */}
            <div className="product-section shadow-xl rounded-xl p-4">
                <div className="section-header">
                    <h3 className="text-2xl uppercase font-medium">
                        New arrivals
                    </h3>
                </div>
                <div className="section-body flex">
                    {products &&
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="product-card mx-2"
                            >
                                <img
                                    src={`http://localhost:3000${product.imageUrl}`}
                                    alt={product.name}
                                    className="w-48 h-48 object-cover rounded-lg"
                                />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Price: {product.price}</p>
                                <p>Stock: {product.stock}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default App
