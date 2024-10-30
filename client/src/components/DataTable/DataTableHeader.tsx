import React from 'react'

interface Column {
    title: string
    field: string
}

interface DataTableHeaderProps {
    columns: Column[]
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({ columns }) => (
    <thead>
        <tr>
            {columns.map((column) => (
                <th key={column.field}>{column.title}</th>
            ))}
            <th>Actions</th>
        </tr>
    </thead>
)

export default DataTableHeader
