import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {commonRoutes} from '../CommonRoutes/commonRoutes';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Register from './Register';

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
            <Route component={Register} path='/register' />
            <Route component={Landing} exact path='/' />
            {commonRoutesMapped}
            <Route render={() => <h1>404: Not Found</h1>} />
         </Switch>

      </Route>
   </>
);
