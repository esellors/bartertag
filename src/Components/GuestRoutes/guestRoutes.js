import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Register from './Register';
import commonRoutes from '../commonRoutes';

export default (
   <>
      <Route component={Dashboard} path='/' />
      {commonRoutes}
      <Switch>
         <Route component={Landing} exact path='/' />
         <Route component={Register} path='/register' />
      </Switch>
   </>
);