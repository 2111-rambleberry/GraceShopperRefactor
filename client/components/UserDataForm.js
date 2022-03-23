import React from 'react'
import {connect} from 'react-redux'
import { fetchSingleUser, updateSingleUser } from '../store/singleUser'
import { Form, Button, Stack } from 'react-bootstrap'

///This pretty much works, but security thingies won't let changes go through, come back to this!!
class UserDataForm extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        streetAddress: '',
        cityAddress: '',
        zipcode: 0,
        phoneNumber: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

//This is to fetch user data to pre-populate the page
    // componentDidMount () {
    //   // console.log(req.headers.authorization)
    //     const { id } = this.props.match.params;
    //     this.props.fetchUser(id)
    // }

//For when you remove this data from the dom
// componentWillUnmount() {
    //if this is neccissary go back and create a clear user thunk
//     this.props.clearUser();
//   }

//Lifecycle hook to prepopulate form with user data
componentDidUpdate(prevProps){
  if (prevProps.user.id !== this.props.user.id) {
    this.setState({
      username : this.props.user.username || '',
      firstName: this.props.user.firstName || '',
      lastName: this.props.user.lastName || '',
      email: this.props.user.email || '',
      streetAddress: this.props.user.streetAddress || '',
      cityAddress: this.props.user.cityAddress || '',
      zipcode: this.props.user.zipcode || 0,
      phoneNumber: this.props.user.phoneNumber || ''
    });
  }
}

//this changes state to whatever is input into the form
    handleChange(evt) {
        this.setState({
          [evt.target.id]: evt.target.value
        });
      }

//This pushes the changes you made to state to the db and then sets the form to blank after
    handleSubmit(evt){
        evt.preventDefault(); 
        this.props.updateUser({ ...this.props.user, ...this.state })
        
        //this should clear the form after you submit
        this.setState({
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          streetAddress: '',
          cityAddress: '',
          zipcode: 0,
          phoneNumber: ''
        })
    }

    render(){
        const { handleSubmit, handleChange } = this;
        const { firstName, username, lastName, email, streetAddress, cityAddress, zipcode, phoneNumber} = this.state;

        console.log('props', this.props)
        console.log('state', this.state)

        return (
            <div>
            <h1>Edit:</h1>
            <Stack gap={3} className = "col-md-5 mx-auto">
            <Form onSubmit={handleSubmit} id = "update-user-form">
            <Form.Group className="mb-3" >
                <Form.Label>Username</Form.Label>
                <Form.Control id ="username" type="text" placeholder="Username"  onChange = {handleChange} value = {username}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>First Name</Form.Label>
                <Form.Control id ="firstName" placeholder="First Name" type="text" onChange = {handleChange} value = {firstName}/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control  id ="lastName" placeholder= 'Last Name' type="text" onChange = {handleChange} value = {lastName}/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control id ="email" type="email" placeholder= 'Email' onChange = {handleChange} value = {email}/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Street</Form.Label>
                <Form.Control id ="streetAddress" type="streetAddress" placeholder= 'Street' onChange = {handleChange} value = {streetAddress}/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>City</Form.Label>
                <Form.Control id ="cityAddress" type="cityAddress" placeholder= 'City' onChange = {handleChange} value = {cityAddress}/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Zipcode</Form.Label>
                <Form.Control id ="zipcode" type="zipcode" placeholder = 'Zipcode' onChange = {handleChange} value = {zipcode}/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control id ="phoneNumber" type="phone-number" placeholder= 'Phone Number' onChange = {handleChange} value = {phoneNumber}/>
              </Form.Group>

                
<Button className="justify-content-center"  type="submit" variant="primary">Submit</Button>
              {/* {error && error.response && <div> {error.response.data} </div>} */}
            </Form>
            
            </Stack>
          </div>
        )
    }
  }

//Would I include this if I switch the signup page to be a seprate component
// const mapSignup = state => {
//     return {
//       name: 'signup',
//       displayName: 'Sign Up',
//       error: state.auth.error
//     }
//   }

const mapStateToProps = (state) => ({
    user: state.singleUserReducer
})

//This is not actually connected to any thunk, I'll need to go back and change this
const mapDispatchToProps = (dispatch, {history}) => ({
    updateUser: (user) => dispatch(updateSingleUser(user, history)),
    fetchUser: (id) => dispatch(fetchSingleUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDataForm)