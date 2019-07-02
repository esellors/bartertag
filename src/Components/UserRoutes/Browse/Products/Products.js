import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import {setProduct} from '../../../../redux/reducers/productsReducer';

class Products extends Component {
   constructor(props) {
      super(props);
      this.state = {
          categoryProducts: []
      };
   }
   componentDidMount() {
      this.getCategoryProducts()
   }
   getCategoryProducts() {
      const {category} = this.props.match.params;

      Axios 
         .get(`/api/products/getcategoryproducts/${category}`)
         .then(res => this.setState({ categoryProducts: res.data }) )
         .catch(err => console.log(err.request));
   }
   navToProduct(e, prodObj, prodId) {
      e.preventDefault();
      const {category} = this.props.match.params;

      this.props.setProduct(prodObj);
      this.props.history.push(`/browse/${category}/${prodId}`)
   }
   render() {
      
      const {categoryProducts} = this.state;

      const categoryProductsMapped = categoryProducts.length > 0 ?
         categoryProducts.map((product, i) => {

            const {user_item_id, item_name, img_aws_url, time_added} = product;

            let {item_condition} = product;

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
                  <div className='product_summary' key={i}>
            
                        <div className='img_container'>
                           <img src={img_aws_url} alt={item_name} />
                        </div>

                        <span className='item_info'>
                           <button onClick={e => this.navToProduct(e, product, user_item_id)}>View</button>

                           <h5>{item_name}</h5>

                           <p>Item Condition: {item_condition}</p>

                           <p>Added: {time_added}</p>

                        </span>

                  </div>
               )
            })
         : 'Nothing to display'
    
      return (
         <div>
            <h4>Browsing: {this.props.match.params.category}</h4>
            {categoryProductsMapped}
         </div>
      );
   }
}

export default connect(null, 
   {
      setProduct
   }
)(Products)