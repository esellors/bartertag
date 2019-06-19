import React, {Component} from 'react';
import Axios from 'axios';

export default class LogInLogOut extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: 'test',
         password: 'test'
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleLogIn = this.handleLogIn.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
   }
   handleInputChange(e) {
      const {name, value} = e.target;
      this.setState({ [name]: value });
   }
   handleLogIn(e) {
      e.preventDefault();
      const {username, password} = this.state;

      Axios.post('/auth/user/login', {username, password}).then(res => {
         this.props.logInUser(res.data);
      })
      .catch(err => console.log(err))

      this.setState({
         username: '',
         password: ''
      });
   }
   handleLogOut() {
      Axios.post('/auth/user/logout')
         .then(() => this.props.logOutUser())
         .catch(err => console.log(err));
   }
   render() {
      return (
         <>
            {
               this.props.isLoggedIn
               ?
                  <span id='logout-user'>
                     <h3>Welcome Back, {this.props.name}!</h3>
                     <button onClick={this.handleLogOut}>Log Out</button>
                  </span>
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
         </>
      );
   }
};