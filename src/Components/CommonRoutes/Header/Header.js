import React from 'react';
import './header.css';
import LogInLogOut from './LogInLogOut';
import logo from '../../../assets/logo.png';

function Header () {
   return (
      <div id='header_container'>
         <header>
            <div id='site-tag'>
               <span>
                  <img src={logo} alt='logo' />
                  <h2>BarterTag</h2>
               </span>
               <h3>You're it!</h3>
            </div>
            <LogInLogOut />
         </header>
      </div>
   );
}

export default Header;