import React from 'react';
import {Link} from 'react-router-dom';

function Inventory(props) {
   return (
      <>
         <div id='inventory_dashboard'>
            <Link to='/inventory'>View</Link>
            <Link to='/inventory/update'>Update</Link>
         </div>
         {props.children}
      </>
   );
}

export default Inventory