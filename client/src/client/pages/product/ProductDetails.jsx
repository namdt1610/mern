import { Link } from 'react-router-dom'
// import s from './ProductDetails.module.scss'

export default function ProductDetails() {
    return (
        <div className="flex m-6">
            <div className="images-container grid grid-cols-2 gap-1 m-6">
                <img src="https://via.placeholder.com/400" alt="product" />
                <img src="https://via.placeholder.com/400" alt="product" />
                <img src="https://via.placeholder.com/400" alt="product" />
                <img src="https://via.placeholder.com/400" alt="product" />
                <img src="https://via.placeholder.com/400" alt="product" />
                <img src="https://via.placeholder.com/400" alt="product" />
            </div>
            <div className="price-container m-6 w-96">
                <div className="product-category">Unisex</div>
                <h1 className="product-name text-4xl">530</h1>
                <span className="sales">$99.99</span>
                <div className="rating">
                    <div className="start">
                        <span>⭐️</span>
                        <span>⭐️</span>
                        <span>⭐️</span>
                        <span>⭐️</span>
                        <span>⭐️</span>
                    </div>
                    <div className="avg-rating">
                        <span>4.5</span>
                    </div>
                    <div className="reviews">
                        <span>(100 reviews)</span>
                    </div>
                </div>
                <div className="color-seletor">
                    <div className="color-name">
                        <span>Color</span>
                    </div>
                    <div className="color">
                        <span>Black</span>
                    </div>
                    <div className="flex flex-wrap">
                        {[...Array(10)].map((_, i) => (
                            <Link className="w-16 m-1">
                                <img
                                    key={i}
                                    src="https://via.placeholder.com/200"
                                    alt="product"
                                    className="rounded-md"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="size-selector">
                    <div className="size-selector-header">
                        <div className="size-name">
                            <span>Size</span>
                        </div>
                        <div className="size-guide">
                            <span>Size Guide</span>
                        </div>
                    </div>
                    <div className="size-selector-body flex flex-wrap">
                        {[...Array(16)].map((_, i) => (
                            <Link className="w-16 m-1 ">
                                <img
                                    key={i}
                                    src="https://via.placeholder.com/200"
                                    alt="product"
                                    className="rounded-md"
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="note">
                        <Link to="">Most people go down for 0.5 US Sizes</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
