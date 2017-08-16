import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { pushToDb, populateStoreFromDb } from './middlewares';
import reducers from '../reducers';

const logger = createLogger({
  duration: true,
  timestamp: false,
  collapsed: true,
});

const configureStore = (initialState, db, pathStore) => (
  createStore(
    reducers,
    initialState,
    compose(applyMiddleware(
      pushToDb(db),
      populateStoreFromDb(db, pathStore),
      thunk,
      logger)),
  )
);

export default configureStore;
