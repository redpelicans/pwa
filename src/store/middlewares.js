import { TODO_ADDED, ADD_TODO, LOAD_TODOS, DELETE_TODO, UPDATE_TODO, TODO_DELETED } from '../actions/todos';
import { addTodo, deleteTodo, updateTodo } from '../lib/pouchActions';
import PouchMiddleware from 'pouch-redux-middleware';

export const pouchMiddleware = (db) => ({ dispatch, getState }) => next => action => {
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
      const { todo, newTodoText} = action.payload;
      return updateTodo(newTodoText, todo, db);      
    }
    default: 
      return next(action);
  }
};

export const pouchMid = (db) => PouchMiddleware({
    path: '/todos',
    db,
    actions: {
      remove: doc => { 
        console.log('remove', doc);
        return { type: TODO_DELETED, payload: { id: doc._id } };
      },
      insert: doc => { 
        console.log('insert', doc);
        return { type: TODO_ADDED, payload: doc }
       },
      batchInsert: docs => { 
        console.log('BatchInsert', docs);
        return { type: LOAD_TODOS, payload: docs } },
      update: doc => { 
        console.log('update', doc);
        return { type: TODO_ADDED, payload: doc } },
    }
  });