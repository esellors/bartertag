import React from 'react';
import {Link} from 'react-router-dom';

function OffersDashboard() {
   return (
      <div>
         <h1>OffersDashboard</h1>
         <ul>
            <li><Link to='/offers'>Open Offers</Link></li>
            <li><Link to='/offers/closed'>Closed Offers</Link></li>
         </ul>
      </div>
   );
}

export default OffersDashboard