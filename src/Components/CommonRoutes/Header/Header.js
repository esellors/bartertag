import React from 'react';
import './header.css';
import LogInLogOut from './LogInLogOut';

function Header () {
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

export default Header;