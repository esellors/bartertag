import React, {Component} from 'react';
import {connect} from 'react-redux';
import updateOffers from '../../../redux/reducers/offersReducer';

class OpenOffers extends Component {
   updateOffers() {
      const {userId, updateOffers} = this.props;
      updateOffers(userId);
   }
   render() {

      const {newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary} = this.props;

      const newOffersMapped = newOffers.length === 0 
         ? 'You have no new offers.'
         :
            newOffers.map((offer, i) => {
               return (
                  <>
                     <h1 key={i}>{offer.secondary_user_id}</h1>
                     <h1>s</h1>
                  </>
            )})

      const pendingOffersAsPrimaryMapped = pendingOffersAsPrimary.length !== 0 
         ? 'No pending offers'
         :
            pendingOffersAsPrimary.map((offer, i) => 
                  <h1 key={i}>{offer.secondary_user_id}</h1>
            )
         
      const pendingOffersAsSecondaryMapped = pendingOffersAsSecondary.length !== 0 
         ? 'No pending offers'
         :
            pendingOffersAsSecondary.map((offer, i) => 
                  <h1 key={i}>{offer.secondary_user_id}</h1>
            )

      return (
         <div>
            <h1>New Tags For You</h1>
            {newOffersMapped}
            <h1>Open Tags You Started</h1>
            {pendingOffersAsPrimaryMapped}
            <h1>Open Tags Others Started</h1>
            {pendingOffersAsSecondaryMapped}
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   const {newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary} = reduxState.offers;

   return {
      userId: reduxState.user.userId,
      newOffers,
      pendingOffersAsPrimary,
      pendingOffersAsSecondary
   }
}

export default connect(mapStateToProps, 
   {
      updateOffers
   }
)(OpenOffers)