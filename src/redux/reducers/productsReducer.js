const initialState = {
   productView: {}
}

const UPDATE_PRODUCT_VIEW = 'UPDATE_PRODUCT_VIEW';

export function setProduct(prodObj) {
   return {
      type: UPDATE_PRODUCT_VIEW,
      payload: prodObj
   }
}

export default function productsReducer (state = initialState, action) {
   const {type, payload} = action;

   switch (type) {
      case UPDATE_PRODUCT_VIEW:
         return {
            ...state,
            productView: payload
         }
      default: return state
   }
}