import PouchMiddleware from 'pouch-redux-middleware';
import { TODO_ADDED, ADD_TODO, LOAD_TODOS, DELETE_TODO, UPDATE_TODO, TODO_DELETED } from '../actions/todos';
import { addTodo, deleteTodo, updateTodo } from '../lib/pouchActions';

export const pushToDb = (db) => () => next => action => {
  switch (action.type) {
    case ADD_TODO:
    {
      return addTodo(action.payload, db);
    }
    case DELETE_TODO:
    {
      const { todo } = action.payload;
      return deleteTodo(todo, db);
    }
    case UPDATE_TODO:
    {
      const { type, todo, newData } = action.payload;
      return updateTodo(type, newData, todo, db);
    }
    default:
      return next(action);
  }
};

export const populateStoreFromDb = (db, pathStore) => PouchMiddleware({
  path: `/${pathStore}`,
  db,
  actions: {
    remove: doc => ({ type: TODO_DELETED, payload: { id: doc._id } }),
    insert: doc => ({ type: TODO_ADDED, payload: doc }),
    batchInsert: docs => ({ type: LOAD_TODOS, payload: docs }),
    update: doc => ({ type: TODO_ADDED, payload: doc }),
  },
});
