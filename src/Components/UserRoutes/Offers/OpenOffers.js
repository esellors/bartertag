import React, {Component} from 'react';
import {connect} from 'react-redux';
import AsPrimaryTagger from './AsPrimaryTagger';
import AsSecondaryTagger from './AsSecondaryTagger';

class OpenOffers extends Component {
   render() {
      const {newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary} = this.props;

      return (
         <div className='offers_container'>
            <div className='offers_detail_section'>
               <h5>New Tags From Others</h5>

                  <AsSecondaryTagger offers={newOffers} section='newOffers' />
   
            </div>

            <div className='offers_detail_section'>
               <h5>Open Tags You Started</h5>

                  <AsPrimaryTagger offers={pendingOffersAsPrimary} section='pendingOffersAsPrimary' />
   
            </div>

            <div className='offers_detail_section'>
               <h5>Open Tags Others Started</h5>

                  <AsSecondaryTagger offers={pendingOffersAsSecondary} section='pendingOffersAsSecondary' />
   
            </div>
         </div>
      );
   }
}

const mapStateToProps = reduxState => {
   const {newOffers, pendingOffersAsPrimary, pendingOffersAsSecondary} = reduxState.offers;

   return {
      newOffers,
      pendingOffersAsPrimary,
      pendingOffersAsSecondary
   }
}

export default connect(mapStateToProps)(OpenOffers)