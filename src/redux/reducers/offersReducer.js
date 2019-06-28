import Axios from 'axios';

const initialState = {
   newOffers: [],
   pendingOffersAsPrimary: [],
   pendingOffersAsSecondary: [],
   closedOffersAsPrimary: [],
   closedOffersAsSecondary: [],
   toBarterItems: [],
   barterMode: false
}

const UPDATE_OFFERS = 'UPDATE_OPEN_OFFERS';
const ADD_BARTERING_ITEM = 'ADD_BARTERING_ITEM';
const REMOVE_BARTERING_ITEM = 'REMOVE_BARTERING_ITEM';
const CLEAR_BARTERING_ITEMS = 'CLEAR_BARTERING_ITEMS';
const SET_BARTER_MODE = 'SET_BARTER_MODE';

export function updateOffers(userId) {
   return {
      type: UPDATE_OFFERS,
      payload: Axios
         .get(`/api/offers/getoffers/${userId}`)
         .then(res => res.data)
         .catch(err => console.log(err.request))
   };
}

export function addBarteringItem(itemId) {
   return {
      type: ADD_BARTERING_ITEM,
      payload: parseInt(itemId)
   };
}

export function removeBarteringItem(itemId) {
   return {
      type: REMOVE_BARTERING_ITEM,
      payload: parseInt(itemId)
   };
}

export function clearBarteringItems() {
   return {
      type: CLEAR_BARTERING_ITEMS
   }
}

export function setBarterMode(bool) {
   return {
      type: SET_BARTER_MODE,
      payload: bool
   };
}


export default function offersReducer(state = initialState, action) {
   const {type, payload} = action;
   let toBarterItemsCopy = [...state.toBarterItems];

   switch(type) {
      case `${UPDATE_OFFERS}_FULFILLED`:
         return {
            ...state,
            newOffers: payload.newOffers,
            pendingOffersAsPrimary: payload.pendingOffersAsPrimary,
            pendingOffersAsSecondary: payload.pendingOffersAsSecondary,
            closedOffersAsPrimary: payload.closedOffersAsPrimary,
            closedOffersAsSecondary: payload.closedOffersAsSecondary
         }

      case SET_BARTER_MODE:
         return {
            ...state,
            barterMode: payload
         }
      case ADD_BARTERING_ITEM:
         return {
            ...state,
            toBarterItems: [...toBarterItemsCopy, payload]
         };
      case REMOVE_BARTERING_ITEM:
         const index = toBarterItemsCopy.indexOf(payload);
         toBarterItemsCopy.splice(index, 1);
         return {
            ...state,
            toBarterItems: toBarterItemsCopy
         };
      case CLEAR_BARTERING_ITEMS:
         return {
            ...state,
            toBarterItems: []
         }
      default: return state;
   }
}