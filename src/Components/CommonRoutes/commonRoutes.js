import Donate from './Donate';
import MissionStatement from './MissionStatement';
import Advertise from './Advertise';
import Contact from './Contact';

export const commonRoutes = [
   {
      component: Donate,
      path: '/donate'
   },
   {
      component: MissionStatement,
      path: '/missionstatement'
   },
   {
      component: Advertise,
      path: '/advertise'
   },
   {
      component: Contact,
      path: '/contact'
   }
];