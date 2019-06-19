import React from 'react';
import {Link} from 'react-router-dom';

export default function Dashboard() {
   return (
      <div>
         <Link to='/'>Categories</Link>
         <Link to='/offers'>Offers</Link>
         <Link to='/inventory'>Inventory</Link>
         <Link to='/userpreferences'>Preferences</Link>
      </div>
   );
};