import React from 'react';
import {Route, Switch} from 'react-router-dom';
import aboutRoutes from '../CommonRoutes/commonRoutes';
import Dashboard from './Dashboard';
import Categories from './Categories';
import Offers from './Offers';
import InventoryDashboard from './Inventory/InventoryDashboard';
import ViewInventory from './Inventory/ViewInventory';
import AddInventory from './Inventory/AddInventory';
import UserPreferences from './UserPreferences';

export default (
   <>
      {/* <Route component={Dashboard} path='/' />
      {commonRoutes}
      <Switch>
         <Route component={Categories} exact path='/' />
         <Route component={Offers} path='/offers' />
            <Switch>
               <Route component={AddInventory} path='/inventory/add' />
               <Route component={ViewInventory} path='/inventory/view' />
         <Route component={InventoryDashboard} path='/inventory' />
            </Switch>
         <Route component={UserPreferences} path='/userpreferences' />
      </Switch> */}
   </>
);