import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {commonRoutes} from '../CommonRoutes/commonRoutes';
import Landing from './Landing';
import Register from '../CommonRoutes/RegisterUpdateUser';

const commonRoutesMapped = commonRoutes.map(({path, component}, i) => {
   return (
      <Route path={path} component={component} key={i} />
   );
});

export default (
   <Switch>
      {commonRoutesMapped}
      
      <Route component={Landing} exact path='/' />
      
      <Route component={Register} path='/register' />

      <Route render={() => <h1>404: Not Found</h1>} />
   </Switch>
);
