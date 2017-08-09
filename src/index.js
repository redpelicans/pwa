import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import PouchDb from 'pouchdb';
import configureStore from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { loadTodos } from './actions/todos';
import './index.css';

const db = PouchDb('todos');

const initialState = {
};

const store = configureStore(initialState, db);


export const getTodosFromPouch = () =>db.allDocs({include_docs: true, descending: true}).then(doc => {
    return store.dispatch(loadTodos(doc.rows));
});

getTodosFromPouch();

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
