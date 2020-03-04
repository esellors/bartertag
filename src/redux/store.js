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

// const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null;

export default createStore(rootReducer, applyMiddleware(promise));