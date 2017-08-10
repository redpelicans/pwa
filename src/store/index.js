import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { PouchDbMiddleware } from './middlewares';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const logger = createLogger({
  duration: true,
  timestamp: false,
  collapsed: true
});

const configureStore = (initialState, db) => (
  createStore(
    reducers,
    initialState,
    compose(applyMiddleware(PouchDbMiddleware(db), thunk, logger)),
  )
);

export default configureStore;