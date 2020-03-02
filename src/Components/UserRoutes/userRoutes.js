import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {commonRoutes} from '../CommonRoutes/commonRoutes';
import UserPreferences from '../UserRoutes/UserPreferences';
import Browse from './Browse/Browse';
import Products from './Browse/Products/Products';
import Product from './Browse/Products/Product/Product';
import OffersDashboard from './Offers/OffersDashboard';
import OpenOffers from './Offers/OpenOffers';
import ClosedOffers from './Offers/ClosedOffers';
import InventoryDashboard from './Inventory/InventoryDashboard';
import ViewInventory from './Inventory/ViewInventory';
import UpdateInventory from './Inventory/UpdateInventory';

const commonRoutesMapped = commonRoutes.map(({path, component}, i) => {
   return (
      <Route path={path} component={component} key={i} />
   );
});

export default (
   <Switch>
      {commonRoutesMapped}
      
      <Route path='/browse' render={() => (
         <Switch>
            <Route component={Product} path='/browse/:category/:productId' />
            <Route component={Products} path='/browse/:category' />
            <Route component={Browse} />
         </Switch>
      )} />

      <Route path='/offers' render={() => (
         <>
            <OffersDashboard />
            <Switch>
               <Route component={ClosedOffers} path='/offers/closed' />
               <Route component={OpenOffers} />
            </Switch>
         </>
      )} />
      
      <Route path='/inventory' render={() => (
         <>
            <InventoryDashboard />
            <Switch>
               <Route component={UpdateInventory} path='/inventory/update/:itemId?' />
               <Route component={ViewInventory} />
            </Switch>
         </>
      )} />
      
      <Route path='/userpreferences' component={UserPreferences} />

      <Route exact path='/' render={() => <Redirect to='/browse' /> } />

      <Route render={() => <h1>404: Not Found</h1>} />
   </Switch>
);