import React from 'react';
import {Link} from 'react-router-dom';

function Categories() {
   return (
      <div>
         <h1>Products</h1>
         <ul>
            <li>
               <div>
                  <Link to='/categories/products/product'>
                     <h3>Product 1</h3>
                     <p>product pic</p>
                  </Link>
               </div>
            </li>
            <li>
               <div>
                  <Link to='/categories/products/product'>
                     <h3>Product 2</h3>
                     <p>product pic</p>
                  </Link>
               </div>
            </li>
            <li>
               <div>
                  <Link to='/categories/products/product'>
                     <h3>Product 3</h3>
                     <p>product pic</p>
                  </Link>
               </div>
            </li>
            <li>
               <div>
                  <Link to='/categories/products/product'>
                     <h3>Product Etc</h3>
                     <p>product pic</p>
                  </Link>
               </div>
            </li>
         </ul>
      </div>
   );
}

export default Categories