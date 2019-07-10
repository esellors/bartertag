import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux';
import {updateInventory} from '../../../redux/reducers/inventoryReducer';
import {addBarteringItem, removeBarteringItem, clearBarteringItems} from '../../../redux/reducers/offersReducer';

class ViewInventory extends Component {
   constructor(props) {
      super(props);
      this.deleteInventoryItem = this.deleteInventoryItem.bind(this);
      this.checkBoxHandler = this.checkBoxHandler.bind(this);
   }
   componentDidMount() {
      const {userId, updateInventory} = this.props;
      if (this.props.allInventory.length === 0) updateInventory(userId);
   }  
   componentWillUnmount() {
      if (this.props.barterMode) this.props.clearBarteringItems();
   }
   deleteInventoryItem(e) {
      e.preventDefault();
      const inventoryIdStr = e.target.name;
      const {userId} = this.props;

      const splitIndex = inventoryIdStr.indexOf('*');
      const dbId = inventoryIdStr.slice(0, splitIndex);
      const key = inventoryIdStr.slice(splitIndex + 1)

      Promise.all([
         Axios.delete('/api/inventory/details/delete', { data: {dbId} }),
         Axios.delete('/api/inventory/img/delete', { data: {key: [{key}]} })
      ]).then(([detailsDeleteRes, imgDeleteRes]) => {
         console.log(detailsDeleteRes)
         console.log(imgDeleteRes)
      }).catch(err => console.log(err));

      this.props.updateInventory(userId);
   }
   checkBoxHandler(e) {
      const itemId = parseInt(e.target.name)
      const {toBarterItems, addBarteringItem, removeBarteringItem} = this.props;
      const checked = toBarterItems.includes(itemId);

      if (checked) {
         removeBarteringItem(itemId);
      } else if (toBarterItems.length < 3) {
         addBarteringItem(itemId);
      } else {
         alert('Maximum of 3 items allowed')
      };
   }
   render() {
      const {allInventory, barterMode, toBarterItems} = this.props;

      const allInventoryMapped =  allInventory && allInventory.length > 0 
         ? allInventory.map((item, i) => {
            let {user_item_id, time_added, item_name, item_condition, item_desc, img_aws_url, img_aws_key} = item;

            let dateString = new Date(`${time_added}`).toString();

            switch(item_condition) {
               case '1':
                  item_condition = 'Poor'
                  break;
               case '2':
                  item_condition = 'Fair'
                  break;
               case '3':
                  item_condition = 'Good'
                  break;
               case '4':
                  item_condition = 'Great'
                  break;
               case '5':
                  item_condition = 'Excellent'
                  break;
               default: return 'Unknown Condition'
            };

            return (
               <div className='inventory_item' key={i}>

                  {barterMode ? null : (
                     <>
                        <p>Added: {dateString}</p>
                     </>
                  )}
                  
                  <h5>{item_name}</h5>
                  <img src={img_aws_url} alt='Inventory Item' />

                  {barterMode ? null : (
                     <>
                        <h5>CONDITION</h5>
                        <p>{item_condition}</p>
                        <h5>DESCRIPTION</h5>
                        <p>{item_desc}</p>
                     </>
                  )}

                  {barterMode ? (
                     <div className='select_barter_item'>
                        <p>Offer this item:</p>
                        <input 
                           type='checkbox'
                           name={user_item_id}
                           onChange={this.checkBoxHandler}
                           checked={toBarterItems.includes(user_item_id)}
                        />
                     </div>
                  ) : (
                     <>
                        <Link from='/inventory' to={`/inventory/update/${user_item_id}`}>
                           <button>Edit</button>
                        </Link>
                        <button 
                           name={`${user_item_id}*${img_aws_key}`}
                           onClick={this.deleteInventoryItem}
                        >Delete</button>
                     </>
                  )}
               </div>
            );
         })
         : <p>Nothing in your inventory, yet.</p>

      return (
         <div>
            <h5>Your Inventory</h5>
            {allInventoryMapped}
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      userId: reduxState.user.userId,
      allInventory: reduxState.inventory.allInventory,
      barterMode: reduxState.offers.barterMode,
      toBarterItems: reduxState.offers.toBarterItems
   }
}

export default connect(mapStateToProps, 
   {
      updateInventory,
      addBarteringItem,
      removeBarteringItem,
      clearBarteringItems
   }
)(ViewInventory);