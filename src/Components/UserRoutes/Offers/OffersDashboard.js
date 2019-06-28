import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateOffers} from '../../../redux/reducers/offersReducer';
import {Link} from 'react-router-dom';

class OffersDashboard extends Component {
   componentDidMount() {
      const {updateOffers, userId} = this.props;
      updateOffers(userId);
   }
   render() {
      console.log(this.props)
      return (
         <div>
            <h1>OffersDashboard</h1>
            <ul>
               <li><Link to='/offers'>Open Offers</Link></li>
               <li><Link to='/offers/closed'>Closed Offers</Link></li>
            </ul>
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   return { userId: reduxState.user.userId }
}

export default connect(mapStateToProps, 
   {
      updateOffers
   }
)(OffersDashboard)