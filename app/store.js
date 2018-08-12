import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk ,logger)(createStore);
const store = createStoreWithMiddleware(combineReducers(reducers));

export default store;
