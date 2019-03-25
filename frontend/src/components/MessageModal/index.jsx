import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default (props) => (
    <Modal show={props.show} >
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Fechar
            </Button>
        </Modal.Footer>
    </Modal>
)