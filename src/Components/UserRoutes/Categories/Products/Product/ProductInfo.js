import React, {Component} from 'react';
import OwnerSummary from './OwnerInfo/OwnerSummary';
import BarterOffer from './BarterOffer';

class ProductInfo extends Component {
   // constructor(props) {
   //    super(props);
   //    this.state = {
   //        barterOfferToggle: false
   //    };
   //    this.handleBarterOfferToggle = this.handleBarterOfferToggle.bind(this);
   // }
   // handleBarterOfferToggle(e) {
   //    e.preventDefault();
   //    this.setState(prevState => ({ 
   //       barterOfferToggle: !prevState.barterOfferToggle
   //    }));
   // }
   render() {
      return (
         <div>
            {OwnerSummary}

            <h1>ProductInfo</h1>

            <button>Make Offer</button>

            {BarterOffer}
            
         </div>
      );
   }
}

export default ProductInfo