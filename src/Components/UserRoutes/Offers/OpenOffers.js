import React from 'react';
import NewOffers from './NewOffers';
import PendingOffers from './PendingOffers';

function OpenOffers() {
   return (
      <div>
         <h1>OpenOffers</h1>
         {NewOffers}
         {PendingOffers}
      </div>
   );
}

export default OpenOffers