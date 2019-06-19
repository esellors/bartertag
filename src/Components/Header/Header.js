import React, { Component } from 'react';
import './header.css';
import LogInLogOut from './LogInLogOut';

class Header extends Component {
   // constructor(props) {
   //    super(props);
   //    this.state = {
   //        toLandingPage: false
   //    };
   // }
   render() {
      return (
         <div id='header-container'>
            <header>
               <div id='site-tag'>
                  <h2>Barterloo</h2>
                  <h3>For You.</h3>
               </div>
               <div id='user-session-toggle'>
                  <LogInLogOut />
               </div>
            </header>
         </div>
      );
   }
}

export default Header;