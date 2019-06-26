import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import userReducer from './reducers/userReducer';
import inventoryReducer from './reducers/inventoryReducer';
import productsReducer from './reducers/productsReducer';
import offersReducer from './reducers/offersReducer';
import promise from 'redux-promise-middleware';

const rootReducer = combineReducers({
   user: userReducer,
   inventory: inventoryReducer,
   products: productsReducer,
   offers: offersReducer
});

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null;

export default createStore(rootReducer, compose(applyMiddleware(promise), devTools));