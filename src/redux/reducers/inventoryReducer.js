import store from '../store';

const initialState = {
   allInventory: [],
   allInvToRefresh: false,
   targetItem: {}
};

const GET_ALL_INVENTORY = 'GET_ALL_INVENTORY';
const SET_TARGET_ITEM = 'SET_TARGET_ITEM';
const SET_ALL_INV_TO_REFRESH = 'SET_ALL_INV_TO_REFRESH';

export function getAllInventory(inventory) {
   return {
      type: GET_ALL_INVENTORY,
      payload: inventory
   };
}

// export function getAllInventory() {
//    return {
//       type: GET_ALL_INVENTORY,
//       payload
//    }
// }

export function setTargetItem(itemId) {
   const targetItem = store.getState().inventory.allInventory.find(item => {
      return parseInt(item.user_item_id) === parseInt(itemId);
   });

   return {
      type: SET_TARGET_ITEM,
      payload: targetItem
   }
}

export function setAllInvToRefresh(bool) {
   return {
      type: SET_ALL_INV_TO_REFRESH,
      payload: bool
   }
}

export default function inventoryReducer(state = initialState, action) {
   const {type, payload} = action;

   switch(type) {
      case GET_ALL_INVENTORY:
         return {
            ...state,
            allInventory: payload
         }
      case SET_TARGET_ITEM:
         return {
            ...state,
            targetItem: payload
         }
      case SET_ALL_INV_TO_REFRESH:
         return {
            ...state,
            allInvToRefresh: payload
         }
      default: return state;
   }
}

