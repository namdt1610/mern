import { Link } from 'react-router-dom'
import s from './ProductDetails.module.scss'

export default function ProductDetails() {
    return (
        <div className={s.container}>
            <div className={s.imageGrid}>
                {[...Array(10)].map((_, i) => (
                    <Link key={i}>
                        <img
                            src="https://via.placeholder.com/400"
                            alt="product"
                            className="rounded-md"
                        />
                    </Link>
                ))}
            </div>

            <div className="price-container m-6 ">
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
                <div className="color-seletor my-6">
                    <div className="flex justify-between">
                        <div className="color-name ">
                            <span>Color</span>
                        </div>
                        <div className="color">
                            <span>Black</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-1">
                        {[...Array(10)].map((_, i) => (
                            <Link key={i}>
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
                <div className="size-selector my-6">
                    <div className="size-selector-header flex justify-between">
                        <div className="size-name">
                            <span>Size</span>
                        </div>
                        <div className="size-guide">
                            <span>Size Guide</span>
                        </div>
                    </div>
                    <div className="size-selector-body grid grid-cols-4 gap-1">
                        {[...Array(16)].map((_, i) => (
                            <Link key={i} className="">
                                <img
                                    src="https://via.placeholder.com/200"
                                    alt="product"
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="my-4">
                        <Link to="">Most people go down for 0.5 US Sizes</Link>
                    </div>

                    <div className="my-4">
                        <button className="btn btn-neutral btn-block my-2">
                            Add to Cart
                        </button>
                        <button className="btn btn-block btn-outline btn-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            <div className="recommened col-span-2 py-8">
                <p className="text-2xl py-2">You may also like</p>
                <div className="carousel carousel-center rounded-box">
                    {[...Array(10)].map((_, i) => (
                        <div className="carousel-item mr-4">
                            <Link key={i}>
                                <img
                                    src="https://via.placeholder.com/200"
                                    alt="product"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Đánh giá */}
            <div className="reviews col-span-2">
                <p className="text-2xl py-2">Reviews (4.5/5)</p>
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="review my-4">
                        <div className="reviewer flex items-center">
                            <div className="reviewer-image">
                                <img
                                    src="https://via.placeholder.com/200"
                                    alt="reviewer"
                                    className="rounded-full w-12 h-12"
                                />
                            </div>
                            <div className="reviewer-name ml-2">
                                <span className="text-2xl">John Doe</span>
                            </div>
                        </div>
                        <div className="review-body">
                            <div className="rating flex">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index}>⭐️</span>
                                ))}
                            </div>
                            <div className="review-text">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed sit amet accumsan arcu.
                                    Curabitur vel elit at nunc sodales
                                    tincidunt. Nulla facilisi.
                                </p>
                            </div>
                            <div className="review-images">
                                <div className="flex flex-row">
                                    {[...Array(4)].map((_, i) => (
                                        <Link key={i} className='mx-1'>
                                            <img
                                                src="https://via.placeholder.com/200"
                                                alt="product"
                                                className="rounded-md"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
