import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
   return (
      <div>
         <h2>Footer</h2>
         <ul>
            <li>Safety Tips:</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
            <li>Magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
            <li><Link>Report User</Link></li>
         </ul>
         <ul>
            <li><Link to='/donate'>Donate</Link></li>
            <li><Link to='/missionstatement'>Mission Statement</Link></li>
            <li><Link to='/advertise'>Advertise</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
         </ul>
      </div>
   );
};