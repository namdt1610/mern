import React, { useMemo } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PropTypes from 'prop-types'
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Checkbox,
    IconButton,
    Tooltip,
    TablePagination,
} from '@mui/material'

const DataTable = ({
    rows,
    headCells,
    title,
    onRowClick,
    onView,
    onEdit,
    onDelete,
    rowsPerPageOptions = [5, 10, 25],
}) => {
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState(headCells[0].id)
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0])

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleClick = (event, id) => {
        if (event.target.closest('button')) return
        const selectedIndex = selected.indexOf(id)
        let newSelected =
            selectedIndex === -1
                ? [...selected, id]
                : selected.filter((_, index) => index !== selectedIndex)
        setSelected(newSelected)
        if (onRowClick) onRowClick(id)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const visibleRows = useMemo(() => {
        return [...rows]
            .sort((a, b) => {
                return order === 'desc'
                    ? b[orderBy] < a[orderBy]
                        ? -1
                        : 1
                    : a[orderBy] < b[orderBy]
                    ? -1
                    : 1
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }, [order, orderBy, page, rowsPerPage, rows])

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar sx={{ pl: 2, pr: 1 }}>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        component="div"
                    >
                        {title}
                    </Typography>
                    {selected.length > 0 && (
                        <Tooltip title="Delete">
                            <IconButton>
                                <i></i>
                            </IconButton>
                        </Tooltip>
                    )}
                </Toolbar>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={
                                            selected.length > 0 &&
                                            selected.length < rows.length
                                        }
                                        checked={
                                            rows.length > 0 &&
                                            selected.length === rows.length
                                        }
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>
                                <TableCell>Actions</TableCell>{' '}
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={
                                            headCell.numeric ? 'right' : 'left'
                                        }
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={
                                                orderBy === headCell.id
                                                    ? order
                                                    : 'asc'
                                            }
                                            onClick={() =>
                                                handleRequestSort(headCell.id)
                                            }
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {visibleRows.map((row) => {
                                const isItemSelected = selected.includes(
                                    row._id
                                )
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) =>
                                            handleClick(event, row._id)
                                        }
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row._id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onView(row._id)
                                                }}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onEdit(row._id)
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onDelete(row._id)
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>

                                        {headCells.map((cell) => (
                                            <TableCell
                                                key={`${row.id}-${cell.id}`}
                                                align={
                                                    cell.numeric
                                                        ? 'right'
                                                        : 'left'
                                                }
                                            >
                                                {row[cell.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

DataTable.propTypes = {
    rows: PropTypes.array.isRequired,
    headCells: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    onRowClick: PropTypes.func,
    rowsPerPageOptions: PropTypes.array,
}

export default DataTable
