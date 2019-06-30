import Axios from 'axios';

const initialState = {
   notifications: false
}

const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

export function fetchNotifications(userId) {
   return {
      type: FETCH_NOTIFICATIONS,
      payload: Axios
         .get(`api/notifications/getnotifications/${userId}`)
         .then(res => res.data)
   }
}

export function clearNotifications(userId) {
   return {
      type: CLEAR_NOTIFICATIONS,
      payload: Axios
         .put(`/api/notifications/clearall/${userId}`)
         .then(res => res.data)
   }
}

export default function notificationsReducer(state = initialState, action) {
   const {type, payload} = action;

   switch(type) {
      case `${FETCH_NOTIFICATIONS}_REJECTED`:
         alert(payload);
         return { ...state };
      case `${FETCH_NOTIFICATIONS}_FULFILLED`:
         return {
            ...state,
            notifications: payload
         };
      case `${CLEAR_NOTIFICATIONS}_REJECTED`:
         alert(payload);
         return { ...state };
      case `${CLEAR_NOTIFICATIONS}_FULFILLED`:
         return {
            ...state,
            notifications: false
         };
      default: return state;
   }
}