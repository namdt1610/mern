import React, { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';

const ProductContainer = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        const data = await fetch('/api/product/1');
        const result = await data.json();
        setProduct(result);
    };

    return (
        <ProductDetails product={product} />
    );
};

export default ProductContainer;
