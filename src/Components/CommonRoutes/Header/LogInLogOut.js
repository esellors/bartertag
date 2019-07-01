import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logInUser} from '../../../redux/reducers/userReducer';
import {logOutUser} from '../../../redux/reducers/userReducer';
import Axios from 'axios';
import {clearInventory} from '../../../redux/reducers/inventoryReducer';
import {withRouter} from 'react-router';

class LogInLogOut extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: 'chucktesta',
         password: 'testtest'
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleLogIn = this.handleLogIn.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
   }
   componentDidMount() {
      Axios.get('/auth/getsession')
         .then(res => {
            if (res.status === 204) {
               console.log(res.status)
               this.props.history.push('/')
               console.log('No active user session');
            } else if (res.status === 200) {
               this.props.logInUser(res.data)
               this.props.history.push('/browse')
            }
         })
         .catch(err => console.log(err));     
   }
   handleInputChange(e) {
      const {name, value} = e.target;
      this.setState({ [name]: value });
   }
   handleLogIn(e) {
      e.preventDefault();
      const {username, password} = this.state;

      if (username.length === 0 || password.length === 0) {
         return alert('Username and/or Password is missing');
      }

      Axios.post('/auth/login', {username, password})
         .then(res => this.props.logInUser(res.data) )
         .then(() => this.props.history.push('/browse'))
         .catch(err => console.log(err));
   }
   handleLogOut() {
      Axios.post('/auth/logout')
         .then(() => this.props.logOutUser() )
         .then(() => {
            this.props.clearInventory();
            this.props.history.push('/');
         })
         .catch(err => console.log(err));
   }
   render() {
      return (
         <div>
            {
               this.props.isLoggedIn
               ?
                  <div id='logout-user'>
                     <h3>Welcome, {this.props.userFirstName}!</h3>
                     <button onClick={this.handleLogOut}>Log Out</button>
                  </div>
               : 
                  <form onSubmit={this.handleLogIn}>
                     <span id='login-inputs'>
                        <span>
                           <label htmlFor='login-username-input'>Username</label>
                           <input 
                              id='login-username-input' 
                              name='username' 
                              placeholder='username' 
                              onChange={this.handleInputChange}
                              value={this.state.username}
                           />
                        </span>
                        <span>
                           <label htmlFor='login-password-input'>Password</label>
                           <input 
                              id='login-password-input' 
                              name='password' 
                              placeholder='password'
                              onChange={this.handleInputChange}
                              value={this.state.password}
                           />
                        </span>
                        <button type='submit'>Log In</button>
                     </span>
                  </form>   
            }
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      isLoggedIn: reduxState.user.isLoggedIn,
      userFirstName: reduxState.user.firstName
   };
};

export default withRouter(connect(mapStateToProps, 
   {
      logInUser,
      logOutUser,
      clearInventory
   }
)(LogInLogOut))