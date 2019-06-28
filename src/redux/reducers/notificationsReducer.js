const initialState = {
   offerStatusNotifications: [],
   messageNotifications: []
}

const UPDATE_OFFER_STATUS_NOTIFICATIONS = 'UPDATE_OFFER_STATUS_NOTIFICATIONS';
const UPDATE_MESSAGE_NOTIFICATIONS = 'UPDATE_MESSAGE_NOTIFICATIONS';

export function updateOfferStatusNotifications(dbArr) {
   return {
      type: UPDATE_OFFER_STATUS_NOTIFICATIONS,
      payload: dbArr
   }
}

export function updateMessageNotifications(dbArr) {
   return {
      type: UPDATE_MESSAGE_NOTIFICATIONS,
      payload: dbArr
   }
}

export default function notificationsReducer(state = initialState, action) {
   const {type, payload} = action;

   switch(type) {
      case UPDATE_OFFER_STATUS_NOTIFICATIONS:
         return {
            ...state,
            offerStatusNotifications: payload
         };
      case UPDATE_MESSAGE_NOTIFICATIONS:
         return {
            ...state,
            messageNotifications: payload
         };
      default: return state;
   }
}