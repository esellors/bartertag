import React, {Component} from 'react';
import {connect} from 'react-redux';
import updateOffers from '../../../redux/reducers/offersReducer';

class ClosedOffers extends Component {
   render() {

      const {closedOffersAsPrimary, closedOffersAsSecondary} = this.props;

      const closedOffersAsPrimaryMapped = closedOffersAsPrimary.length > 0
         ?
            closedOffersAsPrimary.map(offer => {

               const {offer_id, time_initiated, time_finalized, finalizing_user_id, finalizing_remark} = offer;

               const {userId} = this.props;

               const finalizingUser = userId === finalizing_user_id ? 'YOU' : 'THEM';

               return (
                  <div className='offer_closed' key={`${offer_id}-${Date.now()}`}>
                     <p>BarterTag closed by {finalizingUser} on {time_finalized}.</p>
                     <p>Closing Tag Remark: {finalizing_remark}</p>
                     <p>Tag first initiated on {time_initiated}</p>
                  </div>
               );
            })
         : 'No Closed Barter Tags to Show.'

      const closedOffersAsSecondaryMapped = closedOffersAsSecondary.length > 0
      ?
         closedOffersAsSecondary.map(offer => {

            const {offer_id, time_initiated, time_finalized, finalizing_user_id, finalizing_remark} = offer;

            const {userId} = this.props;

            const finalizingUser = userId === finalizing_user_id ? 'YOU' : 'THEM';

            return (
               <div className='offer_closed' key={`${offer_id}-${Date.now()}`}>
                  <p>BarterTag closed by {finalizingUser} on {time_finalized}.</p>
                     <p>Closing Tag Remark: {finalizing_remark}</p>
                     <p>Tag first initiated on {time_initiated}</p>
               </div>
            );
         })
      : 'No Closed Barter Tags to Show.'

      return (
         <div className='closed_offers'>
            <h5>Closed Offers that You Started</h5>
            {closedOffersAsPrimaryMapped}

            <h5>Closed Offers Others Started</h5>
            {closedOffersAsSecondaryMapped}
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   const {closedOffersAsPrimary, closedOffersAsSecondary} = reduxState.offers;

   return {
      userId: reduxState.user.userId,
      closedOffersAsPrimary,
      closedOffersAsSecondary
   }
}

export default connect(mapStateToProps, 
   {
      updateOffers
   }
)(ClosedOffers)