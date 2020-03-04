import React, { Component } from 'react'
import {connect} from 'react-redux';
import BarterOffer from './BarterOffer';
import {fetchOfferItemsDetails, updateStatusToSeen} from '../../../redux/reducers/offersReducer';

class AsPrimaryTagger extends Component {
    constructor() {
        super();
        this.state = {
            offers: [],
            displayOfferId: null,
            lastDisplayedOfferId: null
        }
    }
    componentDidUpdate(prevProps) {
        const {offers} = this.props;

        if (offers !== prevProps.offers) {
            const filteredOffers = [];

            offers.forEach(offer => {
                let index = filteredOffers.findIndex(filteredOffer => filteredOffer.offer_id === offer.offer_id);

                if (index < 0) filteredOffers.push(offer)
            });

            this.setState({offers: filteredOffers});
        }
    }
    displayItemDetails(e, secondaryItemId, primaryItem1Id, primaryItem2Id, primaryItem3Id, messageId, taggedUserId) {
      const offerId = parseInt(e.target.name);
      const {userId, fetchOfferItemsDetails, updateStatusToSeen} = this.props;

      // close current details view
      if (offerId === this.state.displayOfferId) {
         return this.setState({ 
            lastDisplayedOfferId: this.state.displayOfferId,
            displayOfferId: null 
         })
      } else {
         this.setState({ displayOfferId: offerId })
      };

      // cancel fetch request if clicking same details consecutively
      if (offerId === this.state.lastDisplayedOfferId) return;

      // fetch offer details and set status to seen
      fetchOfferItemsDetails(secondaryItemId, primaryItem1Id, primaryItem2Id, primaryItem3Id)

      if (userId === taggedUserId) updateStatusToSeen(messageId);

   }
    render() {
        const {offers, displayOfferId} = this.state;
        const {section} = this.props;

        return offers.length > 0 
         ?
            offers.map((offer, i) => {
               const {userId, secondaryItemDetails, primaryItemsDetails} = this.props;

               const {offer_id, time_initiated, tagged_user_id, username, secondary_user_id, city, state, secondary_item_id, primary_item1_id, primary_item2_id, primary_item3_id, sender_user_id, time_of_message, message_remark, message_status, message_text, offer_message_id} = offer;

               return (
                  <div className='offers_detail' key={`${i + section}-secondary-${offer_id}`}>
                     <div id='barter_offer_info'>
                        <span>
                           <h5>Barter Start Date</h5>
                           <p>{time_initiated}</p>
                        </span>

                        <span>
                           <h5>Barter with</h5>
                           <p>{username} from {city}, {state}</p>
                        </span>

                        <span>
                           <h5>Tagged User</h5>
                           <p>{
                              tagged_user_id && tagged_user_id === userId
                                 ? `${username} is awaiting your response!`
                                 : `Awaiting ${username}'s response!` 
                           }</p>
                        </span>
                     </div>

                     <div id='barter_message'>
                        <span>
                           <h5>Message Sender</h5>
                           <p>{
                              tagged_user_id && tagged_user_id === userId
                                 ? username
                                 : 'You'
                           }</p>
                        </span>

                        <span>
                           <h5>Message Status</h5>
                           <p>{message_status}</p>
                        </span>

                        <span>
                           <h5>Time of Message</h5>
                           <p>{time_of_message}</p>
                        </span>

                        <span>
                           <h5>Message Remark</h5>
                           <p>{!message_remark ? 'No remark' : message_remark}</p>
                        </span>

                        <span>
                           <h5>Message</h5>
                           <p>{!message_text ? 'No message' : message_text}</p>
                        </span>
                     </div>

                     <button 
                        name={offer_id} 
                        onClick={e => this.displayItemDetails(e, secondary_item_id, primary_item1_id, primary_item2_id, primary_item3_id, offer_message_id, tagged_user_id)}>Details &amp; Respond
                     </button>

                     {/* display offer details if user clicks to view them */}
                     {displayOfferId === offer_id
                        ?
                           <>
                              {/* allow user to respond if they are tagged */}
                              {tagged_user_id && tagged_user_id === userId
                                 ? <BarterOffer offerStatus='pending' offerId={offer_id} secondaryUserIdPending={secondary_user_id} />
                                 : null }

                              <div>
                                 <div>
                                    <h5>Their Item</h5>
                                    <span>
                                       <h5>Item</h5>
                                       <p>{secondaryItemDetails.item_name}</p>
                                    </span>

                                    <span>
                                       <h5>Category</h5>
                                       <p>{secondaryItemDetails.item_category}</p>
                                    </span>

                                    <span>
                                       <h5>Condition</h5>
                                       <p>{secondaryItemDetails.item_condition}</p>
                                    </span>

                                    <span>
                                       <img src={secondaryItemDetails.img_aws_url} alt='Item' />
                                       <p>{secondaryItemDetails.item_desc}</p>
                                    </span>
                                 </div>
                              </div>

                              <div>
                                 <h5>Your Offer</h5>
                                 {primaryItemsDetails && primaryItemsDetails.map((primaryItemDetails, i) => {

                                    switch(primaryItemDetails.item_condition) {
                                       case '1':
                                          primaryItemDetails.item_condition = 'Poor'
                                          break;
                                       case '2':
                                          primaryItemDetails.item_condition = 'Fair'
                                          break;
                                       case '3':
                                          primaryItemDetails.item_condition = 'Good'
                                          break;
                                       case '4':
                                          primaryItemDetails.item_condition = 'Great'
                                          break;
                                       case '5':
                                          primaryItemDetails.item_condition = 'Excellent'
                                          break;
                                       default: break;
                                    };

                                    return (
                                       <div key={`${i + section}-primary-${primaryItemDetails.user_item_id}`}>
                                          <span>
                                             <h5>Item</h5>
                                             <p>{primaryItemDetails.item_name}</p>
                                          </span>

                                          <span>
                                             <h5>Category</h5>
                                             <p>{primaryItemDetails.item_category}</p>
                                          </span>

                                          <span>
                                             <h5>Condition</h5>
                                             <p>{primaryItemDetails.item_condition}</p>
                                          </span>

                                          <span>
                                             <img src={primaryItemDetails.img_aws_url} alt='Item' />
                                             <p>{primaryItemDetails.item_desc}</p>
                                          </span>
                                       </div>
                                    );
                                 })}
                              </div>
                           </>
                        : null
                     }
                  </div>
               );
            })
         : 'Nothing to see here.'
    }
}

const mapStateToProps = reduxState => {
   return {
      userId: reduxState.user.userId,
      primaryItemsDetails: reduxState.offers.primaryItemsDetails,
      secondaryItemDetails: reduxState.offers.secondaryItemDetails
      
   }
}

export default connect(mapStateToProps, 
   {
      fetchOfferItemsDetails,
      updateStatusToSeen
   }
)(AsPrimaryTagger)