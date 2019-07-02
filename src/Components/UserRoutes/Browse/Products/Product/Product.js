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
      const {toggleBarterOffer} = this.state;

      const {user_id, item_name, item_desc, time_added, img_aws_url} = this.props.productView;

      let {item_condition} = this.props.productView;

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
         <div className=''>
            
            <div className='product_summary'>
            
               <div className='img_container'>
                  <img src={img_aws_url} alt={item_name} />
               </div>

               <span className='item_info'>
                  
                  <h5>{item_name}</h5>

                  <h5>Item Condition:</h5>
                  <p>{item_condition}</p>

                  <h5>About This Item:</h5> 
                  <p>{item_desc}</p>

               </span>
            </div>

            <div className='barter_section'>
               {this.props.userId !== user_id
               ?
                  <button 
                  name='toggleBarterOffer'
                  onClick={this.componentToggler}
                  >
                     {toggleBarterOffer ? 'Cancel' : 'Start Barter Tag!'}
                  </button>
               : 'You cannot make an offer for your own item.'
               }
               
               {toggleBarterOffer ? (
                  <>
                     <BarterOffer offerStatus='new' />

                     <h5>Choose from 1 to 3 of your items to offer, then click Tag!</h5>
                     
                     <Inventory />
                  </>
               ) : null }
            </div>
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