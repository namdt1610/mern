import React from 'react'
import './ProductDetails.css'

export default function ProductDetails() {
    return (
        <div className="container">
            <div className="grid-item product-imagery">
                <div className="image-carousel">
                    <div className="thumbnail-list">
                        <div>
                            <input type="radio" />
                            <label htmlFor="" role="button">
                                <img src="" alt="" />
                            </label>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
            <div className="grid-item product-title">
                <h5>Member product</h5>
                <h1>Nike V2K Run GORE-TEX</h1>
                <h1>Women's Waterproof Shoes</h1>
            </div>
            <div className="grid-item price">
                <div className="price-container">
                    <span>4,409,000₫</span>
                </div>
                <div className="size-selector"></div>
                <fieldset className="grid-selector">
                    <legend></legend>
                    <div className="grid-selector-item"></div>
                </fieldset>
                <div className="add-to-bag">
                    <div>
                        <button>Sign In To Buy</button>
                    </div>
                    <div>
                        <button>Favorite</button>
                    </div>
                    <section>
                        This product is excluded from site promotions and
                        discounts.
                    </section>
                </div>

                <div className="product-description-container">
                    <p>
                        This winterized version of the V2K adds a GORE-TEX upper
                        to an early 2000s running style. For more Y2K energy,
                        its chunky heel provides ample cushioning while keeping
                        the fit lightweight.
                    </p>
                    <br />
                    <ul className="css-1vql4bw eru6lik0 nds-list">
                        <li data-testid="product-description-color-description">
                            Colour Shown: Light Iron Ore/Light Bone/Khaki/Light
                            Iron Ore
                        </li>
                        <li data-testid="product-description-style-color">
                            Style: FZ2622-002
                        </li>
                        <li data-testid="product-description-country-of-origin">
                            Country/Region of Origin: Vietnam
                        </li>
                    </ul>
                </div>
                {/* https://www.nike.com/vn/t/v2k-run-gore-tex-waterproof-shoes-vmcNXZ/FZ2622-002 */}
                <div></div>
            </div>
        </div>
    )
}
