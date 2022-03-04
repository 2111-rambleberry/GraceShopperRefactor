import React from 'react'
import {connect} from 'react-redux'
import { fetchSingleUser, updateSingleUser } from '../store/singleUser'

class UserDataForm extends React.Component {
    constructor(props){
      super(props)
      this.state = {
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
    componentDidMount () {
        const { id } = this.props.match.params;
        this.props.fetchUser(id)
    }

//For when you remove this data from the dom
//this is to pre-populate the form
// componentWillUnmount() {
    //if this is neccissary go back and create a clear user thunk
//     this.props.clearUser();
//   }

//executes code after a component is updated
// componentDidUpdate(prevProps){

// }

//this changes state 
    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }

//This pushes the changes you made to state to the db and then sets the form to blank after
    handleSubmit(evt){
        evt.preventDefault(); 
        this.props.updateUser({ ...this.props.user, ...this.state })
        this.setState({
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
        const { firstName, lastName, email, streetAddress, cityAddress, zipcode, phoneNumber} = this.state;

        return (
            <div>
                <h1>Checkout:</h1>
            <form onSubmit={handleSubmit} id = "update-user-form">

              <div>
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input id ="firstName" type="text" onChange = {handleChange} value = {firstName}/>
              </div>

              <div>
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <input  id ="lastName" type="text" onChange = {handleChange} value = {lastName}/>
              </div>

              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input id ="email" type="email" onChange = {handleChange} value = {email}/>
            </div>

              <div>
                <label htmlFor="streetAddress">
                  <small>Street</small>
                </label>
                <input id ="streetAddress" type="streetAddress" onChange = {handleChange} value = {streetAddress}/>
              </div>

              <div>
                <label htmlFor="cityAddress">
                  <small>City</small>
                </label>
                <input id ="cityAddress" type="cityAddress" onChange = {handleChange} value = {cityAddress}/>
              </div>

              <div>
                <label htmlFor="zipcode">
                  <small>Zipcode</small>
                </label>
                <input id ="zipcode" type="zipcode" onChange = {handleChange} value = {zipcode}/>
              </div>

              <div>
                <label htmlFor="phone-number">
                  <small>Phone Number</small>
                </label>
                <input id ="phoneNumber" type="phone-number" onChange = {handleChange} value = {phoneNumber}/>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>

              {/* {error && error.response && <div> {error.response.data} </div>} */}
            </form>
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

const mapStateToProps = ({ user }) => ({
    user
})

//This is not actually connected to any thunk, I'll need to go back and change this
const mapDispatchToProps = (dispatch, {history}) => ({
    updateUser: (user) => dispatch(updateSingleUser(user, history)),
    fetchUser: (id) => dispatch(fetchSingleUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDataForm)