import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

function Landing(props) {
   return (
      <div id='guest_landing'>
         <span className='guest_site_desc'>
            <h4>Trade with Others</h4>
            <h5>
               BarterTag is a new way to repurpose your unused items!
            </h5>
         </span>

         <span className='guest_info_section'>
            <span className='guest_info'>
               <h1>BROWSE</h1>
               <p>...your favorite categories</p>
            </span>

            <span className='guest_info'>
               <h1>TAG</h1>
               <p>...make an offer</p>
            </span>

            <span className='guest_info'>
               <h1>DEAL</h1>
               <p>...agree and trade</p>
            </span>
         </span>

         <Link className='second_register_invite' to='/register'>Register. It's Free!</Link>
      </div>
   );
}

const mapStateToProps = reduxState => {
   return {
      userId: reduxState.user.userId
   }
}

export default connect(mapStateToProps)(Landing)