import React from 'react';
import {Link} from 'react-router-dom';

function Categories() {
   return (
      <div>
         <h1>Categories</h1>
         <ul>
            <li>
               <div>
                  <Link to='/categories/products'>
                     <h3>Appliances</h3>
                     <p>category pic</p>
                  </Link>
               </div>
            </li>
            <li>
               <div>
                  <Link to='/categories/products'>
                     <h3>Clothes</h3>
                     <p>category pic</p>
                  </Link>
               </div>
            </li>
            <li>
               <div>
                  <Link to='/categories/products'>
                     <h3>Electronics</h3>
                     <p>category pic</p>
                  </Link>
               </div>
            </li>
            <li>
               <div>
                  <Link to='/categories/products'>
                     <h3>Categories Etc...</h3>
                     <p>category pic</p>
                  </Link>
               </div>
            </li>
         </ul>
      </div>
   );
}

export default Categories