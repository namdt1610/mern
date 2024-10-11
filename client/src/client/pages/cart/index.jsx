const Cart = () => {
    return (
        <>
            <div className="main flex m-16">
                <div className="my-cart flex flex-grow">
                    <div className="img flex-grow">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="product"
                        />
                    </div>
                    <div className="product-details flex-grow">
                        <h2>Product Name</h2>
                        <p>Price: $100</p>
                        <p>Quantity: 1</p>
                        <button className="btn btn-outline my-2 mr-2">Edit</button>
                        <button className="btn btn-outline">Remove</button>
                    </div>
                    <div className="delivery-info flex-grow">
                        <h2>Delivery Information</h2>
                        <p>Delivery in 3-5 days</p>
                    </div>
                </div>
                <div className="total flex-grow">
                    <p>Summary Total</p>
                    <p>Subtotal: $100</p>
                    <p>Shipping: $10</p>
                    <p>Total: $110</p>
                    <button className="btn btn-neutral">Checkout</button>
                </div>
            </div>
        </>
    )
}
export default Cart
