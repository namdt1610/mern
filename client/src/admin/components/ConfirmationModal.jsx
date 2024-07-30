// ConfirmationModal.jsx
import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Yes, Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal
