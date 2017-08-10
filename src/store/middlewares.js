import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from '../actions/todos';
import { addTodo, deleteTodo, updateTodo } from '../lib/pouchActions';

export const PouchDbMiddleware = (db) => ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case ADD_TODO:
    {
      const { todo } = action.payload;
      return addTodo(todo, db);
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