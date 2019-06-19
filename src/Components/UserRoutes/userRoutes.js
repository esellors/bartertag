import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {commonRoutes} from '../CommonRoutes/commonRoutes';
import Dashboard from './Dashboard';
import Categories from './Categories';
import Offers from './Offers';
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
   <>
      <Route path='/'>

         <Route component={Dashboard} />

         <Switch>
            <Route component={Categories} exact path='/' />
            {commonRoutesMapped}
            <Route component={Offers} path='/offers' />
            <Route component={AddInventory} path='/inventory/add' />
            <Route component={ViewInventory} path='/inventory/view' />
            <Route component={InventoryDashboard} path='/inventory' />
            <Route component={UserPreferences} path='/userpreferences' />
            <Route render={() => <h1>404: Not Found</h1>} />
         </Switch>


      </Route>
   </>
);