import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logInUser} from '../../redux/reducers/userReducer';
import Axios from 'axios';
import {withRouter} from 'react-router';

class Register extends Component {
   constructor(props) {
      super(props);
      this.state = {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          city: '',
          state: '',
          password: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
      this.clearInputs = this.clearInputs.bind(this);
   }
   handleInputChange(e) {
      const {name, value} = e.target;
      this.setState({ [name]: value });
   }
   handleRegisterSubmit(e) {
      e.preventDefault();
      const {firstName, lastName, username, email, city, state, password} = this.state;
      const userInfo = {firstName, lastName, username, email, city, state, password};
  
      Axios.post('/auth/user/register', userInfo)
         .then(res => this.props.logInUser(res.data) )
         .then(() => this.props.history.push('/'))
         .catch(err => console.log(err));
   }
   clearInputs(e) {
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
   render() {
      return (
         <div>
            Guest Registration

            <form onSubmit={this.handleRegisterSubmit}>
               <label htmlFor='register-firstname'>first name</label>
               <input 
                  name='firstName' 
                  id='register-firstname'
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-lastname'>last name</label>
               <input 
                  name='lastName' 
                  id='register-lastname'
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-username'>username</label>
               <input 
                  name='username' 
                  id='register-username'
                  value={this.state.username}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-email'>email</label>
               <input 
                  name='email' 
                  id='register-email'
                  value={this.state.email}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-city'>city</label>
               <input 
                  name='city' 
                  id='register-city'
                  value={this.state.city}
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-state'>state</label>
               <input 
                  name='state' 
                  id='register-state'
                  value={this.state.state}
                  maxLength='2'
                  placeholder='Two letter abbr., e.g. "TX"'
                  onChange={this.handleInputChange}
               />

               <label htmlFor='register-password'>Password</label>
               <input 
                  name='password' 
                  id='register-password'
                  value={this.state.password}
                  onChange={this.handleInputChange}
               />

               <button onClick={this.clearInputs}>Clear</button>
               <button type='submit'>Submit</button>
            </form>
         </div>
      );
   }
}

export default withRouter(connect(null,
   {
      logInUser,
   }
)(Register))