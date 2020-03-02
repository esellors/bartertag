const initialState = {
   isLoggedIn: false,
   userId: null,
   locationId: null,
   firstName: '',
   lastName: '',
   username: '',
   email: '',
   city: '',
   state: '',
   joinDate: ''
};

const UPDATE_LOCAL_USER_LOCATION = 'UPDATE_LOCAL_USER_LOCATION';
const LOG_IN_USER = 'LOG_IN_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';

export function updateLocalUserLocation(data) {
   return {
      type: UPDATE_LOCAL_USER_LOCATION,
      payload: data
   };
};

export function logInUser(data) {
   return {
      type: LOG_IN_USER,
      payload: data
   };
};

export function logOutUser() {
   return {
      type: LOG_OUT_USER
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;

   switch(type) {
      case UPDATE_LOCAL_USER_LOCATION:
         return {
            ...state,
            city: payload.city,
            state: payload.state
         };
      case LOG_IN_USER:
         return {
            ...state,
            isLoggedIn: true,
            userId: payload.userId,
            locationId: payload.locationId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            username: payload.username,
            email: payload.email,
            joinDate: payload.joinDate
         };
      case LOG_OUT_USER:
         return {
            isLoggedIn: false,
            userId: null,
            locationId: null,
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            city: '',
            state: '',
            joinDate: ''
         };
      default: return state;
   }
};