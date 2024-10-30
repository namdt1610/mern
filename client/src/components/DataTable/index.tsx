import React from 'react'
import DataTableHeader from './DataTableHeader'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'

interface Column {
    title: string
    field: string
}

interface DataTableProps {
    data: Array<{ [key: string]: any }>
    columns: Column[]
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <DataTableHeader columns={columns} />
                <DataTableBody data={data} columns={columns} />
                <DataTableFooter columns={columns} />
            </table>
        </div>
    )
}

export default DataTable
