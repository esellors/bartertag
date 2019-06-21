import React from 'react';
import {Link} from 'react-router-dom';

function ProductDashboard() {
   return (
      <div>
         <h1>ProductDashboard</h1>
         <ul>
            <li><Link to='/categories/products/product'>Product Info</Link></li>
            <li><Link to='/categories/products/product/ownerdetails'>Owner Details</Link></li>
         </ul>
      </div>
   );
}

export default ProductDashboard