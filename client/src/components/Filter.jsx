// components/Filter.jsx
import React from 'react';

const Filter = ({ productsPerPage, setProductsPerPage }) => {
    return (
        <div className="filter mb-4">
            <select
                name="productsPerPage"
                className="border p-2 rounded"
                value={productsPerPage}
                onChange={(e) => setProductsPerPage(parseInt(e.target.value))}
            >
                <option value="5">5 products per page</option>
                <option value="10">10 products per page</option>
                <option value="20">20 products per page</option>
            </select>
        </div>
    );
};

export default Filter;
