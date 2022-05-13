import React from 'react';
import {Modal, Button} from 'react-bootstrap'

const CheckoutModal = (props) => {

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
          <h2>Are you sure you want to checkout?</h2>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          No - I want to keep shopping!
        </Button>
        <Button variant="primary" onSubmit={props.checkout}>
          Yes - I want my books!
        </Button>
      </Modal.Footer>
    </Modal>
)}

export default CheckoutModal;