import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux';
import {getAllInventory, setAllInvToRefresh} from '../../../redux/reducers/inventoryReducer';

class ViewInventory extends Component {
   constructor(props) {
      super(props);
      this.state = {
         inputKey: Date.now()
      }
      this.deleteInventoryItem = this.deleteInventoryItem.bind(this);
   }
   componentDidMount() {
      if (this.props.allInventory.length === 0 || this.props.needsRefresh) {
         this.refreshInventory();
      }
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
   render() {
      const {allInventory} = this.props;

      const mappedInventory = allInventory.map((item, i) => {
         let {user_item_id, time_added, item_name, item_condition, item_desc, img_aws_url, img_aws_key} = item;

         let dateString = new Date(`${time_added}`).toString();

         return (
            <div key={user_item_id}>
               <h2>DATE ADDED</h2>
               <p>{dateString}</p>
               <h2>TITLE</h2>
               <p>{item_name}</p>
               <img src={img_aws_url} alt='Inventory Item' />
               <h2>CONDITION</h2>
               <p>{item_condition}</p>
               <h2>DESCRIPTION</h2>
               <p>{item_desc}</p>
               <Link from='/inventory' to={`/inventory/update/${user_item_id}`}>
                  <button>Edit</button>
               </Link>
               <button 
                  name={`${user_item_id}*${img_aws_key}`}
                  onClick={this.deleteInventoryItem}
               >Delete</button>
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
      needsRefresh: reduxState.inventory.allInvToRefresh
   }
}

export default connect(mapStateToProps, 
   {
      setAllInvToRefresh,
      getAllInventory
   }
)(ViewInventory);