import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux';
import {getAllInventory, setAllInvToRefresh} from '../../../redux/reducers/inventoryReducer';
import {addBarteringItem, removeBarteringItem, clearBarteringItems} from '../../../redux/reducers/offersReducer';

class ViewInventory extends Component {
   constructor(props) {
      super(props);
      this.state = {
         inputKey: Date.now()
      }
      this.deleteInventoryItem = this.deleteInventoryItem.bind(this);
      this.checkBoxHandler = this.checkBoxHandler.bind(this);
   }
   componentDidMount() {
      if (this.props.allInventory.length === 0 || this.props.needsRefresh) {
         this.refreshInventory();
      }
   }
   componentWillUnmount() {
      if (this.props.barterMode) this.props.clearBarteringItems();
   }
   refreshInventory() {
      this.props.setAllInvToRefresh(false);

      Axios
         .get(`/api/inventory/getallinventory/${this.props.userId}`)
         .then(res => this.props.getAllInventory(res.data));

      this.setState({ inputKey: Date.now() })
   };
   deleteInventoryItem(e) {
      e.preventDefault();
      const inventoryIdStr = e.target.name;

      const splitIndex = inventoryIdStr.indexOf('*');
      const dbId = inventoryIdStr.slice(0, splitIndex);
      const key = inventoryIdStr.slice(splitIndex + 1)

      Promise.all([
         Axios.delete('/api/inventory/details/delete', { data: {dbId} }),
         Axios.delete('/api/inventory/img/delete', { data: {key: [{key}]} })
      ]).then(([detailsDeleteRes, imgDeleteRes]) => {
         console.log(detailsDeleteRes)
         console.log(imgDeleteRes)
      }).catch(err => {
         alert('Error: Check console for details.')
         console.log(err.request)
      }); 

      this.refreshInventory();
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

      const mappedInventory = allInventory && allInventory.length === 0 
         ? 'Nothing in your inventory'
         : allInventory.map((item, i) => {
            let {user_item_id, time_added, item_name, item_condition, item_desc, img_aws_url, img_aws_key} = item;

            let dateString = new Date(`${time_added}`).toString();

            return (
               <div key={user_item_id}>

                  {barterMode ? null : (
                     <>
                        <h2>DATE ADDED</h2>
                        <p>{dateString}</p>
                     </>
                  )}
                  
                  <h2>TITLE</h2>
                  <p>{item_name}</p>
                  <img src={img_aws_url} alt='Inventory Item' />

                  {barterMode ? null : (
                     <>
                        <h2>CONDITION</h2>
                        <p>{item_condition}</p>
                        <h2>DESCRIPTION</h2>
                        <p>{item_desc}</p>
                     </>
                  )}

                  {barterMode ? (
                     <>
                        <p>Offer this item:</p>
                        <input 
                           type='checkbox'
                           name={user_item_id}
                           onChange={this.checkBoxHandler}
                           checked={toBarterItems.includes(user_item_id)}
                        />
                     </>
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

      return (
         <div>
            <h1>View Inventory</h1>
            {mappedInventory}
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      userId: reduxState.user.userId,
      allInventory: reduxState.inventory.allInventory,
      needsRefresh: reduxState.inventory.allInvToRefresh,
      barterMode: reduxState.offers.barterMode,
      toBarterItems: reduxState.offers.toBarterItems
   }
}

export default connect(mapStateToProps, 
   {
      setAllInvToRefresh,
      getAllInventory,
      addBarteringItem,
      removeBarteringItem,
      clearBarteringItems
   }
)(ViewInventory);