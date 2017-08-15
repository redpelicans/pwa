import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import PouchDb from 'pouchdb';
import configureStore from './store';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';
import { loadTodos, todoAdded, todoDeleted } from './actions/todos';
import './index.css';

const db = PouchDb('todos');
const remoteCouch = 'http://localhost:5984/todos';

const sync = () => {
  const opts = { live: true };
  db.sync(remoteCouch, opts);
};
sync();
const store = configureStore({}, db);

const Root = () => (
  <Provider store={store}>
      <App />
  </Provider>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
