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
        // this.setState({
        //   firstName: '',
        //   lastName: '',
        //   email: '',
        //   streetAddress: '',
        //   cityAddress: '',
        //   zipcode: 0,
        //   phoneNumber: ''
        // })
    }

    render(){
        const { handleSubmit, handleChange } = this;
        const { firstName, lastName, email, streetAddress, cityAddress, zipcode, phoneNumber} = this.state;

        console.log('props', this.props)
        console.log('state', this.state)

        return (
            <div>
            <h1>Edit:</h1>
            <form onSubmit={handleSubmit} id = "update-user-form">

              <div>
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input id ="firstName" type="text" onChangeq = {handleChange} value = {firstName}/>
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

const mapStateToProps = (state) => ({
    user: state.singleUserReducer
})

//This is not actually connected to any thunk, I'll need to go back and change this
const mapDispatchToProps = (dispatch, {history}) => ({
    updateUser: (user) => dispatch(updateSingleUser(user, history)),
    fetchUser: (id) => dispatch(fetchSingleUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDataForm)