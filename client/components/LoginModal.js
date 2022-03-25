import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Button } from "react-bootstrap";

function LoginModal(props) {

    const { error } = useSelector
    (state => {
      return {
        error: state.auth.error
      }
    });

  //getting the actions from the store
  const dispatch = useDispatch();

  //local state for editing
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    //we need a handle submit function to handle the form submission because of what happens when you submit a form, we need to stop the default behavior of the form which is to refresh the page
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authenticate(username, password, formName));
      }
      
      console.log(props);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" placeholder="Password" />
            </Form.Group>


            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit" onClick = {handleSubmit}>
                Submit
            </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function LoginButton() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <LoginModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }

//   const mapDispatch = dispatch => {
//     return {
//       handleSubmit(evt) {
//         evt.preventDefault()
//         const formName = evt.target.name
//         const username = evt.target.username.value
//         const password = evt.target.password.value
//         dispatch(authenticate(username, password, formName))
//       }
//     }
//   }
  
  export default LoginButton;
  