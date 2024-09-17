// components/Pagination.jsx
import React from 'react'

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className="pagination mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 border ${
                        currentPage === index + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-black'
                    }`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}

export default Pagination
