import { Link } from 'react-router-dom'
import DataTable from '../../components/DataTable'
import { TransitionsModal } from '../../components/TransitionsModal'
import { Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'

export const ProductIndex = () => {
    return (
        <>
            <div className="py-3">
                <Stack direction="row" spacing={2}>
                    <Link to={'/admin/products/create'}>
                        <Button variant="contained" endIcon={<SendIcon />}>
                            Add Product
                        </Button>
                    </Link>
                </Stack>
            </div>

            <DataTable
                rows={products}
                headCells={headCells}
                onRowClick={handleView}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={openDeleteModal}
                title="Products List"
            />
            {showModal && (
                <TransitionsModal
                    open={showModal}
                    onClose={handleCloseModal}
                    title="Delete Product"
                    description="Are you sure you want to delete this product?"
                    confirmText="Delete"
                    onConfirm={handleDelete}
                />
            )}
        </>
    )
}
