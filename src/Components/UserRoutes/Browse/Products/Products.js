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
         .then(res => { this.setState({ categoryProducts: res.data })
         })
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

            const {user_item_id, item_name, img_aws_url} = product;

               return (
                  <div key={i}>
                     <h1>{item_name}</h1>
                     <img src={img_aws_url} alt={item_name} />
                     <button onClick={e => this.navToProduct(e, product, user_item_id)}>View</button>
                  
                  </div>
               )
            })
         : 'Nothing to display'
    
      return (
         <div>
            <h1>Products: {this.props.match.params.category}</h1>
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