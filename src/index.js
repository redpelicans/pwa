import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import PouchDb from 'pouchdb';
import configureStore from './store';
import { syncRemote } from './lib/pouchActions';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const db = PouchDb('todos');
const pathStore = 'todos';
const remoteCouch = 'http://admin:admin@localhost:5984/todos';
const configSync = {
  live: true,
  retry: true,
};

syncRemote(db, remoteCouch, configSync);

const store = configureStore({}, db, pathStore);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
