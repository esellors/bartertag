import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import './header.css';
import {getUserSession} from '../../redux/reducers/userReducer';
import {logInUser} from '../../redux/reducers/userReducer';
import {logOutUser} from '../../redux/reducers/userReducer';
import LogInLogOut from './LogInLogOut';

class Header extends Component {
   componentDidMount() {
      Axios.get('/api/user')
         .then(res => {
            if (res.status === 204) {
               console.log('No active user session');
            } else if (res.status === 200) {

               this.props.logInUser(res.data)
            }
         })
         .catch(err => console.log(err));
   }
   render() {
      return (
         <div id='header-container'>
            <header>
               <div id='site-tag'>
                  <h2>Barterloo</h2>
                  <h3>For You.</h3>
               </div>
               <div id='user-session-toggle'>
                  <LogInLogOut 
                     logInUser={this.props.logInUser}
                     logOutUser={this.props.logOutUser}
                     isLoggedIn={this.props.user.isLoggedIn}
                     name={this.props.user.firstName} 
                  />
               </div>
            </header>
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   const {user} = reduxState;
   return {
      user
   };
};

export default connect(mapStateToProps, 
   {
      getUserSession,
      logInUser,
      logOutUser
   }
)(Header);