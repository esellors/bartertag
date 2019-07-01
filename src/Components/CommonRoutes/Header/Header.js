import React from 'react';
import './header.css';
import LogInLogOut from './LogInLogOut';

function Header () {
   return (
      <header>
         <div id='site-tag'>
            <h1>BarterTag</h1>
            <h3>You're it!</h3>
         </div>
         <div id='user-session-toggle'>
            <LogInLogOut />
         </div>
      </header>
   );
}

export default Header;