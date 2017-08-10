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
const store = configureStore({}, db);

const preLoadingTodos = () => db.allDocs({include_docs: true}).then(doc => store.dispatch(loadTodos(doc.rows)));

db.changes({ since: 'now', live: true, include_docs: true })
  .on('change', change => {
  const { id , doc } = change;
  if (change.deleted) return store.dispatch(todoDeleted(id));
  const todo = { [id]: doc };
  return store.dispatch(todoAdded(id, todo));
  }).on('error', err => {
  console.log(err);  
});

preLoadingTodos();

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();