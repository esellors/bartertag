import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {logInUser} from '../../redux/reducers/userReducer';
import {logOutUser} from '../../redux/reducers/userReducer';
import {updateLocalUserLocation} from '../../redux/reducers/userReducer';
import SelectStateDropdown from '../Data/states';
import registerUpdateValidation from '../Validation/RegisterUpdateUser';
import DisplayValidationErrors from '../Validation/DisplayErrors';

class RegisterUpdateUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
         uneditedUserInfo: {},
         editFieldsDisabled: this.props.user.isLoggedIn,
         userEditToggle: false,
         submitBtnDisabled: false,
         firstName: '',
         lastName: '',
         username: '',
         email: '',
         city: '',
         state: '',
         password: '',
         formValidationErrors: []
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleRegisterUpdate = this.handleRegisterUpdate.bind(this);
      this.clearRegisterInputs = this.clearRegisterInputs.bind(this);
      this.handleUserBtns = this.handleUserBtns.bind(this);
      this.populateUserInfo = this.populateUserInfo.bind(this);
   }
   componentDidMount() {
      if (this.props.user.isLoggedIn) {
         this.populateUserInfo();
      };
   }
   populateUserInfo() {
      const {firstName, lastName, username, email, locationId} = this.props.user;
   
      if (!this.props.user.city && !this.props.user.state) {
         Axios
            .get(`/api/user/getlocation/${locationId}`)
            .then(res => {
               this.setState({
                  uneditedUserInfo: {...this.state.uneditedUserInfo, city: res.data.city, state: res.data.state},
                  city: res.data.city,
                  state: res.data.state
               });
               this.props.updateLocalUserLocation({
                  city: res.data.city, 
                  state: res.data.state
               });
            })
            .catch(err => {
               alert('There was an error fetching location info');
               console.log(err.request);
            });
      } else {
         this.setState({
            uneditedUserInfo: {...this.state.uneditedUserInfo, city: this.props.user.city, state: this.props.user.state},
            city: this.props.user.city,
            state: this.props.user.state
         });
      }
      
      this.setState({
         uneditedUserInfo: {firstName, lastName, username, email},
         firstName,
         lastName,
         username, 
         email
      }); 
   }
   handleInputChange(e) {
      const {name, value} = e.target;

      if (name === 'city') {
         this.setState({ [name]: value.toUpperCase() });
      } else {
         this.setState({ [name]: value });
      }
   }
   handleUserBtns(e) {
      e.preventDefault();
      const button = e.target.name;

      switch (button) {
         case 'makeChangesBtn':
            this.setState({ 
               editFieldsDisabled: false,
               userEditToggle: true 
            })
            break;
         case 'saveChangesBtn':
            this.handleRegisterUpdate();
            break;
         case 'cancelChangesBtn':
            this.populateUserInfo();
            this.setState({ formValidationErrors: [] });
            break;
         default: break;
      };
   }
   clearRegisterInputs(e) {
      e.preventDefault();

      this.setState({
         firstName: '',
         lastName: '',
         username: '',
         email: '',
         city: '',
         state: '',
         password: ''
     });
   }
   handleRegisterUpdate(e) { 
      if (e) e.preventDefault();

      if (this.props.user.isLoggedIn === true) { // Block existing user from saving unchanged info
         const uneditedUserInfo = {...this.state.uneditedUserInfo};
         const newerUserInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            city: this.state.city,
            state: this.state.state
         }
         
         if (JSON.stringify(uneditedUserInfo) === JSON.stringify(newerUserInfo) && this.state.password.length === 0) {
            return this.setState({
               formValidationErrors: ['No changes have been made']
            })
         } 
      }

      this.setState({ submitBtnDisabled: true });

      const errorsFound = registerUpdateValidation({...this.state}, this.props.user.isLoggedIn);

      if (errorsFound.length > 0) {
         return this.setState({ 
            submitBtnDisabled: false,
            formValidationErrors: errorsFound 
         });
      };

      const {firstName, lastName, username, email, city, state, password} = this.state;
      const newUserInfo = {firstName, lastName, username, email, city, state, password};
   
      if (!this.props.user.isLoggedIn) { // register new user
         Axios
            .post('/auth/register', newUserInfo)
            .then(res => this.props.logInUser(res.data) )
            .then(() => this.props.history.push('/categories'))
            .catch(err => {
               let newErrors = [err.request.responseText];
               this.setState({
                  submitBtnDisabled: false,
                  formValidationErrors: newErrors 
               });
            });
      } else { // update existing user
         const {userId} = this.props.user;
         const userInfo = {...newUserInfo, userId};

         Axios
            .put('/api/user/update', userInfo)
            .then(() => {
               alert('Information updated. Please login again to refresh');
               Axios.post('/auth/logout')
                  .then(() => this.props.logOutUser() )
                  .then(() => this.props.history.push('/'))
                  .catch(err => console.log(err.request));
            })
            .catch(err => console.log(err.request));    
      }
   }
   render() {
      return (
         <div>
            {
               this.props.user.isLoggedIn
               ?
                  <h1>Update Information</h1>
               :
                  <h1>Register</h1>
            }
            <form>
               <label htmlFor='register-firstname'>first name</label>
               <input 
                  disabled={this.state.editFieldsDisabled}
                  name='firstName' 
                  id='register-firstname'
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-lastname'>last name</label>
               <input 
                  disabled={this.state.editFieldsDisabled}
                  name='lastName' 
                  id='register-lastname'
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-username'>username</label>
               <input 
                  disabled={this.state.editFieldsDisabled}
                  name='username' 
                  id='register-username'
                  value={this.state.username}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-email'>email</label>
               <input 
                  disabled={this.state.editFieldsDisabled}
                  name='email' 
                  type='email'
                  id='register-email'
                  value={this.state.email}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-city'>city</label>
               <input 
                  disabled={this.state.editFieldsDisabled}
                  name='city' 
                  id='register-city'
                  value={this.state.city}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-state'>state</label>
               <SelectStateDropdown 
                  disabled={this.state.editFieldsDisabled}
                  value={this.state.state}
                  handleInputChange={this.handleInputChange} 
               />

               <label htmlFor='register-password'>Password</label>
               <input 
                  disabled={this.state.editFieldsDisabled}
                  placeholder={this.props.user.isLoggedIn ? 'Blank to keep current PW' : '8 characters minimum'}
                  name='password' 
                  id='register-password'
                  maxLength='40'
                  value={this.state.password}
                  onChange={this.handleInputChange}
               />
               {
                  this.state.formValidationErrors.length > 0
                  ?
                     <DisplayValidationErrors errors={this.state.formValidationErrors} 
                  />
                  :  null
               }
               {
                  this.props.user.isLoggedIn 
                  ?
                     this.state.userEditToggle
                     ?
                        <>
                           <button 
                              name='saveChangesBtn' 
                              disabled={this.state.submitBtnDisabled} 
                              onClick={this.handleUserBtns}
                           >Save Changes</button>
                           <button 
                              name='cancelChangesBtn' 
                              onClick={this.handleUserBtns}>Cancel</button>
                        </>
                     :
                        <button name='makeChangesBtn' onClick={this.handleUserBtns}>Edit</button>
                  :
                     <>
                        <button onClick={this.clearRegisterInputs}>Clear</button>
                        <button disabled={this.state.submitBtnDisabled} onClick={this.handleRegisterUpdate}>Register</button>
                     </>
               }
            </form>
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      user: reduxState.user
   };
};

export default withRouter(connect(mapStateToProps,
   {
      logInUser,
      logOutUser,
      updateLocalUserLocation
   }
)(RegisterUpdateUser))