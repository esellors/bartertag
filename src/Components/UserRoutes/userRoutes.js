import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {commonRoutes} from '../CommonRoutes/commonRoutes';
import Categories from './Categories/Categories';
import Offers from './Offers/NewOffers';
import InventoryDashboard from './Inventory/InventoryDashboard';
import ViewInventory from './Inventory/ViewInventory';
import AddInventory from './Inventory/AddInventory';
import UserPreferences from './UserPreferences';

const commonRoutesMapped = commonRoutes.map(({path, component}, i) => {
   return (
      <Route path={path} component={component} key={i} />
   );
});

export default (
   <Switch>
      {commonRoutesMapped}
      
      <Route component={Categories} exact path='/' />

      <Route component={Offers} path='/offers' />

      <Route path='/inventory' render={() => (
         <>
            <InventoryDashboard />
            <Route component={AddInventory} path='/inventory/add' />
            <Route component={ViewInventory} path='/inventory/view' />
         </>
      )} />

      <Route component={UserPreferences} path='/userpreferences' />

      <Route render={() => <h1>404: Not Found</h1>} />
   </Switch>
);