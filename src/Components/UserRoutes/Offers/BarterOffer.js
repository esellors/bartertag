import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {createNewOffer, respondToOffer, updateOffers} from '../../../redux/reducers/offersReducer';

class BarterOffer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userMessage: '',
         userMessageRemark: '',
         closeRemark: '',
         finalizingUserId: '',
         barteringItems: []
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleTagButton = this.handleTagButton.bind(this);
   }
   handleInputChange(e) {
      const {name, value} = e.target;

      if (name === 'closeRemark') this.setState({ finalizingUserId: this.props.userId });

      this.setState({ [name]: value });
   }
   handleTagButton(e) {
      e.preventDefault();

      const {primaryUserId, secondaryUserIdNew, primaryItemsIds, secondaryItemId, createNewOffer, respondToOffer, updateOffers} = this.props;

      let {offerStatus} = this.props;

      let {userMessage, userMessageRemark} = this.state;
      if (userMessage === '') userMessage = null;
      if (userMessageRemark === '') userMessageRemark = null;

      const primaryItem1Id = primaryItemsIds[0] || null;
      const primaryItem2Id = primaryItemsIds[1] || null;
      const primaryItem3Id = primaryItemsIds[2] || null;

      // Creating new offer
      if (offerStatus === 'new') {
         if (primaryItem1Id === null) return alert('You must choose which of your items to offer!');

         const {goBack} = this.props.history;

         return createNewOffer(
            {
               offerStatus, 
               primaryUserId, 
               secondaryUserIdNew,
               taggedUserId: secondaryUserIdNew,
               primaryItem1Id,
               primaryItem2Id,
               primaryItem3Id,
               secondaryItemId,
               senderUserId: primaryUserId,
               messageStatus: 'unseen',
               userMessage,
               userMessageRemark,
               notificationStatus: 'unseen'
            }, goBack);
      };

      // Responding to current offer
      if (offerStatus === 'pending') {
         const {closeRemark, finalizingUserId} = this.state;
         const {secondaryUserIdPending} = this.props;

         if (!userMessage && !userMessageRemark && !closeRemark) return alert('You have not created a response.');
         
         const {offerId, userId} = this.props;

         const taggedUserId = userId === primaryUserId ? secondaryUserIdPending : userId;

         offerStatus = closeRemark ? 'closed' : offerStatus;

         respondToOffer(
            {
               offerId,
               offerStatus,
               closeRemark,
               finalizingUserId,
               taggedUserId,
               senderUserId: userId,
               messageStatus: 'unseen',
               userMessage,
               userMessageRemark,
               notificationStatus: 'unseen'
            });

         return updateOffers(userId);
      };

   }
   render() {

      const{offerStatus} = this.props;

      const newOfferNotice = 'Clicking "Tag!" will start your offer and send any message you enter. The other person must respond before you can send another message. That\'s BarterTag!'

      return (
         <>
            <h5>Messages are nice!</h5>
            <form>
               <span>
                  <input 
                     type='text'
                     maxLength='75'
                     placeholder='Message: 75 chars max'
                     onChange={this.handleInputChange}
                     value={this.state.userMessage}
                     name='userMessage'
                     id='userMessage'
                  />

                  <select
                     onChange={this.handleInputChange}
                     value={this.state.userMessageRemark}
                     name='userMessageRemark'
                  >
                     <option value='' disabled>Optional Remark:</option>
                     <option value=''></option>
                     <option value='Tell me more about the specs.'>Tell me more about the specs.</option>
                     <option value='Tell me more about features.'>Tell me more about features.</option>
                     <option value='How do you use the item?'>How do you use the item?</option>
                     <option value='What are the flaws/issues with the item?'>What are the flaws/issues with the item?</option>
                     <option value='How many owners has the item had?'>How many owners has the item had?</option>
                     <option value='I have gotten a better offer.'>I have gotten a better offer.</option>
                     <option value='Not interested. Thanks.'>Not interested. Thanks.</option>
                     <option value='Not interested. What else can you offer?'>Not interested. What else can you offer?</option>
                  </select>

                  {this.props.offerStatus === 'pending'
                  ?
                     <select 
                        onChange={this.handleInputChange}
                        value={this.state.closeRemark}
                        name='closeRemark'
                     >
                        <option value='' disabled>Optional: Close offer?</option>
                        <option value=''></option>
                        <option value='Not Interested'>Not Interested</option>
                        <option value='Cannot Reach Agreement'>Cannot Reach Agreement</option>
                        <option value='Barter Trade Made'>Barter Trade Made</option>
                     </select>
                  : null }
               </span>

               {offerStatus === 'new' ? <p>{newOfferNotice}</p> : null }
               
               <button onClick={this.handleTagButton}>Tag!</button>
            </form>
         </>
      );
   }
}

const mapStateToProps = reduxState => {
   const {offers, products, user} = reduxState;

   return {
      userId: user.userId,
      primaryUserId: user.userId,
      secondaryUserIdNew: products.productView.user_id,
      primaryItemsIds: offers.toBarterItems,
      secondaryItemId: products.productView.user_item_id
   }
}

export default withRouter(connect(mapStateToProps, 
   {
      createNewOffer,
      respondToOffer,
      updateOffers
   }
)(BarterOffer))