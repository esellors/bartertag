import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setBarterMode} from '../../../../../redux/reducers/offersReducer';
import BarterOffer from '../../../Offers/BarterOffer';
import Inventory from '../../../Inventory/ViewInventory';

class Product extends Component {
   constructor(props) {
      super(props);
      this.state = {
          toggleBarterOffer: false
      };
      this.componentToggler = this.componentToggler.bind(this);
   }
   componentDidMount() {
      this.props.setBarterMode(true);
   }
   componentWillUnmount() {
      this.props.setBarterMode(false);
   }
   componentToggler(e) {
      const {name} = e.target;

      this.setState({ [name]: !this.state[name] })
   }
   render() {

      const {user_id, item_name, item_condition, item_desc, time_added, img_aws_url} = this.props.productView;

      const {toggleBarterOffer} = this.state;
 
      return (
         <div>
            <time>{time_added}</time>
            <h1>{item_name}</h1>
            <p>{item_condition}</p>
            <img src={img_aws_url} alt='User Item' />
            <p>{item_desc}</p>

            {this.props.userId !== user_id
            ?
               <button 
               name='toggleBarterOffer'
               onClick={this.componentToggler}
               >
                  {toggleBarterOffer ? 'Cancel' : 'Start Barter Tag!'}
               </button>
            : null
            }
            
            {toggleBarterOffer ? (
               <>
                  <BarterOffer offerStatus='new' />
                  <Inventory />
               </>
            ) : null }
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      productView: reduxState.products.productView,
      userId: reduxState.user.userId
   };
}

export default connect(mapStateToProps,
   {
      setBarterMode
   }
)(Product)