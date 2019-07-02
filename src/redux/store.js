import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import inventoryReducer from './reducers/inventoryReducer';
import productsReducer from './reducers/productsReducer';
import offersReducer from './reducers/offersReducer';
import notificationsReducer from './reducers/notificationsReducer';

const rootReducer = combineReducers({
   user: userReducer,
   inventory: inventoryReducer,
   products: productsReducer,
   offers: offersReducer,
   notifications: notificationsReducer
});


export default createStore(rootReducer, applyMiddleware(promise), devTools);