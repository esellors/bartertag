import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import userReducer from './reducers/userReducer';
import offersReducer from './reducers/offersReducer';
import promise from 'redux-promise-middleware';

const rootReducer = combineReducers({
   user: userReducer,
   offers: offersReducer
});

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null;

export default createStore(rootReducer, compose(applyMiddleware(promise), devTools));