import React from 'react';
import './header.css';
import LogInLogOut from './LogInLogOut';

function Header () {
   return (
      <div id='header_container'>
         <header>
            <div id='site-tag'>
               <h2>BarterTag</h2>
               <h3>You're it!</h3>
            </div>
            <LogInLogOut />
         </header>
      </div>
   );
}

export default Header;