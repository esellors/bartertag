import React from 'react';
import {Link} from 'react-router-dom';

export default function Dashboard() {
   return (
      <ul className='dashboard'>
         <li><Link to='/'>Home</Link></li>
         <li><Link to='/register'>Register for Free!</Link></li>
      </ul>
   );
}
