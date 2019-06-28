import React, {Component} from 'react';
import {connect} from 'react-redux';
import updateOffers from '../../../redux/reducers/offersReducer';

class ClosedOffers extends Component {
   updateOffers() {
      const {userId, updateOffers} = this.props;
      updateOffers(userId);
   }
   render() {

      const {closedOffers} = this.props;

      const closedOffersMapped = closedOffers.length === 0 
         ? 'You have no closed offers.'
         :
            closedOffers.map((offer, i) => 
                <h1 key={i}>{offer.secondary_user_id}</h1>
            )

      return (
         <div>
            <h1>ClosedOffers</h1>
            {closedOffersMapped}
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      userId: reduxState.user.userId,
      closedOffers: reduxState.offers.closedOffers
   }
}

export default connect(mapStateToProps, 
   {
      updateOffers
   }
)(ClosedOffers)