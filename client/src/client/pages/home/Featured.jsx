import { Link } from 'react-router-dom'
import { featuredSection } from './import'
const Featured = () => {
    return (
        <>
            {/* Featured Section */}
            <div className="featured-section shadow-xl rounded-xl p-4 my-4">
                <div className="section-header mb-4">
                    <h3 className="text-2xl uppercase font-medium">
                        Recommended for you
                    </h3>
                </div>
                <div className="section-body ">
                    <div className="grid grid-cols-4 gap-4">
                        {featuredSection.map((product, index) => (
                            <Link
                                to="/"
                                key={index}
                                className="product-card no-underline text-black"
                            >
                                <picture>
                                    <source
                                        srcSet={product.imageUrl}
                                        type="image/webp"
                                    />
                                    <img
                                        loading="lazy"
                                        className="rounded-xl"
                                        src={product.imageUrl}
                                        alt="Alt Text!"
                                    />
                                </picture>

                                <div className="product-info">
                                    <h4 className="text-lg font-medium">
                                        {product.title}
                                    </h4>
                                    <p className="text-sm">
                                        Price: ${product.price}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Featured
