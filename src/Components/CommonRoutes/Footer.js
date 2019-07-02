import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
   return (
      <div id='footer_container'>
         <footer>
            <span>
               <p>Safety Tips:</p>
               <ul>
                  <li>Never give out personal details if you feel unsafe</li>
                  <li>Always meet in safe places to trade for local deals</li>
                  <li>Always take a buddy to accompany you on trade meet ups</li>
                  <li><Link to='/contact'>Report User</Link></li>
               </ul>
            </span>

            <ul>
               <li>&copy; 2019 Eric Sellors</li>
               <li><Link to='/missionstatement'>Mission Statement</Link></li>
               <li><Link to='/contact'>Contact</Link></li>
            </ul>
         </footer>
      </div>
   );
};