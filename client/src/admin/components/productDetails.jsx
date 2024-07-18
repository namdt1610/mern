const ProductDetails = ({ product }) => {
    return (
        <div className="product-details">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>
        </div>
    )
}

export default ProductDetails