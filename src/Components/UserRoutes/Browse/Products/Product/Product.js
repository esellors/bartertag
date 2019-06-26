import React, {Component} from 'react';
import{connect} from 'react-redux';

class Product extends Component {
   render() {

      const {item_name, item_condition, item_desc, time_added, img_aws_url} = this.props.productView;
 
      return (
         <div>
            <time>{time_added}</time>
            <h1>{item_name}</h1>
            <p>{item_condition}</p>
            <img src={img_aws_url} />
            <p>{item_desc}</p>
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return {
      productView: reduxState.products.productView
   };
}

export default connect(mapStateToProps)(Product)