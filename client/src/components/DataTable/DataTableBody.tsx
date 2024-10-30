import React from 'react'

interface Column {
    title: string
    field: string
}

interface DataTableBodyProps {
    data: Array<{ [key: string]: any }>
    columns: Column[]
}

const DataTableBody: React.FC<DataTableBodyProps> = ({ data, columns }) => (
    <tbody>
        {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {columns.map((column) => (
                    <td key={column.field}>{row[column.field]}</td>
                ))}
                <td>
                    <button className="btn btn-ghost btn-xs">details</button>
                </td>
            </tr>
        ))}
    </tbody>
)

export default DataTableBody
