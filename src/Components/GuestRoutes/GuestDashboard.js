import React from 'react';
import {Link} from 'react-router-dom';

export default function Dashboard() {
   return (
      <div>
         <Link to='/'>Home</Link>
         <Link to='/register'>REGISTER FOR FREE!</Link>
      </div>
   );
}
