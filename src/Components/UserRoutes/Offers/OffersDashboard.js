import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateOffers} from '../../../redux/reducers/offersReducer';
import {clearNotifications} from '../../../redux/reducers/notificationsReducer';
import {Link} from 'react-router-dom';

class OffersDashboard extends Component {
   componentDidMount() {
      const {updateOffers, clearNotifications, userId} = this.props;

      updateOffers(userId);
      clearNotifications(userId);
   }
   render() {
      return (
         <div className='offers_dashboard'>
            <ul>
               <li><Link to='/offers'>Open Offers</Link></li>
               <li><Link to='/offers/closed'>Closed Offers</Link></li>
            </ul>
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return { userId: reduxState.user.userId }
}

export default connect(mapStateToProps, 
   {
      updateOffers,
      clearNotifications
   }
)(OffersDashboard)