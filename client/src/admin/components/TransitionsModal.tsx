import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

interface CustomModalProps {
    open: boolean
    onClose: () => void
    title: string
    description: string
    confirmText?: string
    onConfirm?: () => void
}

export const TransitionsModal: React.FC<CustomModalProps> = ({
    open,
    onClose,
    title,
    description,
    confirmText = 'Confirm',
    onConfirm,
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Typography
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                    >
                        {description}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={onClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={onConfirm} color="primary">
                            {confirmText}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}
