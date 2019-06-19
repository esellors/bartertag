import React from 'react';
import {Link} from 'react-router-dom';

function Inventory() {
   return (
      <div>
         <h1>Inventory Dashboard</h1>
         <Link to='/inventory'>View</Link>
         <Link to='/inventory/add'>Add</Link>
      </div>
   );
};

export default Inventory;