import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import {Form, Stack, Button, Card }from 'react-bootstrap'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (

    
    // <div>
    //   <Form onSubmit={handleSubmit} name={name}>
    //   <Form.Group className="mb-3" controlId="username">
    //       <Form.Label htmlFor="username">
    //         <small>Username</small>
    //       </Form.Label>
    //       <Form.Control name="username" type="text" placeholder="Enter Username"/>
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="username">
    //       <Form.Label htmlFor="password">
    //         <small>Password</small>
    //       </Form.Label>
    //       <Form.Control name="password" type="password" />
    //     </Form.Group>
    //     <div>
    //       <Button variant="primary" type="submit">{displayName}</Button>
    //     </div>
    //     {error && error.response && <div> {error.response.data} </div>}
    //   </Form>
    // </div>
      <center>
      <Card style={{ width: '18rem' }} className = "loginCard">
         <Card.Body>
      {/* <Stack gap={2} className="col-md-5 mx-auto"> */}
      <Card.Title>Login</Card.Title>
      <center>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>

        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>

   
        <Button type="submit" text-align = "center">{displayName}</Button> 
   
        {error && error.response && <div> {error.response.data} </div>}
      </form> 
      </center>
      {/* </Stack>  */}
      </Card.Body>
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
