import React from 'react'

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
    if (!show) return null // Không hiện modal nếu `show` là false

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold">Confirmation</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4">
                    <p>{message}</p>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-4 p-4 border-t border-gray-300">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
