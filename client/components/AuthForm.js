import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import {Form, Stack, Button, Card }from 'react-bootstrap'
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
      <center>
      <Card style={{ width: "40%", padding:"2%"}} className = "loginCard shadow-lg">
        <Card.Title>
              <h2 className="darkPurple" >{displayName}</h2>
            </Card.Title>
        <div className='row'>            
          <div className='col-md-6'>
            <Card.Img src="books-login.png" alt="Card image" />
            <div className='marginTop'>
              {name == "login" ? 
              <Card.Link href = "/signup"><p>Don't have an account?</p></Card.Link>
              : <Card.Link href = "/login"><p>Already have an account?</p></Card.Link> }
            </div>
          </div>
          <div className='col-md-6'>
          <Card.Body>

            <center>
              <form onSubmit={handleSubmit} name={name}>
                <div>
                  <Form.Group className="mb-3" >
                      <Form.Label >Username</Form.Label>
                      <Form.Control name="username" type="text" placeholder="Username"/>
                  </Form.Group>
                  <Form.Group className="mb-3" >
                      <Form.Label>Password</Form.Label>
                      <Form.Control name="password" type="password" placeholder="Password"/>
                  </Form.Group>
                </div>
                <Button type="submit" text-align = "center">{displayName}</Button>
                {error && error.response && <div> {error.response.data} </div>}
              </form>
            </center>

            </Card.Body>
          </div>
        </div>
      </Card>
      </center>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
