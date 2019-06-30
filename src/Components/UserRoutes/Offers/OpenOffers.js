import React, {Component} from 'react';
import {connect} from 'react-redux';
import BarterOffer from './BarterOffer';
import {updateOffers, fetchOfferItemsDetails, updateStatusToSeen} from '../../../redux/reducers/offersReducer';

class OpenOffers extends Component {
   constructor(props) {
      super(props);
      this.state = {
          displayOfferId: -1,
          lastDisplayedOfferId: -1,
          secondaryItemDetails: [],
          primaryItemsDetails: []
      };
      this.displayItemDetails = this.displayItemDetails.bind(this);
   }
   updateOffers() {
      const {userId, updateOffers} = this.props;
      updateOffers(userId);
   }
   displayItemDetails(e, secondaryItemId, primaryItem1Id, primaryItem2Id, primaryItem3Id, messageId, taggedUserId) {
      const offerId = parseInt(e.target.name);
      const {userId, fetchOfferItemsDetails, updateStatusToSeen} = this.props;

      // close current details view
      if (offerId === this.state.displayOfferId) {
         return this.setState({ 
            lastDisplayedOfferId: this.state.displayOfferId,
            displayOfferId: -1 
         })
      } else {
         this.setState({ displayOfferId: offerId })
      };

      // cancel fetch request if clicking same details consecutively
      if (offerId === this.state.lastDisplayedOfferId) return;

      // fetch offer details and set status to seen
      this.props.fetchOfferItemsDetails(secondaryItemId, primaryItem1Id, primaryItem2Id, primaryItem3Id)

      if (userId === taggedUserId) updateStatusToSeen(messageId);

   }
   render() {
      const {newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary} = this.props;
      const {displayOfferId} = this.state;

      // Display new offers from other users
      const newOffersMapped = newOffers.length > 0 
         ?
            newOffers.map(offer => {
               const {userId, secondaryItemDetails, primaryItemsDetails} = this.props;

               const {offer_id, time_initiated, tagged_user_id, username, secondary_user_id, city, state, secondary_item_id, primary_item1_id, primary_item2_id, primary_item3_id, sender_user_id, time_of_message, message_remark, message_status, message_text, offer_message_id} = offer;

               return (
                  <div key={`${offer_id}-${Date.now()}`}>
                     <div id='barter_offer_info'>
                        <span>
                           <p>Barter Start Date</p>
                           <p>{time_initiated}</p>
                        </span>

                        <span>
                           <p>Barter with {username} from {city}, {state}</p>
                        </span>

                        <span>
                           <p>Tagged User</p>
                           <p>{
                              tagged_user_id && tagged_user_id === userId
                                 ? `${username} is awaiting your response!`
                                 : `Awaiting ${username}'s response!` 
                           }</p>
                        </span>
                     </div>

                     <div id='barter_message'>
                        <span>
                           <p>Message Sender</p>
                           <p>{sender_user_id}</p>
                        </span>

                        <span>
                           <p>Message Status</p>
                           <p>{message_status}</p>
                        </span>

                        <span>
                           <p>Time of Message</p>
                           <p>{time_of_message}</p>
                        </span>

                        <span>
                           <p>Message Remark</p>
                           <p>{!message_remark ? 'No remark' : message_remark}</p>
                        </span>

                        <span>
                           <p>Message</p>
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
                              <BarterOffer offerStatus='pending' offerId={offer_id} secondaryUserIdPending={secondary_user_id} />

                              <div>
                                 <div>
                                    <p>Your Item</p>
                                    <span>
                                       <p>Item</p>
                                       <p>{secondaryItemDetails.item_name}</p>
                                    </span>

                                    <span>
                                       <p>Category</p>
                                       <p>{secondaryItemDetails.item_category}</p>
                                    </span>

                                    <span>
                                       <p>Condition</p>
                                       <p>{secondaryItemDetails.item_condition}</p>
                                    </span>

                                    <span>
                                       <img src={secondaryItemDetails.img_aws_url} alt='Item' />
                                       <p>{secondaryItemDetails.item_desc}</p>
                                    </span>

                                    <span>
                                       <p></p>
                                    </span>
                                 </div>
                              </div>

                              <div>
                                 <p>Their Offer</p>
                                 {primaryItemsDetails && primaryItemsDetails.map(primaryItemDetails => {
                                    return (
                                       <div key={`${primaryItemDetails.user_item_id}-${Date.now()}`}>
                                          <span>
                                             <p>Item</p>
                                             <p>{primaryItemDetails.item_name}</p>
                                          </span>

                                          <span>
                                             <p>Category</p>
                                             <p>{primaryItemDetails.item_category}</p>
                                          </span>

                                          <span>
                                             <p>Condition</p>
                                             <p>{primaryItemDetails.item_condition}</p>
                                          </span>

                                          <span>
                                             <img src={primaryItemDetails.img_aws_url} alt='Item' />
                                             <p>{primaryItemDetails.item_desc}</p>
                                          </span>

                                          <span>
                                             <p></p>
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
         : 'New Barter Tags Inbox is Empty.'

      // Display pending offers that user initiated
      const pendingOffersAsPrimaryMapped = pendingOffersAsPrimary.length > 0 
         ?
            pendingOffersAsPrimary.map(offer => {
               const {userId, secondaryItemDetails, primaryItemsDetails} = this.props;

               const {offer_id, time_initiated, tagged_user_id, username, secondary_user_id, city, state, secondary_item_id, primary_item1_id, primary_item2_id, primary_item3_id, sender_user_id, time_of_message, message_remark, message_status, message_text, offer_message_id} = offer;

               return (
                  <div key={`${offer_id}-${Date.now()}`}>
                     <div id='barter_offer_info'>
                        <span>
                           <p>Barter Start Date</p>
                           <p>{time_initiated}</p>
                        </span>

                        <span>
                           <p>Barter with {username} from {city}, {state}</p>
                        </span>

                        <span>
                           <p>Tagged User</p>
                           <p>{
                              tagged_user_id && tagged_user_id === userId
                                 ? `${username} is awaiting your response!`
                                 : `Awaiting ${username}'s response!` 
                           }</p>
                        </span>
                     </div>

                     <div id='barter_message'>
                        <span>
                           <p>Message Sender</p>
                           <p>{sender_user_id}</p>
                        </span>

                        <span>
                           <p>Message Status</p>
                           <p>{message_status}</p>
                        </span>

                        <span>
                           <p>Time of Message</p>
                           <p>{time_of_message}</p>
                        </span>

                        <span>
                           <p>Message Remark</p>
                           <p>{!message_remark ? 'No remark' : message_remark}</p>
                        </span>

                        <span>
                           <p>Message</p>
                           <p>{!message_text ? 'No message' : message_text}</p>
                        </span>
                     </div>

                     <button 
                        id={offer_message_id}
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
                                    <p>Their Item</p>
                                    <span>
                                       <p>Item</p>
                                       <p>{secondaryItemDetails.item_name}</p>
                                    </span>

                                    <span>
                                       <p>Category</p>
                                       <p>{secondaryItemDetails.item_category}</p>
                                    </span>

                                    <span>
                                       <p>Condition</p>
                                       <p>{secondaryItemDetails.item_condition}</p>
                                    </span>

                                    <span>
                                       <img src={secondaryItemDetails.img_aws_url} alt='Item' />
                                       <p>{secondaryItemDetails.item_desc}</p>
                                    </span>

                                    <span>
                                       <p></p>
                                    </span>
                                 </div>
                              </div>

                              <div>
                                 <p>Your Offer</p>
                                 {primaryItemsDetails && primaryItemsDetails.map(primaryItemDetails => {
                                    return (
                                       <div key={`${primaryItemDetails.user_item_id}-${Date.now()}`}>
                                          <span>
                                             <p>Item</p>
                                             <p>{primaryItemDetails.item_name}</p>
                                          </span>

                                          <span>
                                             <p>Category</p>
                                             <p>{primaryItemDetails.item_category}</p>
                                          </span>

                                          <span>
                                             <p>Condition</p>
                                             <p>{primaryItemDetails.item_condition}</p>
                                          </span>

                                          <span>
                                             <img src={primaryItemDetails.img_aws_url} alt='Item' />
                                             <p>{primaryItemDetails.item_desc}</p>
                                          </span>

                                          <span>
                                             <p></p>
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
         : 'No Pending Barter Tags.'
         
      // Display pending offers that other users initiated
      const pendingOffersAsSecondaryMapped = pendingOffersAsSecondary.length > 0 
         ?
            pendingOffersAsSecondary.map(offer => {
               const {userId, secondaryItemDetails, primaryItemsDetails} = this.props;

               const {offer_id, time_initiated, tagged_user_id, username, secondary_user_id, city, state, secondary_item_id, primary_item1_id, primary_item2_id, primary_item3_id, sender_user_id, time_of_message, message_remark, message_status, message_text, offer_message_id} = offer;

               return (
                  <div key={`${offer_id}-${Date.now()}`}>
                     <div id='barter_offer_info'>
                        <span>
                           <p>Barter Start Date</p>
                           <p>{time_initiated}</p>
                        </span>

                        <span>
                           <p>Barter with {username} from {city}, {state}</p>
                        </span>

                        <span>
                           <p>Tagged User</p>
                           <p>{
                              tagged_user_id && tagged_user_id === userId
                                 ? `${username} is awaiting your response!`
                                 : `Awaiting ${username}'s response!` 
                           }</p>
                        </span>
                     </div>

                     <div id='barter_message'>
                        <span>
                           <p>Message Sender</p>
                           <p>{sender_user_id}</p>
                        </span>

                        <span>
                           <p>Message Status</p>
                           <p>{message_status}</p>
                        </span>

                        <span>
                           <p>Time of Message</p>
                           <p>{time_of_message}</p>
                        </span>

                        <span>
                           <p>Message Remark</p>
                           <p>{!message_remark ? 'No remark' : message_remark}</p>
                        </span>

                        <span>
                           <p>Message</p>
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
                                 : null
                              }

                              <div>
                                 <div>
                                    <p>Your Item</p>
                                    <span>
                                       <p>Item</p>
                                       <p>{secondaryItemDetails.item_name}</p>
                                    </span>

                                    <span>
                                       <p>Category</p>
                                       <p>{secondaryItemDetails.item_category}</p>
                                    </span>

                                    <span>
                                       <p>Condition</p>
                                       <p>{secondaryItemDetails.item_condition}</p>
                                    </span>

                                    <span>
                                       <img src={secondaryItemDetails.img_aws_url} alt='Item' />
                                       <p>{secondaryItemDetails.item_desc}</p>
                                    </span>

                                    <span>
                                       <p></p>
                                    </span>
                                 </div>
                              </div>

                              <div>
                                 <p>Their Offer</p>
                                 {primaryItemsDetails && primaryItemsDetails.map(primaryItemDetails => {
                                    return (
                                       <div key={`${primaryItemDetails.user_item_id}-${Date.now()}`}>
                                          <span>
                                             <p>Item</p>
                                             <p>{primaryItemDetails.item_name}</p>
                                          </span>

                                          <span>
                                             <p>Category</p>
                                             <p>{primaryItemDetails.item_category}</p>
                                          </span>

                                          <span>
                                             <p>Condition</p>
                                             <p>{primaryItemDetails.item_condition}</p>
                                          </span>

                                          <span>
                                             <img src={primaryItemDetails.img_aws_url} alt='Item' />
                                             <p>{primaryItemDetails.item_desc}</p>
                                          </span>

                                          <span>
                                             <p></p>
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
         : 'No Pending Barter Tags.'

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
      secondaryItemDetails,
      updateStatusToSeen
   }
}

export default connect(mapStateToProps, 
   {
      updateOffers,
      fetchOfferItemsDetails
   }
)(OpenOffers)