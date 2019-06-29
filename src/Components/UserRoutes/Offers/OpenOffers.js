import React, {Component} from 'react';
import {connect} from 'react-redux';
import BarterOffer from './BarterOffer';
import {updateOffers, fetchOfferItemsDetails} from '../../../redux/reducers/offersReducer';

class OpenOffers extends Component {
   constructor(props) {
      super(props);
      this.state = {
          displayOfferId: -1,
          secondaryItemDetails: [],
          primaryItemsDetails: []
      };
      this.displayItemDetails = this.displayItemDetails.bind(this);
   }
   updateOffers() {
      const {userId, updateOffers} = this.props;
      updateOffers(userId);
   }
   displayItemDetails(e, secondaryItemId, primaryItem1Id, primaryItem2Id, primaryItem3Id) {
      const offerId = parseInt(e.target.name);

      if (offerId === this.state.displayOfferId) {
         return this.setState({ displayOfferId: -1 })
      } else {
         this.setState({ displayOfferId: offerId })
      };

      this.props.fetchOfferItemsDetails(secondaryItemId, primaryItem1Id, primaryItem2Id, primaryItem3Id)
   }
   render() {
       const {newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary} = this.props;
      const {displayOfferId} = this.state;

      // Display new offers from other users
      const newOffersMapped = newOffers.length !== 0 
         ?
            newOffers.map(offer => {
               const {offer_id, secondary_user_id, secondary_item_id, primary_item1_id, primary_item2_id, primary_item3_id} = offer;

               return (
                  <div key={offer_id}>
                     <h1>{secondary_user_id}</h1>
                     <BarterOffer />
                     <button 
                        name={offer_id} 
                        onClick={e => this.displayItemDetails(e, secondary_item_id, primary_item1_id, primary_item2_id, primary_item3_id)}>Toggle Details
                     </button>
                     {
                        displayOfferId === offer_id
                        ?
                           <h1>hi</h1>
                        : null
                     }
                  </div>
               );
            })
         : 'You have no new offers.'

      // Display pending offers that user initiated
      const pendingOffersAsPrimaryMapped = pendingOffersAsPrimary.length !== 0 
         ?
            pendingOffersAsPrimary.map(offer => {
               const {offer_id, secondary_user_id} = offer;

               return (
                  <div key={offer_id}>
                     <h1>{secondary_user_id}</h1>
                  </div>
               );
            })
         : 'No pending offers.'
         
      // Display pending offers that other users initiated
      const pendingOffersAsSecondaryMapped = pendingOffersAsSecondary.length !== 0 
         ?
            pendingOffersAsSecondary.map(offer => {
               return (
                  <div>
                     <h1>{offer.secondary_user_id}</h1>

                  </div>
               );
            })
         : 'No pending offers.'

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
   const {newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary, primaryItemsDetails, secondaryItemDetails} = reduxState.offers;

   return {
      userId: reduxState.user.userId,
      newOffers,
      pendingOffersAsPrimary,
      pendingOffersAsSecondary,
      primaryItemsDetails,
      secondaryItemDetails
   }
}

export default connect(mapStateToProps, 
   {
      updateOffers,
      fetchOfferItemsDetails
   }
)(OpenOffers)