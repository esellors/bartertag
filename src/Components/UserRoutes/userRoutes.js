import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {commonRoutes} from '../CommonRoutes/commonRoutes';
import Categories from './Categories/Categories';
import ProductDashboard from './Categories/Products/Product/ProductDashboard';
import Products from './Categories/Products/Products';
import ProductInfo from './Categories/Products/Product/ProductInfo'
import OwnerDetails from './Categories/Products/Product/OwnerInfo/OwnerDetails';
import OffersDashboard from './Offers/OffersDashboard';
import OpenOffers from './Offers/OpenOffers';
import ClosedOffers from './Offers/ClosedOffers';
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
      
      <Route path='/categories/products/product' render={() => (
         <>
            <ProductDashboard />
            <Switch>
               <Route component={OwnerDetails} path='/categories/products/product/ownerdetails' />
               <Route component={ProductInfo} />
            </Switch>
         </>
      )} />
      <Route component={Products} path='/categories/products' />
      <Route component={Categories} path='/categories' />

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
               <Route component={AddInventory} path='/inventory/add' />
               <Route component={ViewInventory} />
            </Switch>
         </>
      )} />
      
      <Route component={UserPreferences} path='/userpreferences' />

      <Route render={() => <h1>404: Not Found</h1>} />
   </Switch>
);