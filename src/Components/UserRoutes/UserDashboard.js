import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Dashboard(props) {

   const newNotifications = props.notifications 
   ? <div className='new_notification'>NEW!</div>
   : null;

   return (
      <ul className='dashboard'>
         <li><Link to='/browse'>Browse</Link></li>
         <li>
            <Link to='/offers'>
               Offers{newNotifications}
            </Link>
         </li>
         <li><Link to='/inventory'>Inventory</Link></li>
         <li><Link to='/userpreferences'>Preferences</Link></li>
      </ul>
   );
}

const mapStateToProps = reduxState => {
   return {
      notifications: reduxState.notifications.notifications
   }
}

export default connect(mapStateToProps)(Dashboard)