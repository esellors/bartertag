import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Donate from './Donate';
import MissionStatement from './MissionStatement';
import Advertise from './Advertise';
import Contact from './Contact';

export default (
   <Switch>
      <Route component={Donate} path='/donate' />
      <Route component={MissionStatement} path='/missionstatement' />
      <Route component={Advertise} path='/advertise' />
      <Route component={Contact} path='/contact' />
   </Switch>
);