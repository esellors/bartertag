import Axios from 'axios';

const initialState = {
   newOffers: [],
   pendingOffersAsPrimary: [],
   pendingOffersAsSecondary: [],
   closedOffersAsPrimary: [],
   closedOffersAsSecondary: [],
   toBarterItems: [],
   secondaryItemDetails: {},
   primaryItemsDetails: [],
   barterMode: false
}

const UPDATE_STATUS_TO_SEEN = 'UPDATE_STATUS_TO_SEEN';
const ADD_BARTERING_ITEM = 'ADD_BARTERING_ITEM';
const REMOVE_BARTERING_ITEM = 'REMOVE_BARTERING_ITEM';
const CLEAR_BARTERING_ITEMS = 'CLEAR_BARTERING_ITEMS';
const SET_BARTER_MODE = 'SET_BARTER_MODE';
const CREATE_NEW_OFFER = 'CREATE_NEW_OFFER';
const RESPOND_TO_OFFER = 'RESPOND_TO_OFFER';
const UPDATE_OFFERS = 'UPDATE_OFFERS';
const FETCH_OFFER_ITEMS_DETAILS = 'FETCH_OFFER_ITEMS_DETAILS';
const SEND_OFFER_NOTIFICATION = 'SEND_OFFER_NOTIFICATION';

export function fetchOfferItemsDetails(secondaryItemId, primaryItem1Id, primaryItem2Id, primaryItem3Id) {
   return {
      type: FETCH_OFFER_ITEMS_DETAILS,
      payload: Axios
         .get(`/api/offers/getitemsdetails/${secondaryItemId}/${primaryItem1Id}/${primaryItem2Id}/${primaryItem3Id}`)
         .then(res => res.data)
   }
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

export function createNewOffer(offerObj, goBack) {
   return {
      type: CREATE_NEW_OFFER,
      payload: Axios
         .post('/api/offers/create', offerObj)
         .then(res => [res.data, goBack])
   };
}

export function respondToOffer(offerObj) {
   return {
      type: RESPOND_TO_OFFER,
      payload: Axios
         .post('/api/offers/respond', offerObj)
         .then(res => res.data)
   };
}

export function updateOffers(userId) {
   return {
      type: UPDATE_OFFERS,
      payload: Axios
         .get(`/api/offers/getoffers/${userId}`)
         .then(res => res.data)
   };
}

export function updateStatusToSeen(messageId) {
   return {
      type: UPDATE_STATUS_TO_SEEN,
      payload: Axios
         .put(`/api/offers/updatemessagetoseen/${messageId}`)
         .then(res => res.data)
   }
}

export default function offersReducer(state = initialState, action) {
   const {type, payload} = action;
   let toBarterItemsCopy = [...state.toBarterItems];

   switch(type) {
      case SET_BARTER_MODE:
         return {
            ...state,
            barterMode: payload
         };
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
         };
      case `${SEND_OFFER_NOTIFICATION}_FULFILLED`:
         return state;
      case `${FETCH_OFFER_ITEMS_DETAILS}_FULFILLED`:
         const primaryItemsDetailsRes = payload.slice(1);
         const secondaryItemDetailsRes = payload.slice(0, 1)[0];

         return {
            ...state,
            primaryItemsDetails: primaryItemsDetailsRes,
            secondaryItemDetails: secondaryItemDetailsRes
         }
      case `${UPDATE_OFFERS}_REJECTED`:
         return console.log(payload.response);
      case `${UPDATE_OFFERS}_FULFILLED`:
         return {
            ...state,
            newOffers: payload.newOffers,
            pendingOffersAsPrimary: payload.pendingOffersAsPrimary,
            pendingOffersAsSecondary: payload.pendingOffersAsSecondary,
            closedOffersAsPrimary: payload.closedOffersAsPrimary,
            closedOffersAsSecondary: payload.closedOffersAsSecondary
         };
      case `${CREATE_NEW_OFFER}_REJECTED`:
         alert(payload.response.data);
         return { ...state };
      case `${CREATE_NEW_OFFER}_FULFILLED`:
         alert(payload[0]);
         payload[1]();
         return { ...state };
      case `${RESPOND_TO_OFFER}_REJECTED`:
         alert(payload.response.data);
         return { ...state };
      case `${RESPOND_TO_OFFER}_FULFILLED`:
         console.log(payload)
         alert(payload);
         return { ...state };
      case `${UPDATE_STATUS_TO_SEEN}_REJECTED`:
         alert(payload);
         return { ...state };
      default: return state;
   }
}