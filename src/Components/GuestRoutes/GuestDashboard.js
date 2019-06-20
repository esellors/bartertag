import React from 'react';
import {Link} from 'react-router-dom';

export default function Dashboard() {
   return (
      <div>
         <Link to='/'>Home</Link>
         <Link to='/register'>Register for Free!</Link>
      </div>
   );
}
