const initialState = {
   isLoggedIn: false,
   userId: -1,
   locationId: -1,
   firstName: '',
   lastName: '',
   username: '',
   email: '',
   joinDate: ''
};

const GET_USER_SESSION = 'GET_USER_SESSION';
const LOG_IN_USER = 'LOG_IN_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';

export function getUserSession(data) {
   return {
      type: GET_USER_SESSION,
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
      case GET_USER_SESSION:
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
            userId: '',
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            joinDate: ''
         }
      default: return state;
   }
};