import React from 'react';
import {Link} from 'react-router-dom';

export default function Dashboard() {
   return (
      <ul>
         <li><Link to='/browse'>Browse</Link></li>
         <li><Link to='/offers'>Offers</Link></li>
         <li><Link to='/inventory'>Inventory</Link></li>
         <li><Link to='/userpreferences'>Preferences</Link></li>
      </ul>
   );
}