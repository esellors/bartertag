import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

function ProductDashboard(props) {
   console.log(props)
   return (
      <div>
         <h1>ProductDashboard</h1>
         <ul>
            <li><button onClick={props.history.goBack}>Back</button></li>
            <li><Link to='/categories/products/product'>Product Info</Link></li>
            <li><Link to='/categories/products/product/ownerdetails'>Owner Details</Link></li>
         </ul>
      </div>
   );
}

export default withRouter(ProductDashboard)