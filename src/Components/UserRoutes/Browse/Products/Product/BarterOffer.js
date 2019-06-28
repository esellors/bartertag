import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Axios from 'axios';





// add barter thing to mapped out open offers w/ ability to close offer
// map out closed offers
// notifications
// user info page and reviews





class BarterOffer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userMessage: '',
         userMessageRemark: '',
         barteringItems: []
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleTagButton = this.handleTagButton.bind(this);
   }
   handleInputChange(e) {
      const {name, value} = e.target;
      this.setState({ [name]: value });
   }
   handleTagButton(e) {
      e.preventDefault();
      const {offerStatus, primaryUserId, secondaryUserId, primaryItemsIds, secondaryItemId} = this.props;
      let {userMessage, userMessageRemark} = this.state;

      if (userMessage === '') userMessage = null;
      if (userMessageRemark === '') userMessageRemark = null;

      const primaryItem1Id = primaryItemsIds[0] || null;
      const primaryItem2Id = primaryItemsIds[1] || null;
      const primaryItem3Id = primaryItemsIds[2] || null;

      console.log(primaryItemsIds)

      if (offerStatus === 'new') {
         if (primaryItem1Id === null) return alert('You must choose which of your items to offer!');
         
         Axios
            .post('/api/offers/create', 
               {
                  offerStatus, 
                  primaryUserId, 
                  secondaryUserId,
                  taggedUserId: secondaryUserId,
                  primaryItem1Id,
                  primaryItem2Id,
                  primaryItem3Id,
                  secondaryItemId,
                  senderUserId: primaryUserId,
                  messageStatus: 'unread',
                  userMessage,
                  userMessageRemark,
                  notificationStatus: 'unread'
               })
            .then(res => {
               alert(res.data)
               this.props.history.goBack();
            })
            .catch(err => {
               console.log(err);
               alert('Something went wrong.');
            })
      }



   }
   render() {

      const{offerStatus} = this.props;

      const newOfferNotice = 'Clicking "Tag!" will start your offer and send any message you enter. The other person must respond before you can send another message. That\'s Barter Tag!'

      return (
         <div>
            <h1>BarterOffer</h1>
            <form>
               <label htmlFor='userMessage'>Message (75 char max):</label>
               <input 
                  type='text'
                  maxLength='75'
                  placeholder='Optional Message: 75 characters max'
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
                  <option value='' disabled>Optional Remarks:</option>
                  <option value=''>None</option>
                  <option value='Tell me more about the specs.'>Tell me more about the specs.</option>
                  <option value='Tell me more about features.'>Tell me more about features.</option>
                  <option value='How do you use the item?'>How do you use the item?</option>
                  <option value='What are the flaws/issues with the item?'>What are the flaws/issues with the item?</option>
                  <option value='How many owners has the item had?'>How many owners has the item had?</option>
                  <option value='I have gotten a better offer.'>I have gotten a better offer.</option>
                  <option value='Not interested. Thanks.'>Not interested. Thanks.</option>
                  <option value='Not interested. What else can you offer?'>Not interested. What else can you offer?</option>
               </select>
               {offerStatus === 'new' ? <p>{newOfferNotice}</p> : null }
               <button onClick={this.handleTagButton}>Tag!</button>
            </form>
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   const {offers, products, user} = reduxState;

   return {
      primaryUserId: user.userId,
      secondaryUserId: products.productView.user_id,
      primaryItemsIds: offers.toBarterItems,
      secondaryItemId: products.productView.user_item_id
   }
}

export default withRouter(connect(mapStateToProps)(BarterOffer))