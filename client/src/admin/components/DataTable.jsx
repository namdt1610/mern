import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import Filter from './Filter'

const DataTable = ({
    data,
    handleSort,
    sortedField,
    sortDirection,
    columns,
    currentPage,
    productsPerPage,
    setProductsPerPage,
    handlePageChange,
    totalPages,
    onView,
    onEdit,
    onDelete,
}) => {
    const [selectedItems, setSelectedItems] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const newFilteredData = data.filter(item =>
            columns.some(col => 
                item[col.key]?.toString().toLowerCase().includes(lowercasedQuery)
            )
        );
        setFilteredData(newFilteredData);
    }, [searchQuery, data, columns]);

    // Xử lý chọn tất cả các sản phẩm
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        const newSelectedItems = {};
        filteredData.forEach(item => {
            newSelectedItems[item._id] = isChecked;
        });
        setSelectedItems(newSelectedItems);
    };

    // Xử lý chọn từng sản phẩm
    const handleSelectItem = (itemId, isChecked) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemId]: isChecked,
        }));
    };

    // Xử lý xóa các sản phẩm đã chọn
    const handleBulkDelete = () => {
        const selectedIds = Object.keys(selectedItems).filter(id => selectedItems[id]);
        onDelete(selectedIds);
        setSelectedItems({});
    };

    return (
        <>
            {/* Bộ lọc (Filter) */}
            <Filter
                productsPerPage={productsPerPage}
                setProductsPerPage={setProductsPerPage}
            />

            {/* Thanh tìm kiếm */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded w-full"
                />
            </div>

            {/* Nút xóa hàng loạt */}
            <button
                onClick={handleBulkDelete}
                className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
                Delete Selected
            </button>

            {/* Bảng dữ liệu (Table) */}
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={filteredData.length > 0 && Object.keys(selectedItems).length === filteredData.length && Object.values(selectedItems).every(val => val)}
                            />
                        </th>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="border border-gray-300 px-4 py-2 cursor-pointer"
                                onClick={() => handleSort(col.key)}
                            >
                                {col.label}{' '}
                                {sortedField === col.key &&
                                    (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                        ))}
                        <th className="border border-gray-300 px-4 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(
                        (currentPage - 1) * productsPerPage,
                        currentPage * productsPerPage
                    ).map((item) => (
                        <tr key={item._id}>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="checkbox"
                                    checked={!!selectedItems[item._id]}
                                    onChange={(e) => handleSelectItem(item._id, e.target.checked)}
                                />
                            </td>
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className="border border-gray-300 px-4 py-2"
                                >
                                    {item[col.key]}
                                </td>
                            ))}
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => onView(item._id)}
                                >
                                    View
                                </button>
                                <button
                                    className="text-yellow-500 hover:underline ml-2"
                                    onClick={() => onEdit(item._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 hover:underline ml-2"
                                    onClick={() => onDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang (Pagination) */}
            <Pagination
                totalPages={Math.ceil(filteredData.length / productsPerPage)}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </>
    )
}

export default DataTable
