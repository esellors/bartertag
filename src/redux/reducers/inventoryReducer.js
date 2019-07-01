import store from '../store';
import Axios from 'axios';

const initialState = {
   allInventory: [],
   targetItem: {}
};

const UPDATE_ALL_INVENTORY = 'GET_ALL_INVENTORY';
const SET_TARGET_ITEM = 'SET_TARGET_ITEM';
const CLEAR_INVENTORY = 'CLEAR_INVENTORY';

export function updateInventory(userId) {
   return {
      type: UPDATE_ALL_INVENTORY,
      payload: Axios
         .get(`/api/inventory/getallinventory/${userId}`)
         .then(res => res.data)
         .catch(err => console.log(err))
   }
}

export function setTargetItem(itemId) {
   const targetItem = store.getState().inventory.allInventory.find(item => {
      return parseInt(item.user_item_id) === parseInt(itemId);
   });

   return {
      type: SET_TARGET_ITEM,
      payload: targetItem
   }
}

export function clearInventory() {
   return {
      type: CLEAR_INVENTORY
   }
}

export default function inventoryReducer(state = initialState, action) {
   const {type, payload} = action;

   switch(type) {
      case `${UPDATE_ALL_INVENTORY}_FULFILLED`:
         return {
            ...state,
            allInventory: payload
         }
      case SET_TARGET_ITEM:
         return {
            ...state,
            targetItem: payload
         }
      case CLEAR_INVENTORY:
         return {
            ...state,
            allInventory: []
         }
      default: return state;
   }
}

